import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import './LoginTemplate.scss';
// import UserAPI from 'lib/api/user';

import HeaderTemplate from 'components/header/HeaderTemplate';
import ReturnTemplate from 'components/return/ReturnTemplate';

class LoginTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      autoLogin: false,
      mobile: (window.innerWidth < 767),
      token: ''
    };
  }

  handleAutoLoginChange = (e) => {this.setState({autoLogin: e.target.checked});};
  handleIdChange = (e) => {this.setState({email: e.target.value});};
  handlePwChange = (e) => {this.setState({password: e.target.value});};
  signIn = () => {
    console.log('Id(email) : ' + this.state.email + ', Pw : ' + this.state.password);
    axios.post(
      'http://morethanchat.tk:8080/login',{
        "email": this.state.email,
        "passWd": this.state.password
    }).then(res => {
      console.log(res);
      if(res.data.status === 200) {
        this.setState({
          ...this.state,
          token: res.data.response
        });
      }
    }).catch(err => {
      console.log(err);
    })
  };

  render() {
    return (
      <div className="login-template">
        {
          this.state.mobile ?
            <HeaderTemplate/>
            :
            <ReturnTemplate params=''/>
        }
        <div className="login-section">
          <div className="login-top">
            <p className="login-top__subtitle">0101010101 템플릿</p>
            <p className="login-top__title">로그인</p>
          </div>
          <div className="login-inputs">
            <input type="email" className="login-inputs__id" onChange={this.handleIdChange} placeholder="아이디" required autoFocus/>
            <input type="password" className="login-inputs__pw" onChange={this.handlePwChange} placeholder="비밀번호" required/>
          </div>
          <div className="side-menus">
            <div className="auto-login">
              <input type="checkBox" className="auto-login__check" onChange={this.handleAutoLoginChange} checked={this.state.autoLogin}/>
              <p className="auto-login__text">자동 로그인</p>
            </div>
            <div className="user-menus">
              <Link to="/find/id">아이디</Link> / <Link to="/find/password" >비밀번호찾기</Link>
              <Link to="/signup" className="signup-button">회원가입</Link>
            </div>
          </div>
          <button className="login-btn" onClick={this.signIn}>로그인</button>
        </div>
      </div>
    );
  }
}

export default LoginTemplate;