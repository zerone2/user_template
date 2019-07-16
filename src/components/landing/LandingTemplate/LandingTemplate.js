import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./LandingTemplate.scss";
import arrow from "static/images/common/arrow-left.png";
import HeaderTemplate from "../../header/HeaderTemplate";

class LandingTemplate extends Component{

  constructor(props) {
    super(props);
    this.state = {
      mobile: (window.innerWidth < 767)
    };
  }

  render() {
    return(
      <div className="landing-template">
        {
          this.state.mobile ?
            <HeaderTemplate mobile={true}/>
            :
            <HeaderTemplate mobile={false}/>
        }
        <div className="top-section">
          <p>모른챗이 오픈했습니다.</p>
        </div>
        <div className="second-section">
          <div className="notice-section">
            <div className="notice-section__title">
              <span>
                <img src={arrow} alt=""/>
                <p>공지사항</p>
              </span>
              <button>+ 더보기</button>
            </div>
            <div className="notice-section__contents">
              <p>**</p>
              <p>모른챗 ver1.0 open!!</p>
            </div>
            <div className="notice-section__contents">
              <p>**</p>
              <p>모른챗 ver1.0 open!!</p>
            </div>
          </div>
          <div className="login-section">
            <p className="login-comment">"사장님 오늘도 파이팅!"</p>
            <Link to="/login"><button className="login-btn">로그인</button></Link>
            <div className="user-menus">
              <span><Link to="/find/id">아이디</Link> / <Link to="/find/password" >비밀번호찾기</Link></span>
              <Link to="/signup" className="signup-button"><p>회원가입</p></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingTemplate;