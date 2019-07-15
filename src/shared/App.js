import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import logo from 'static/images/logo.svg';
import './App.css';
import {Landing, Login, Find, Signup} from 'pages';
// import { Landing, Policy, Privacy, Introduction } from 'pages';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={ Landing } />
        <Route path="/login" component={ Login } />
        <Route path="/find/:object" component={ Find } />
        <Route path="/signup" component={ Signup } />
        {/*<Route exact path="/" component={ Landing }/>*/}
        {/*<Route path="/policy" component={ Policy }/>*/}
        {/*<Route path="/privacy" component={ Privacy }/>*/}
        {/*<Route path="/about" component={ Introduction }/>*/}
        {/*<Route path="/company/introduction" component={ Introduction }/>*/}
      </div>
    );
  }
}

export default App;
