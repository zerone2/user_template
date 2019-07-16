import React, { Component } from 'react';
import './SignupTemplate.scss';

import signup_flower from 'static/images/signup/signup_flower@2x.png';
import ReturnTemplate from 'components/return/ReturnTemplate';
import HeaderTemplate from 'components/header/HeaderTemplate';
import AuthTemplate from 'components/auth/AuthTemplate';

class SignupTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobile: (window.innerWidth < 767)
    };
  }

  render() {
    return(
      <div className="signup-template">
        {
          this.state.mobile ?
            <HeaderTemplate mobile={this.state.mobile}/>
            :
            <ReturnTemplate params='login'/>
        }
        <div className="signup-section">
          <div className="title-section">
            <img className="title-section__image" src={signup_flower} alt=""/>
            <p className="title-section__title">회원가입</p>
          </div>
          <div className="signup-inputs">
            <AuthTemplate/>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupTemplate;