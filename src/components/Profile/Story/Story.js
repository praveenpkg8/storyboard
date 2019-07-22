import React, { Component } from 'react';
import StoryItem from './StoryItem/StoryItem';
import UpdateStory from '../UpdateStory';

const URL = '/api/story';




export default class Story extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            loadStories: false,
            user: props.user,
            story: "",
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

    addNewStory(story) {
        const { stories } = this.state;
        const newList = [story, ...stories];
        this.setState({ stories: newList});
    }

    componentWillMount() {
        this.getAllStories ()
    }

    reRender = (data) => {
        var story = this.state.stories
        var list = [data.message,...story]
        this.setState({
            stories: list
        })
    }
    

    getAllStories = async() => {
        const story = await fetch(URL, {credentials: 'include'})
        const stories = await story.json()
        this.setState({ 
            story_detials: stories,
            stories: stories.message,
            loadStories: true
        })
    }

    getNextStory = async() => {
        var story_detials = this.state.story_detials
        var url = '/api/story?next_cursor=' + story_detials.next_cursor
        const response = await fetch(url, {credentials: 'include'})
        const stories = await response.json()
        var story = [...this.state.stories, ...stories.message]
        this.setState({
            story_detials: stories,
            stories: story
        })
    }

    render () {
        if (this.state.loadStories){
            var stories = this.state.stories;
            console.log(stories)
            var story_detials = this.state.story_detials;
            var storyItem = stories.map((story, index) => <StoryItem key={story.story_id} story={story} user={this.state.user} />);
            console.log(storyItem)
            return (
                <>
                <UpdateStory
                    user_detials={this.state.user} 
                    render={this.reRender}
                />
                {storyItem}
                { story_detials.more ? <button type="button" onClick={this.getNextStory} className="btn btn-link">Load Stories....</button> : <></>}
                </>
            )
        }
        return <></>
        
    }
}