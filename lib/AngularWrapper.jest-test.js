'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _AngularWrapper = require('./AngularWrapper');

var _AngularWrapper2 = _interopRequireDefault(_AngularWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AngularWrapper', function () {
  it('should render', function () {
    var element = (0, _enzyme.shallow)(_react2.default.createElement(_AngularWrapper2.default, {
      moduleName: 'plopWrapper',
      component: 'plop'
    }));

    expect(element).toMatchSnapshot();
  });

  it('should set the proper angular attributes', function () {
    var element = (0, _enzyme.shallow)(_react2.default.createElement(_AngularWrapper2.default, {
      moduleName: 'plopWrapper',
      component: 'plop',
      bindings: {
        foo: 'bar'
      },
      interpolateBindings: {
        boo: 'faz'
      }
    }));

    expect(element.instance().component).toEqual(_react2.default.createElement('plop', { boo: '{{boo}}', foo: 'foo' }));
  });

  it('should update the scope when props are updated', function () {
    var element = (0, _enzyme.shallow)(_react2.default.createElement(_AngularWrapper2.default, {
      moduleName: 'plopWrapper',
      component: 'plop',
      bindings: {
        foo: 'bar'
      },
      interpolateBindings: {
        boo: 'faz'
      }
    }));

    element.instance().$rootScope = jest.fn();
    element.instance().angularRef = {
      $scope: {
        $digest: jest.fn()
      }
    };

    element.setProps({
      interpolateBindings: {
        boo: 'qaz'
      }
    });
    expect(element.instance().angularRef.$scope).toMatchObject({
      boo: 'qaz',
      foo: 'bar'
    });
  });
});
//# sourceMappingURL=AngularWrapper.jest-test.js.map
