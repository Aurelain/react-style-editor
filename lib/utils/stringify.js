"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _COMMON = require("./COMMON.js");

/*

*/

/**
 *
 */
var stringify = function stringify(kids) {
  return flatten(kids).join('');
};
/**
 *
 */


var flatten = function flatten(kids) {
  var accumulator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = kids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      switch (item.type) {
        case _COMMON.ATRULE:
        case _COMMON.RULE:
          accumulator.push(item.selector + (item.hasBraceBegin ? '{' : ''));

          if (item.kids && item.kids.length) {
            flatten(item.kids, accumulator);
          }

          accumulator.push((item.hasBraceEnd ? '}' : '') + (item.hasSemicolon ? ';' : ''));
          break;

        case _COMMON.DECLARATION:
          accumulator.push(item.property + (item.hasColon ? ':' : '') + item.value + (item.hasSemicolon ? ';' : ''));
          break;

        case _COMMON.COMMENT:
          accumulator.push(item.prefix + '/*' + item.content + (item.hasSlashEnd ? '*/' : ''));
          break;
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

var _default = stringify;
exports.default = _default;