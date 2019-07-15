import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './LandingTemplate.scss';

class LandingTemplate extends Component{
  render() {
    return(
      <div className="landing-template">
        <h1>This is Landing Page!!!</h1>
        <Link to='/login'><button>로그인</button></Link>
      </div>
    )
  }
}

export default LandingTemplate;