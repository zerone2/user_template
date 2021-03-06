import React, { useState, Fragment } from 'react';
import './EmailAuth.scss';

import * as UserAPI from "lib/api/user";

const EmailAuth = (props) => {

  const [inputEmail, setInputEmail] = useState('');
  const [existingEmail, setExistingEmail] = useState(null);
  const [hiddenAuth, setHiddenAuth] = useState(true);

  const handleInputChange = (e) => {setInputEmail(e.target.value);};

  const buttonClick = (e) => {
    UserAPI.findUserId(props.name, props.phoneNum)
      .then(res => {
        console.log('[success] findUserId in email auth');
        console.log(res);
        setHiddenAuth(false);
        if(res.data.status === 200) { // email already exists
          alert('이미 가입된 아이디가 존재합니다!\n\'아이디 찾기\'를 이용해주세요.');
          setExistingEmail(true);
          props.callback(null);
        } else {                // new email
          setExistingEmail('');
          props.callback(inputEmail);
        }
        // setReturnAuthString(''+res.status);
      })
      .catch(err => {
        console.log(err);
        setHiddenAuth(true);
        alert('이메일 중복확인이실패했습니다.\n30초 뒤에 다시 시도해주세요.\n안되시면 문의부탁드립니다.');
      });
  };

  return (
    <Fragment>
      <div className="input-container">
        <p className="email-auth-input inputs__title">아이디(이메일 주소)<em>*</em></p>
        <div className="email-auth-input inputs__value-wrapper">
          <input type="text" id="input-email" className="email-auth-input inputs__value" onChange={handleInputChange} disabled={!hiddenAuth} placeholder="ex. czer01ne@gmail.com"/>
          <button id="duplicate_check_btn auth_btn" onClick={buttonClick}>중복확인</button>
        </div>
        {
          hiddenAuth ?
            ''
            :
            <Fragment>
              <p className="email-auth-input inputs__tip" hidden={existingEmail}>가입 가능한 아이디입니다.</p>
              <p className="email-auth-input inputs__tip" hidden={!existingEmail}>이미 존재하는 아이디입니다.</p>
            </Fragment>
        }
      </div>
    </Fragment>
  )
};

export default EmailAuth;