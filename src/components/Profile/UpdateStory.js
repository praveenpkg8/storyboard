import React, { Component } from 'react';

export default class UpdateStory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            story: '',
            name: props.user_detials.name,
            mail: props.user_detials.mail,
            user: props.user_detials,
            render: true
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
    componentDidMount(){
        
        
    }


    async postStory() {
        
        const storyObj = {
            name: this.state.name,
            mail: this.state.mail,
            story: this.state.story
        }
        const setting = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storyObj)
        }
        const message = await fetch('/api/story', setting);
        const data = await message.json();
        if (message.status === 200) {
            this.props.render(data)
        }
        this.setState({
            story: '',
        })

        return message
    }
    

    render() {
        return (
            <>
            <textarea
            name='story'
            type='textarea'
            className="form-control"
            value={this.state.story}
            onChange={this.handleChange}
            />
            <button className="btn btn-warning" onClick={(e) => this.postStory(e) }>Post</button>
            </>
        )
    }
    
}