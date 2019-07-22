import React, { Component } from 'react'

export default class UpdateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            user: props.user,
            stories: props.stories
        }
    }

    handleChange = (event) => {
        var target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
          });
    }

    async postComment() {
        var user = this.state.user;
        var story = this.state.stories;

        const setting = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                story_id: story.story_id,
                mail: user.mail,
                name: user.name,
                comment: this.state.comment
              })
        }
        const commentResponse = await fetch('/api/comment', setting);
        // const comment = await commentResponse.json();
        this.setState({ 
            comment: '',

        })

    }

    render() {
        return (
            <>
            <div className="input-group mb-3">
                             <input 
                             name='comment'
                             type='text'
                             value={this.state.comment}
                             onChange={this.handleChange}
                             className="form-control" placeholder="Comment" aria-label="Comment" aria-describedby="button-addon2" />
                             <div className="input-group-append">
                                <button onClick={() => this.postComment()} className="btn btn-outline-secondary">Comment</button>
                            </div>
                        </div>
            </>
        )
    }
}
