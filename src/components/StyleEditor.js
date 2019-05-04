import React from 'react';

import Rule from './Rule';
import Area from './Area';
import {AFTER, AFTER_BEGIN, ATRULE, BEFORE, COMMENT, DECLARATION, RULE} from '../utils/COMMON';
import stylize, {prepareStyling, releaseStyling} from '../utils/stylize';
import parse from '../utils/parse';
import validate from '../utils/validate';
import identify from '../utils/identify';
import modify from '../utils/modify';
import stringify from '../utils/stringify';
import prettify from '../utils/prettify';
import ignore from '../utils/ignore';
import unignore from '../utils/unignore';
import cls from '../utils/cls';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const classes = stylize('StyleEditor', {
    root: {
        fontFamily: 'Consolas, Liberation Mono, Menlo, monospace', // GitHub
        fontSize: '12px', // Chrome
        textAlign: 'left',
        overflowY: 'auto',
        color: 'black',
        position: 'relative',
        cursor: 'default',
        boxSizing: 'border-box',
        border: 'solid 1px silver',
        padding: 4,
        '& *': {
            boxSizing: 'border-box',
        }
    },
    isEmpty: {
        minHeight: 20,
        cursor: 'text',
        background: '#eee',
        '&:hover': {
            background: '#ddd',
        },
    },
    isEditing: {
        '& *': {
            pointerEvents: 'none',
        }
    },
});

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class StyleEditor extends React.Component {

    state = {
        isEditing: false,
        hasArea: false,
    };

    // Private variables:
    currentRules = [];
    memoRules = this.currentRules;   // a simulation of `memoize-one`
    memoCSS = '';                    // a simulation of `memoize-one`
    previousPropsCSS;

    /**
     *
     */
    constructor(props) {
        super(props);
        prepareStyling();
    }

    /**
     *
     */
    render() {
        const {css, className, ...other} = this.props;
        const {isEditing, hasArea} = this.state;
        delete other.outputFormats; // not used in render

        if (css !== this.previousPropsCSS) { // our parent changed the css!
            this.currentRules = this.computeRules(css);
            this.previousPropsCSS = css;
        } else { // the local logic already computed the rules
            // nothing to do
        }
        const isEmpty = !this.currentRules.length;

        return (
            <div
                onCopy={this.onCopy}
                onClick={isEmpty ? this.onClick : null}
                {...other}
                className={cls(
                    classes.root,
                    isEmpty && !hasArea && classes.isEmpty,
                    isEditing && classes.isEditing,
                    className,
                )}
            >
                {
                    !isEmpty &&
                    <Rule
                        selector={'root'}
                        kids={this.currentRules}
                        isTop
                        onEditBegin={this.onEditBegin}
                        onEditChange={this.onEditChange}
                        onEditEnd={this.onEditEnd}
                        onTick={this.onTick}
                    />
                }
                {
                    hasArea &&
                    <Area
                        id={null}
                        defaultValue={''}
                        payloadProperty={'selector'}
                        onChange={this.onAreaChange}
                        onBlur={this.onAreaBlur}
                    />
                }
            </div>
        );
    }

    /**
     *
     */
    componentDidMount() {
        this.announceOnChange(this.currentRules);
    }

    /**
     * Under no circumstances do we allow updates while an edit is on-going.
     * Alas, because of this small restriction, we had to quit using PureComponent and had to duplicate its
     * functionality by manually checking if values have actually changed.
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.isEditing) {
            return (nextState.isEditing === false); // allow updates only in order to exit editing mode
        }
        for (const key in nextProps) {
            if (this.props[key] !== nextProps[key]) {
                return true;
            }
        }
        for (const key in nextState) {
            if (this.state[key] !== nextState[key]) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     */
    componentWillUnmount() {
        releaseStyling();
    }

    /**
     *
     */
    computeRules = (css) => {
        if (this.memoCSS === css) {
            return this.memoRules;
        }
        const rules = parse(css);
        validate(rules);
        identify(rules);
        this.memoCSS = css;
        this.memoRules = rules;
        return rules;
    };

    /**
     *
     */
    computeRulesFromPayload = (id, payload) => {
        const {freshRules, freshNode, parentNode} = modify(this.currentRules, id, payload);
        if (payload[AFTER_BEGIN]) { // can only be dispatched by AT/RULE
            const node = createTemporaryDeclaration(payload[AFTER_BEGIN]);
            freshNode.kids.unshift(node);

        } else if (payload[BEFORE]) { // can only be dispatched by AT/RULE and can only create AT/RULE
            const node = createTemporaryRule(payload[BEFORE]);
            const siblings = parentNode.kids;
            const index = siblings.findIndex(item => item.id === id);
            siblings.splice(index, 0, node);

        } else if (payload[AFTER]) { // can be dispatched by any type of node
            let text = payload[AFTER];
            let node;
            switch (freshNode.type) { // freshNode is in fact the anchor node, NOT the node we're about to create
                case ATRULE:
                    if (freshNode.hasBraceBegin && !freshNode.hasBraceEnd) {
                        text = '}' + text;
                    } else if (!freshNode.hasSemicolon) {
                        text = ';' + text;
                    }
                    node = createTemporaryRule(text);
                    break;
                case RULE:
                    if (!freshNode.hasBraceEnd) {
                        text = '}' + text;
                    }
                    node = createTemporaryRule(text);
                    break;
                case DECLARATION:
                    if (!freshNode.hasSemicolon) {
                        text = ';' + text;
                    }
                    node = createTemporaryDeclaration(text);
                    break;
                case COMMENT:
                    if (!freshNode.hasSlashEnd) {
                        text = '*/' + text;
                    }
                    if (parentNode.type === ATRULE) {
                        node = createTemporaryRule(text);
                    } else {
                        node = createTemporaryDeclaration(text);
                    }
                    break;
                default:
                // nothing
            }
            const siblings = parentNode.kids;
            const index = siblings.findIndex(item => item.id === id);
            siblings.splice(index + 1, 0, node);

        } else if (payload.value) {
            freshNode.hasColon = true;
        }
        const temporaryBlob = stringify(freshRules);
        // console.log(temporaryBlob);
        return this.computeRules(temporaryBlob);
    };

    /**
     *
     */
    onEditBegin = () => {
        this.setState({
            isEditing: true,
        })
    };

    /**
     *
     */
    onEditChange = (id, payload) => {
        const {onChange} = this.props;
        if (onChange) {
            const freshRules = this.computeRulesFromPayload(id, payload);
            this.announceOnChange(freshRules);
        }
    };

    /**
     *
     */
    announceOnChange = (rules) => {
        const {onChange, outputFormats} = this.props;
        if (onChange) {
            const formats = outputFormats.replace(/\s/g, '').split(',');
            const output = [];
            for (const format of formats) {
                switch (format) {
                    case 'preserved':
                        output.push(stringify(rules));
                        break;
                    case 'pretty':
                    default:
                        output.push(prettify(rules));
                        break;
                    case 'machine':
                        output.push(JSON.parse(JSON.stringify(rules))); // TODO: use something faster
                        break;
                }
            }
            onChange(output.length > 1 ? output : (output[0] || ''));
        }
    };

    /**
     *
     */
    onEditEnd = (id, payload) => {
        this.currentRules = this.computeRulesFromPayload(id, payload);
        this.setState({
            isEditing: false,
        });
    };

    /**
     *
     */
    onTick = (id, desiredTick) => {
        const freshBlob = desiredTick ? unignore(this.currentRules, id) : ignore(this.currentRules, id);
        this.currentRules = this.computeRules(freshBlob);
        this.forceUpdate();
        this.announceOnChange(this.currentRules);
    };

    /**
     *
     */
    onCopy = (event) => {
        const blob = prettify(this.currentRules);
        // console.log(blob); // TODO
        event.nativeEvent.clipboardData.setData('text/plain', blob);
        event.preventDefault();
    };

    /**
     *
     */
    onClick = () => {
        this.setState({
            isEditing: true,
            hasArea: true,
        });
    };

    /**
     *
     */
    onAreaChange = (id, payload) => {
        const {onChange} = this.props;
        if (onChange) {
            const prettyBlob = prettify(this.computeRules(payload.selector));
            onChange(prettyBlob);
        }
    };

    /**
     *
     */
    onAreaBlur = (id, payload) => {
        this.currentRules = this.computeRules(payload.selector);
        this.setState({
            isEditing: false,
            hasArea: false,
        });
    };

}

// =====================================================================================================================
//  H E L P E R S
// =====================================================================================================================
/**
 *
 */
const createTemporaryDeclaration = (text) => {
    if (!text.match(/;\s*$/)) { // doesn't end with semicolon
        text += ';'; // close it
    }
    return {
        type: DECLARATION,
        property: text,
        value: '',
    }
};

/**
 *
 */
const createTemporaryRule = (text) => {
    if (text.match(/^\s*@/)) { // ATRULE
        if (!text.match(/[{};]/)) { // doesn't contain braces or semicolons
            text += ';'; // close it. We assume this is not a nested ATRULE
        }
    } else { // RULE
        if (!text.match(/[{}]/)) { // doesn't contain braces
            text += '{}'; // close it
        }
    }
    return {
        type: RULE,
        selector: text,
    }
};

// =====================================================================================================================
//  D E F I N I T I O N
// =====================================================================================================================
StyleEditor.defaultProps = {
    outputFormats: 'pretty',
};
export default StyleEditor;