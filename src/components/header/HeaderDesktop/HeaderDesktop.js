import React from 'react';
import {Link} from "react-router-dom";
import './HeaderDesktop.scss';
import logo_tmp from 'static/images/common/logo_tmp.png';

const HeaderDesktop = (props) => {
  return(
    <div className="desktop-header-template">
      <div className="header-upper">
        <img src={logo_tmp} alt="logo_tmp"/>
        <div className="header-upper__side-menus">
          <Link to="/" className="header-upper__side-menu">고객센터</Link>
          <Link to="/mypage" className="header-upper__side-menu">내 정보 관리</Link>
        </div>
      </div>
      <div className="header-lower">
        <a href="#" className="header-lower__menu">내 상점 관리</a>
        <a href="#" className="header-lower__menu">이용 가이드</a>
        <p className="header-lower__menu"> | </p>
        <a href="#" className="header-lower__menu">이용권 구매</a>
        <a href="#" className="header-lower__menu">서비스 소개</a>
      </div>
    </div>
  )
};

export default HeaderDesktop;