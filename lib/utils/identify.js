"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _COMMON = require("./COMMON.js");

/*
Adds an unique identifier to each node (`id`).
*/

/**
 *
 */
var identify = function identify(list) {
  var usedIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var id = void 0;

      switch (item.type) {
        case _COMMON.ATRULE:
        case _COMMON.RULE:
          id = item.selector.trim() + (item.hasBraceBegin ? '{' : '') + (item.hasSemicolon ? ';' : '');
          break;

        case _COMMON.DECLARATION:
          id = item.property.trim() + (item.hasColon ? ':' : '') + item.value.trim() + (item.hasSemicolon ? ';' : '');
          break;

        case _COMMON.COMMENT:
          id = '/*' + item.content + '*/';
          break;
      }

      if (id in usedIds) {
        usedIds[id]++;
        item.id = id + usedIds[id];
      } else {
        usedIds[id] = 1;
        item.id = id;
      }

      if (item.kids && item.kids.length) {
        identify(item.kids, usedIds);
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

var _default = identify;
exports.default = _default;