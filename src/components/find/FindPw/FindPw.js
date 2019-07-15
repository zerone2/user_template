import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import './FindPw.scss';

import * as UserAPI from "lib/api/user";
import PhoneAuth from "components/auth/PhoneAuth";
import PasswordCheck from "components/auth/PasswordCheck";

const FindPw = (props) => {
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [userToken, setUserToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(false);

  const [checkExistUser, setCheckExistUser] = useState(true);

  const handleEmailChange = (e) => {setEmail(e.target.value);};

  const buttonClick = (e) => {
    if(e.target.id === 'pw_reset_btn') {
      if(passwordCheck && password !== '') {
        UserAPI.updatePassword(userToken, password)
          .then(res => {
            console.log('[success] updateUserPW');
            console.log(res);
            alert('비밀번호 변경이 완료되었습니다.\n로그인 페이지로 이동합니다.');
            props.history.push('/login');
          })
          .catch(err => {
            console.log('[error] updateUserPW');
            console.log(err);
            alert('비밀번호 변경이 실패하였습니다.\n다시한번 확인해주세요.');
          });
      } else {
        alert('비밀번호가 올바르지 않습니다.\n다시 한번 확인해주세요.');
      }
    }
  };

  const getPhoneNum = (data) => {
    setPhoneNum(data.phoneNum);
    if(data.existUser) {  // if user exist. -> normal case
      setCheckExistUser(data.existUser);
      setUserToken(data.userToken);
    } else {  // if user doesn't exist. -> abnormal case
      setCheckExistUser(false);
    }
  };
  const getPassword = (data) => { // set user password
    if(data.pwLengthCheck && data.passwordMatch) {
      setPassword(data.password);
      setPasswordCheck(data.passwordMatch); // check password === passwordCheck
    }
    else setPassword('');
  };

  return (
    <div className="find-section find-pw">
      <div className="find-top">
        <p className="find-top__title">비밀번호 찾기</p>
      </div>
      <div className="find-inputs">
        <div className="input-container">
          <p className="inputs__title">아이디(이메일 주소)<em>*</em></p>
          <div className="inputs__value-wrapper">
            <input className="inputs__value" onChange={handleEmailChange} placeholder="ex. czer01ne@gmail.com"/>
          </div>
        </div>
        <PhoneAuth inputValue="email" email={email} callback={getPhoneNum}/>
        {
          checkExistUser ?
            userToken === '' ? '' : <PasswordCheck reset={true} callback={getPassword}/>
            :
            <p className="inputs__tip error-msg">존재하지 않는 회원정보입니다.<br/>다시 한번 확인해주세요.</p>
        }
        <button id="pw_reset_btn" className="find-pw-complete-btn" onClick={buttonClick} hidden={userToken === ''}>완료</button>
      </div>
    </div>
  );
};

export default withRouter(FindPw);