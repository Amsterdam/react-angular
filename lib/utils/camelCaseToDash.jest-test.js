'use strict';

var _camelCaseToDash = require('./camelCaseToDash');

var _camelCaseToDash2 = _interopRequireDefault(_camelCaseToDash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('camelCaseToDash', function () {
  it('should convert camelCased strings to lowercase with dashes', function () {
    expect((0, _camelCaseToDash2.default)('myCamelCasedString')).toEqual('my-camel-cased-string');
    expect((0, _camelCaseToDash2.default)('aboringstring')).toEqual('aboringstring');
    expect((0, _camelCaseToDash2.default)('PascalCasedString')).toEqual('pascal-cased-string');
    expect((0, _camelCaseToDash2.default)('weirD-String')).toEqual('weir-d-string');
  });
});
//# sourceMappingURL=camelCaseToDash.jest-test.js.map