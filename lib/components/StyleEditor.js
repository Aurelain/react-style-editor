"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Rule = _interopRequireDefault(require("./Rule"));

var _Area = _interopRequireDefault(require("./Area"));

var _COMMON = require("../utils/COMMON");

var _stylize = _interopRequireWildcard(require("../utils/stylize"));

var _parse = _interopRequireDefault(require("../utils/parse"));

var _validate = _interopRequireDefault(require("../utils/validate"));

var _identify = _interopRequireDefault(require("../utils/identify"));

var _modify2 = _interopRequireDefault(require("../utils/modify"));

var _stringify = _interopRequireDefault(require("../utils/stringify"));

var _prettify = _interopRequireDefault(require("../utils/prettify"));

var _ignore = _interopRequireDefault(require("../utils/ignore"));

var _unignore = _interopRequireDefault(require("../utils/unignore"));

var _cls = _interopRequireDefault(require("../utils/cls"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
var classes = (0, _stylize.default)('StyleEditor', {
  root: {
    fontFamily: 'Consolas, Liberation Mono, Menlo, monospace',
    // GitHub
    fontSize: '12px',
    // Chrome
    color: 'black',
    position: 'relative',
    cursor: 'default',
    boxSizing: 'border-box',
    border: 'solid 1px silver',
    padding: 4,
    '& *': {
      boxSizing: 'border-box'
    }
  },
  isEmpty: {
    minHeight: 20,
    cursor: 'text',
    background: '#eee',
    '&:hover': {
      background: '#ddd'
    }
  },
  isEditing: {
    pointerEvents: 'none'
  }
}); // =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================

var StyleEditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StyleEditor, _React$Component);

  // Private variables:
  // a simulation of `memoize-one`
  // a simulation of `memoize-one`

  /**
   *
   */
  function StyleEditor(props) {
    var _this;

    _classCallCheck(this, StyleEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StyleEditor).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isEditing: false,
      hasArea: false
    });

    _defineProperty(_assertThisInitialized(_this), "currentRules", []);

    _defineProperty(_assertThisInitialized(_this), "memoRules", _this.currentRules);

    _defineProperty(_assertThisInitialized(_this), "memoCSS", '');

    _defineProperty(_assertThisInitialized(_this), "previousPropsCSS", void 0);

    _defineProperty(_assertThisInitialized(_this), "computeRules", function (css) {
      if (_this.memoCSS === css) {
        return _this.memoRules;
      }

      var rules = (0, _parse.default)(css);
      (0, _validate.default)(rules);
      (0, _identify.default)(rules);
      _this.memoCSS = css;
      _this.memoRules = rules;
      return rules;
    });

    _defineProperty(_assertThisInitialized(_this), "computeRulesFromPayload", function (id, payload) {
      var _modify = (0, _modify2.default)(_this.currentRules, id, payload),
          freshRules = _modify.freshRules,
          freshNode = _modify.freshNode,
          parentNode = _modify.parentNode;

      if (payload[_COMMON.AFTER_BEGIN]) {
        // can only be dispatched by AT/RULE
        var node = createTemporaryDeclaration(payload[_COMMON.AFTER_BEGIN]);
        freshNode.kids.unshift(node);
      } else if (payload[_COMMON.BEFORE]) {
        // can only be dispatched by AT/RULE and can only create AT/RULE
        var _node = createTemporaryRule(payload[_COMMON.BEFORE]);

        var siblings = parentNode.kids;
        var index = siblings.findIndex(function (item) {
          return item.id === id;
        });
        siblings.splice(index, 0, _node);
      } else if (payload[_COMMON.AFTER]) {
        // can be dispatched by any type of node
        var text = payload[_COMMON.AFTER];

        var _node2;

        switch (freshNode.type) {
          // freshNode is in fact the anchor node, NOT the node we're about to create
          case _COMMON.ATRULE:
            if (freshNode.hasBraceBegin && !freshNode.hasBraceEnd) {
              text = '}' + text;
            } else if (!freshNode.hasSemicolon) {
              text = ';' + text;
            }

            _node2 = createTemporaryRule(text);
            break;

          case _COMMON.RULE:
            if (!freshNode.hasBraceEnd) {
              text = '}' + text;
            }

            _node2 = createTemporaryRule(text);
            break;

          case _COMMON.DECLARATION:
            if (!freshNode.hasSemicolon) {
              text = ';' + text;
            }

            _node2 = createTemporaryDeclaration(text);
            break;

          case _COMMON.COMMENT:
            if (!freshNode.hasSlashEnd) {
              text = '*/' + text;
            }

            if (parentNode.type === _COMMON.ATRULE) {
              _node2 = createTemporaryRule(text);
            } else {
              _node2 = createTemporaryDeclaration(text);
            }

            break;
        }

        var _siblings = parentNode.kids;

        var _index = _siblings.findIndex(function (item) {
          return item.id === id;
        });

        _siblings.splice(_index + 1, 0, _node2);
      } else if (payload.value) {
        freshNode.hasColon = true;
      }

      var temporaryBlob = (0, _stringify.default)(freshRules); // console.log(temporaryBlob);

      return _this.computeRules(temporaryBlob);
    });

    _defineProperty(_assertThisInitialized(_this), "onEditBegin", function () {
      _this.setState({
        isEditing: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onEditChange", function (id, payload) {
      var onChange = _this.props.onChange;

      if (onChange) {
        var freshRules = _this.computeRulesFromPayload(id, payload);

        var prettyBlob = (0, _prettify.default)(freshRules);
        onChange(prettyBlob);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onEditEnd", function (id, payload) {
      _this.currentRules = _this.computeRulesFromPayload(id, payload);

      _this.setState({
        isEditing: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTick", function (id, desiredTick) {
      var freshBlob = desiredTick ? (0, _unignore.default)(_this.currentRules, id) : (0, _ignore.default)(_this.currentRules, id);
      _this.currentRules = _this.computeRules(freshBlob);

      _this.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "onCopy", function (event) {
      var blob = (0, _prettify.default)(_this.currentRules); // console.log(blob); // TODO

      event.nativeEvent.clipboardData.setData('text/plain', blob);
      event.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.setState({
        isEditing: true,
        hasArea: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAreaChange", function (id, payload) {
      var onChange = _this.props.onChange;

      if (onChange) {
        var prettyBlob = (0, _prettify.default)(_this.computeRules(payload.selector));
        onChange(prettyBlob);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onAreaBlur", function (id, payload) {
      _this.currentRules = _this.computeRules(payload.selector);

      _this.setState({
        isEditing: false,
        hasArea: false
      });
    });

    (0, _stylize.prepareStyling)();
    return _this;
  }
  /**
   *
   */


  _createClass(StyleEditor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          css = _this$props.css,
          other = _objectWithoutProperties(_this$props, ["css"]);

      var _this$state = this.state,
          isEditing = _this$state.isEditing,
          hasArea = _this$state.hasArea;

      if (css !== this.previousPropsCSS) {
        // our parent changed the css!
        this.currentRules = this.computeRules(css);
        this.previousPropsCSS = css;
      } else {// the local logic already computed the rules
        // nothing to do
      }

      var isEmpty = !this.currentRules.length;
      return _react.default.createElement("div", _extends({
        onCopy: this.onCopy,
        onClick: isEmpty ? this.onClick : null
      }, other, {
        className: (0, _cls.default)(classes.root, isEmpty && !hasArea && classes.isEmpty, isEditing && classes.isEditing)
      }), !isEmpty && _react.default.createElement(_Rule.default, {
        selector: 'root',
        kids: this.currentRules,
        isTop: true,
        onEditBegin: this.onEditBegin,
        onEditChange: this.onEditChange,
        onEditEnd: this.onEditEnd,
        onTick: this.onTick
      }), hasArea && _react.default.createElement(_Area.default, {
        id: null,
        defaultValue: '',
        payloadProperty: 'selector',
        onChange: this.onAreaChange,
        onBlur: this.onAreaBlur
      }));
    }
    /**
     * Under no circumstances do we allow updates while an edit is on-going.
     * Alas, because of this small restriction, we had to quit using PureComponent and had to duplicate its
     * functionality by manually checking if values have actually changed.
     */

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      if (this.state.isEditing) {
        return nextState.isEditing === false; // allow updates only in order to exit editing mode
      }

      for (var key in nextProps) {
        if (this.props[key] !== nextProps[key]) {
          return true;
        }
      }

      for (var _key in nextState) {
        if (this.state[_key] !== nextState[_key]) {
          return true;
        }
      }

      return false;
    }
    /**
     *
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _stylize.releaseStyling)();
    }
    /**
     *
     */

  }]);

  return StyleEditor;
}(_react.default.Component); // =====================================================================================================================
//  H E L P E R S
// =====================================================================================================================

/**
 *
 */


var createTemporaryDeclaration = function createTemporaryDeclaration(text) {
  if (!text.match(/;\s*$/)) {
    // doesn't end with semicolon
    text += ';'; // close it
  }

  return {
    type: _COMMON.DECLARATION,
    property: text,
    value: ''
  };
};
/**
 *
 */


var createTemporaryRule = function createTemporaryRule(text) {
  if (text.match(/^\s*@/)) {
    // ATRULE
    if (!text.match(/[{};]/)) {
      // doesn't contain braces or semicolons
      text += ';'; // close it. We assume this is not a nested ATRULE
    }
  } else {
    // RULE
    if (!text.match(/[{}]/)) {
      // doesn't contain braces
      text += '{}'; // close it
    }
  }

  return {
    type: _COMMON.RULE,
    selector: text
  };
}; // =====================================================================================================================
//  D E F I N I T I O N
// =====================================================================================================================


var _default = StyleEditor;
exports.default = _default;