import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/Signin';
import Profile from '../components/Profile/Profile';
import LandingPage from '../components/LandingPage'
import Cookies from 'js-cookie';

function Child({ match }) {
    Cookies.set('session', match.params.id)
    return (
          <>
          <Redirect to='' />
          </>
      );
      }
export default class RouteConfig extends Component {
    

  
    render() {
        return (
            <>
            <Router>
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin"exact component={SignIn} />
                <Route path="/" exact component={Profile} />
                <Route path="/profile/" exact component={Profile} />
                <Route path="/landingpage/" exact component={LandingPage} />
                <Route path="/sign/:id" component={Child}/>

            </Router>
            </>
        )
    }
}

