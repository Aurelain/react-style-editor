"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _modify2 = _interopRequireDefault(require("./modify.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _COMMON = require("./COMMON.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*

*/

/**
 *
 */
var ignore = function ignore(oldRules, id) {
  var _modify = (0, _modify2.default)(oldRules, id, {}),
      freshRules = _modify.freshRules,
      freshNode = _modify.freshNode; // blank change to get the `freshNode`


  var content = stringifyAndHandleComments([freshNode]);

  for (var key in freshNode) {
    delete freshNode[key];
  }

  Object.assign(freshNode, {
    type: _COMMON.COMMENT,
    prefix: '',
    hasSlashEnd: true,
    content: content
  });
  return (0, _stringify.default)(freshRules);
};
/**
 *
 */


var stringifyAndHandleComments = function stringifyAndHandleComments(kids) {
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
          accumulator.push(handleInlineComments(item.selector) + (item.hasBraceBegin ? '{' : ''));

          if (item.kids && item.kids.length) {
            flatten(item.kids, accumulator);
          }

          accumulator.push((item.hasBraceEnd ? '}' : '') + (item.hasSemicolon ? ';' : ''));
          break;

        case _COMMON.DECLARATION:
          accumulator.push(handleInlineComments(item.property) + (item.hasColon ? ':' : '') + handleInlineComments(item.value) + (item.hasSemicolon ? ';' : ''));
          break;

        case _COMMON.COMMENT:
          accumulator.push(item.prefix + _COMMON.SLASH_SUBSTITUTE + '*' + item.content + (item.hasSlashEnd ? '*' + _COMMON.SLASH_SUBSTITUTE : ''));
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
/**
 *
 */


var handleInlineComments = function handleInlineComments(blob) {
  return blob.split('/*').join(_COMMON.SLASH_SUBSTITUTE + '*').split('*/').join('*' + _COMMON.SLASH_SUBSTITUTE);
};

var _default = ignore;
exports.default = _default;