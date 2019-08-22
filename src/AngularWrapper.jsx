import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import AngularTemplate, { ensureScopeAvailable, reactAngularModule } from './angularTemplate';
import camelCaseToDash from './utils/camelCaseToDash';

class AngularWrapper extends Component {
  state = {
    angularActive: false,
  };

  angularComponent = null;

  componentDidMount() {
    const { moduleName, component, dependencies, angularInstance } = this.props;
    if (component) {
      this.buildAngularComponent();
    }
    angularInstance
      .module(moduleName, [...dependencies, reactAngularModule(angularInstance, false).name])
      .directive('exposeScope', () => ensureScopeAvailable())
      .run([
        'reactAngularProductionReady',
        (reactAngularProductionReady) => {
          reactAngularProductionReady();
          this.setState({ angularActive: true });
        },
      ]);
    angularInstance.bootstrap(this.rootRef, [moduleName], { strictDi: true });
  }

  componentDidUpdate() {
    const { bindings, interpolateBindings } = this.props;
    if (!this.angularRef) {
      return;
    }
    const allBindings = { ...bindings, ...interpolateBindings };
    Object.keys(allBindings).forEach((key) => {
      this.angularRef.$scope[key] = allBindings[key];
    });
    setTimeout(() => {
      this.angularRef.$scope.$digest();
    });
  }

  componentWillUnmount() {
    if (this.angularRef.$scope.$root) {
      this.setState({ angularActive: false });
      this.angularRef.$scope.$root.$destroy();
    }
  }

  buildAngularComponent = () => {
    const {
      bindings,
      interpolateBindings,
      component,
      children,
    } = this.props;

    const allBindings = { ...bindings, ...interpolateBindings };
    const angularAttributes = Object.keys(allBindings).reduce((acc, key) => {
      acc[camelCaseToDash(key)] = (key in interpolateBindings) ? `{{${key}}}` : key;
      return acc;
    }, {});

    this.angularComponent = createElement(camelCaseToDash(component), angularAttributes, children);
  };

  setRootRef = (angularApp) => {
    if (angularApp) {
      this.rootRef = angularApp;
    }
  };

  setAngularRef = (ref) => {
    if (ref) {
      this.angularRef = ref;
    }
  };

  render() {
    const { interpolateBindings, bindings, children, angularInstance } = this.props;
    const { angularActive } = this.state;

    return (
      <div
        ref={this.setRootRef}
      >
        {
          angularActive && (
            <AngularTemplate
              angularInstance={angularInstance}
              scope={{ ...interpolateBindings, ...bindings }}
              ref={this.setAngularRef}
            >
              {this.angularComponent ? this.angularComponent : children}
            </AngularTemplate>
          )
        }
      </div>
    );
  }
}

AngularWrapper.defaultProps = {
  dependencies: [],
  children: null,
  component: null,
  bindings: {},
  interpolateBindings: {},
};

AngularWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  component: PropTypes.string,
  moduleName: PropTypes.string.isRequired,
  dependencies: PropTypes.arrayOf(PropTypes.string),
  bindings: PropTypes.shape({}),
  interpolateBindings: PropTypes.shape({}),
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  angularInstance: PropTypes.any,
};

export default AngularWrapper;
