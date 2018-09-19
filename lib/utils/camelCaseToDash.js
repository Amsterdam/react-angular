'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function camelCaseToDash(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

exports.default = camelCaseToDash;
//# sourceMappingURL=camelCaseToDash.js.map