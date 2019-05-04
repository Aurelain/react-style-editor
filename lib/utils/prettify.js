"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _COMMON = require("./COMMON");

var _clean = _interopRequireDefault(require("./clean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*

*/

/**
 *
 */
var prettify = function prettify(kids) {
  return flatten(kids).join('');
};
/**
 *
 */


var flatten = function flatten(kids) {
  var accumulator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var indent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = kids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      switch (item.type) {
        case _COMMON.ATRULE:
        case _COMMON.RULE:
          var type = item.type,
              _kids = item.kids,
              selector = item.selector,
              hasBraceBegin = item.hasBraceBegin,
              hasBraceEnd = item.hasBraceEnd,
              hasSemicolon = item.hasSemicolon;

          if (!_kids.length && !selector.trim() && !hasBraceBegin && !hasBraceEnd && !hasSemicolon) {
            continue;
          }

          accumulator.push(indent + (0, _clean.default)(selector) + ' {\r\n');

          if (_kids && _kids.length) {
            flatten(_kids, accumulator, indent + '    ');
          }

          if (type === _COMMON.ATRULE && !hasBraceBegin) {
            accumulator.push(';\r\n');
          } else {
            accumulator.push(indent + '}\r\n');
          }

          break;

        case _COMMON.DECLARATION:
          if (!item.hasColon && !item.property.trim()) {
            continue;
          }

          accumulator.push(indent + (0, _clean.default)(item.property) + ': ' + (0, _clean.default)(item.value) + ';\r\n');
          break;

        case _COMMON.COMMENT:
          accumulator.push(indent + '/*' + item.content + '*/\r\n');
          break;

        default: // nothing

      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return accumulator;
};

var _default = prettify;
exports.default = _default;