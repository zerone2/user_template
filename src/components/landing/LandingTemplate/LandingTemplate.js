import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './LandingTemplate.scss';

class LandingTemplate extends Component{
  constructor(props) {
    super(props);
    this.state = {
      token: props.token
    }
  }
  render() {
    return(
      <div className="landing-template">
        <h1>This is Landing Page!!!</h1>
        <h2>{this.state.token}</h2>
        <Link to='/login'><button>로그인</button></Link>
      </div>
    )
  }
}

export default LandingTemplate;