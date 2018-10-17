'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularTemplate = require('./angularTemplate');

var _angularTemplate2 = _interopRequireDefault(_angularTemplate);

var _camelCaseToDash = require('./utils/camelCaseToDash');

var _camelCaseToDash2 = _interopRequireDefault(_camelCaseToDash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AngularWrapper = function (_Component) {
  _inherits(AngularWrapper, _Component);

  function AngularWrapper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AngularWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AngularWrapper.__proto__ || Object.getPrototypeOf(AngularWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      angularActive: false
    }, _this.angularComponent = null, _this.buildAngularComponent = function () {
      var _this$props = _this.props,
          bindings = _this$props.bindings,
          interpolateBindings = _this$props.interpolateBindings,
          component = _this$props.component,
          children = _this$props.children;


      var allBindings = _extends({}, bindings, interpolateBindings);
      var angularAttributes = Object.keys(allBindings).reduce(function (acc, key) {
        acc[(0, _camelCaseToDash2.default)(key)] = key in interpolateBindings ? '{{' + key + '}}' : key;
        return acc;
      }, {});

      _this.angularComponent = (0, _react.createElement)((0, _camelCaseToDash2.default)(component), angularAttributes, children);
    }, _this.setRootRef = function (angularApp) {
      if (angularApp) {
        _this.rootRef = angularApp;
      }
    }, _this.setAngularRef = function (ref) {
      if (ref) {
        _this.angularRef = ref;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AngularWrapper, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var component = this.props.component;

      if (component) {
        this.buildAngularComponent();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          moduleName = _props.moduleName,
          dependencies = _props.dependencies;

      _angular2.default.module('' + moduleName, [].concat(_toConsumableArray(dependencies), [(0, _angularTemplate.reactAngularModule)(false).name])).directive('exposeScope', function () {
        return (0, _angularTemplate.ensureScopeAvailable)();
      }).run(function (reactAngularProductionReady) {
        reactAngularProductionReady();
        _this2.setState({ angularActive: true });
      });
      _angular2.default.bootstrap(this.rootRef, [moduleName]);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this3 = this;

      var _props2 = this.props,
          bindings = _props2.bindings,
          interpolateBindings = _props2.interpolateBindings;

      if (!this.angularRef) {
        return;
      }
      var allBindings = _extends({}, bindings, interpolateBindings);
      Object.keys(allBindings).forEach(function (key) {
        _this3.angularRef.$scope[key] = allBindings[key];
      });
      setTimeout(function () {
        _this3.angularRef.$scope.$digest();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.angularRef.$scope.$root) {
        this.setState({ angularActive: false });
        this.angularRef.$scope.$root.$destroy();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          interpolateBindings = _props3.interpolateBindings,
          bindings = _props3.bindings,
          children = _props3.children;
      var angularActive = this.state.angularActive;


      return _react2.default.createElement(
        'div',
        {
          ref: this.setRootRef
        },
        angularActive && _react2.default.createElement(
          _angularTemplate2.default,
          {
            scope: _extends({}, interpolateBindings, bindings),
            ref: this.setAngularRef
          },
          this.angularComponent ? this.angularComponent : children
        )
      );
    }
  }]);

  return AngularWrapper;
}(_react.Component);

AngularWrapper.defaultProps = {
  dependencies: [],
  children: null,
  component: null,
  bindings: {},
  interpolateBindings: {}
};

AngularWrapper.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  component: _propTypes2.default.string,
  moduleName: _propTypes2.default.string.isRequired,
  dependencies: _propTypes2.default.arrayOf(_propTypes2.default.string),
  bindings: _propTypes2.default.shape({}),
  interpolateBindings: _propTypes2.default.shape({})
};

exports.default = AngularWrapper;
//# sourceMappingURL=AngularWrapper.js.map