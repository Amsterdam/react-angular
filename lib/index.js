'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AngularWrapper = exports.reactAngularModule = exports.provideAngularScopeHOC = exports.ensureScopeAvailable = undefined;

var _angularTemplate = require('./angularTemplate');

var _angularTemplate2 = _interopRequireDefault(_angularTemplate);

var _AngularWrapper = require('./AngularWrapper.jsx');

var _AngularWrapper2 = _interopRequireDefault(_AngularWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ensureScopeAvailable = _angularTemplate.ensureScopeAvailable;
exports.provideAngularScopeHOC = _angularTemplate.provideAngularScopeHOC;
exports.reactAngularModule = _angularTemplate.reactAngularModule;
exports.AngularWrapper = _AngularWrapper2.default;
exports.default = _angularTemplate2.default;
//# sourceMappingURL=index.js.map