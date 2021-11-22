import React from 'react';

import stylize from '../utils/stylize';
import clean from '../utils/clean';
import Checkbox from './Checkbox';
import Area from './Area';
import {AFTER} from '../utils/COMMON';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const classes = stylize('Comment', {
    root: {
        color: 'silver',
        padding: '2px 0',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    content: {
        cursor: 'text',
        borderBottom: '1px dashed transparent',
        '&:hover': {
            borderBottomColor: 'currentColor',
        },
    },
    after: {
        marginTop: 4,
    },
});

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Comment extends React.PureComponent {
    state = {
        isEditingContent: false,
        isEditingAfter: false,
    };

    /**
     *
     */
    render() {
        const {id, content, onTick} = this.props;
        const {isEditingContent, isEditingAfter} = this.state;

        const isLegit = !!content.match(/^\s*[-a-zA-Z0-9_]*\s*:|[{}()*@;/\]]/);

        return (
            <div className={classes.root} onClick={this.onCommentClick}>
                {isLegit && <Checkbox id={id} tick={0} onTick={onTick} />}

                {isEditingContent ? (
                    this.renderArea('content', content)
                ) : (
                    <span className={classes.content} title={content} onClick={this.onContentClick}>
                        {'/*' + clean(content) + '*/'}
                    </span>
                )}
                {isEditingAfter && (
                    <div className={classes.after}>
                        <Checkbox tick={1} />
                        {this.renderArea(AFTER, '')}
                    </div>
                )}
            </div>
        );
    }
    /**
     *
     */
    renderArea = (payloadProperty, defaultValue) => {
        const {id, onEditChange} = this.props;
        return (
            <Area
                defaultValue={defaultValue.trim()}
                id={id}
                payloadProperty={payloadProperty}
                onChange={onEditChange}
                onBlur={this.onAreaBlur}
            />
        );
    };

    /**
     *
     */
    onContentClick = (event) => {
        event.stopPropagation();
        this.setState({isEditingContent: true});
        this.props.onEditBegin();
    };

    /**
     *
     */
    onCommentClick = (event) => {
        event.stopPropagation();
        this.setState({isEditingAfter: true});
        this.props.onEditBegin();
    };

    /**
     *
     */
    onAreaBlur = (id, payload) => {
        this.setState({
            isEditingContent: false,
            isEditingAfter: false,
        });
        this.props.onEditEnd(id, payload);
    };
}

// =====================================================================================================================
//  D E F I N I T I O N
// =====================================================================================================================
export default Comment;
