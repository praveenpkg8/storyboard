import React, { Component } from 'react';

export default class CommentItem extends Component {
    constructor(props) {
        super(props)
    }
    comment = this.props.comment;
    render() {
        var comment = this.comment;
        return (
            <>
            <div>
            <span className="badge badge-pill badge-secondary">{comment.name}</span>  {comment.comment}
            <hr/>
            </div>
            </>
        )
    }
}