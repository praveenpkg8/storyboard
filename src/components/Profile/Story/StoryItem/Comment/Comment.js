import React, {Component} from 'react';
import CommentItem from './CommentItem/CommentItem';
import UpdateComment from '../UpdateComment';


export default class Comment extends Component {
    constructor(props) {
        super(props)

        this.state ={
            comment_detials: props.commentDetials,
            story: props.story,
            story_id: props.story_id,
            comments: props.commentList
        }
        
    }    
    ;
    

    getNextCommment = async() => {
        var _comments = this.state.comment_detials
        console.log(this.state.story_id)
        var url = '/api/comment?story_id=' + this.state.story_id + '&next_cursor=' + _comments.next_cursor
        const comments = await fetch(url)
        .then(response => response.json())
        var arr_comments = [..._comments.comment, ...comments.message]
        console.log(arr_comments)
        this.setState({
            comments: arr_comments,
            comment_detials: comments
        }) 
    }


    componentDidMount() {
    }
    render() {
        var _comments = this.state.comment_detials
        const comments = this.state.comments
        const commentItem = comments.map((comment, index) => <CommentItem key={index} comment={comment} />)
        return (
        <>
        < UpdateComment user={this.props.user} stories={this.state.story}/>

        {commentItem}
        {_comments.more ? <button type="button" onClick={this.getNextCommment} className="btn btn-link">Load Comment....</button> : <></> }
        </>
        )
    }
}