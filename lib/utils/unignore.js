"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _COMMON = require("./COMMON.js");

var _modify2 = _interopRequireDefault(require("./modify.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*

*/

/**
 *
 */
var unignore = function unignore(rules, id) {
  var _modify = (0, _modify2.default)(rules, id, {}),
      freshRules = _modify.freshRules,
      freshNode = _modify.freshNode; // blank change to get the `freshNode`


  if (freshNode.type === _COMMON.COMMENT) {
    unignoreComment(freshNode);
  } else {
    unignoreKids(freshNode.kids);
  }

  return (0, _stringify.default)(freshRules);
};
/**
 *
 */


var unignoreComment = function unignoreComment(node) {
  var prefix = node.prefix; // backup

  var content = node.content.split(_COMMON.SLASH_SUBSTITUTE + '*').join('/*').split('*' + _COMMON.SLASH_SUBSTITUTE).join('*/');

  for (var key in node) {
    delete node[key];
  }

  Object.assign(node, {
    type: _COMMON.RULE,
    // could also be ATRULE or DECLARATION, because it's just temporary
    selector: prefix + content
  });
};
/**
 *
 */


var unignoreKids = function unignoreKids(kids) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = kids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.type === _COMMON.COMMENT) {
        unignoreComment(item);
      } else {
        if (item.kids && item.kids.length) {
          unignoreKids(item.kids);
        }
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
};

var _default = unignore;
exports.default = _default;