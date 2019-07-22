import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import Cookies from 'js-cookie';


export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    onLogout = async() => {
        var session = Cookies.get('session')
        const data = await fetch('/profile/signout?session=' + session)
        .then(response => response.json())
        console.log(data)
        Cookies.set('session', undefined)
        this.setState({
            render: true
        })
    }

    render() {
        if (this.state.render){
            return <Redirect to='/profile' />
        }
        return (
            <>
            <button className='btn btn-outline-danger' onClick={this.onLogout} >Logout</button>
            </>
        )
    }
}