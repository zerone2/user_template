import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './HeaderMobile.scss';

const HeaderMobile = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    setShowMenu(!showMenu);
  };

  return(
    <div className="mobile-header-template">
      <div className={showMenu ? "menu-trigger active": "menu-trigger"} onClick={toggleMenu}>
        <span> </span>
        <span> </span>
        <span> </span>
      </div>
      <div className="menu-btn-area">
        <Link to="/login" className="menu-btn">로그인</Link>
        <Link to="/signup" className="menu-btn active">회원가입</Link>
      </div>
    </div>
  )
};

export default HeaderMobile;