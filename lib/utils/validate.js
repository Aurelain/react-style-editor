"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyPlayground = exports.default = void 0;

var _COMMON = require("./COMMON");

/**
 *
 */
var sheet;
/**
 *
 */

var validate = function validate(list) {
  sheet = sheet || createPlayground(); // lazy initialization

  validateRules(list, '', '', '');
  return list;
};
/**
 *
 */


var validateRules = function validateRules(list, parentPrefix, parentSuffix, parentFingerprint) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var rule = _step.value;

      if (rule.type === _COMMON.COMMENT) {
        continue;
      }

      var rulePrefix = parentPrefix + rule.selector + (rule.hasBraceBegin ? '{' : '');
      var ruleSuffix = (rule.hasBraceEnd ? '}' : '') + (rule.hasSemicolon ? ';' : '') + parentSuffix;
      var fingerprint = inAndOut(rulePrefix + ruleSuffix);

      if (fingerprint !== parentFingerprint) {
        // the browser accepted our rule
        rule.isValid = true;

        if (rule.kids.length) {
          if (rule.type === _COMMON.ATRULE) {
            validateRules(rule.kids, rulePrefix, ruleSuffix, fingerprint);
          } else {
            // RULE
            validateDeclarations(rule.kids, rulePrefix, ruleSuffix, fingerprint);
          }
        }
      } else {
        rule.isValid = false;

        if (rule.kids.length) {
          invalidateChildren(rule.kids);
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
/**
 *
 */


var validateDeclarations = function validateDeclarations(list, parentPrefix, parentSuffix, parentFingerprint) {
  var fingerprint = parentFingerprint;
  var block = '';

  for (var i = list.length - 1; i >= 0; i--) {
    // we traverse backwards to detect overruled declarations
    var declaration = list[i];

    if (declaration.type === _COMMON.COMMENT) {
      continue;
    }

    block = (declaration.hasSemicolon ? ';' : '') + block;
    block = declaration.property + (declaration.hasColon ? ':' : '') + declaration.value + block;
    var freshFingerprint = inAndOut(parentPrefix + block + parentSuffix);

    if (fingerprint !== freshFingerprint) {
      // the browser accepted our declaration
      declaration.isValid = true;
      fingerprint = freshFingerprint;
    } else {
      declaration.isValid = false;
    }
  }
};
/**
 *
 */


var invalidateChildren = function invalidateChildren(list) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (item.type === _COMMON.COMMENT) {
        continue;
      }

      item.isValid = false;
      var kids = item.kids;

      if (kids && kids.length) {
        invalidateChildren(kids);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
};
/**
 *
 */


var inAndOut = function inAndOut(blob) {
  var index;

  try {
    index = sheet.insertRule(blob);
  } catch (e) {// console.log(e);
  }

  if (index >= 0) {
    var fingerprint = sheet.cssRules[index].cssText;
    sheet.deleteRule(index);
    return fingerprint;
  }

  return '';
};
/**
 *
 * Note: DocumentFragment doesn't work because it doesn't compute styles.
 */


var createPlayground = function createPlayground() {
  var iframe = document.createElement('iframe');
  document.head.appendChild(iframe);
  var iframeDocument = iframe.contentWindow.document;
  document.head.removeChild(iframe);
  var style = iframeDocument.createElement('style');
  iframeDocument.head.appendChild(style);
  return style.sheet;
};
/**
 *
 */


var destroyPlayground = function destroyPlayground() {
  sheet = null;
};

exports.destroyPlayground = destroyPlayground;
var _default = validate;
exports.default = _default;