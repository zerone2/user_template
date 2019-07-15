import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import './FindPw.scss';

import * as UserAPI from "lib/api/user";

const FindPw = (props) => {
  const [hiddenSend, setHiddenSend] = useState(true);
  const [hiddenAuth, setHiddenAuth] = useState(true);
  const [returnAuthString, setReturnAuthString] = useState('');
  const [inputAuthString, setInputAuthString] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleEmailChange = (e) => {setEmail(e.target.value);};
  const handlePhoneChange = (e) => {setPhoneNum(e.target.value);};
  const handleAuthChange = (e) => {setInputAuthString(e.target.value);};
  const handlePasswordChange = (e) => {setPassword(e.target.value)};
  const handlePasswordCheckChange = (e) => {setPasswordCheck(e.target.value)};

  const buttonClick = (e) => {
    if(e.target.id === 'auth_btn') {
      UserAPI.findUserPassword(email, phoneNum)
        .then(res => {
          console.log('[success] findUserId');
          console.log(res);
          setReturnAuthString(''+res.status);
          alert('인증번호가 전송되었습니다!');
          setHiddenSend(false);

        })
        .catch(err => {
          console.log('[error] findUserId');
          console.log(err);
          setHiddenSend(true);
        });
    } else if(e.target.id === 'auth_confirm_btn') {
      // if(returnAuthString === inputAuthString) {
        alert('인증완료!');
        setHiddenAuth(false);
      // }
      // else {
      //   alert('인증실패!');
      //   setHiddenAuth(true);
      // }
    } else if(e.target.id === 'pw_reset_btn') {
      if(password === passwordCheck) {
        UserAPI.updatePassword(email, phoneNum, password)
          .then(res => {
            console.log('[success] updateUserPW');
            console.log(res);
            alert('비밀번호 변경이 완료되었습니다.\n로그인 페이지로 이동합니다.');
            props.history.push('/login');
          })
          .catch(err => {
            console.log('[error] updateUserPW');
            console.log(err);
            alert('비밀번호 변경이 실패하였습니다. \n다시한번 확인해주세요.');
          });
      }
      else {
        alert('비밀번호를 다시 확인해주세요.');
      }
    }
  };

  return (
    <div className="find-section">
      <div className="find-top">
        <p className="find-top__title">비밀번호 찾기</p>
      </div>
      <div className="find-inputs">
        <p className="find-inputs__title">아이디(이메일 주소)<em>*</em></p>
        <div className="find-inputs__value-wrapper">
          <input className="find-inputs__value" onChange={handleEmailChange} placeholder="ex. czer01ne@gmail.com"/>
        </div>
        <p className="find-inputs__title">휴대폰 번호<em>*</em></p>
        <div className="find-inputs__value-wrapper">
          <input type="tel" className="find-inputs__value" onChange={handlePhoneChange} disabled={!hiddenSend} placeholder="010-1234-5678"/>
          <button id="auth_btn" onClick={buttonClick}>인증</button>
        </div>
        <p className="find-inputs__tip" hidden={hiddenSend}>
          인증번호 전송은 통신사에 따라 최대 1분까지 소요될 수 있습니다.<br/>
          인증번호가 도착하지 않을 경우 ‘인증번호 재전송’을 눌러주세요.
        </p>
        <div className="find-inputs__value-wrapper" style={{display: hiddenSend ? 'none' : 'flex'}}>
          <input className="find-inputs__value" onChange={handleAuthChange} placeholder="인증번호"/>
          <button id="auth_confirm_btn" onClick={buttonClick}>확인</button>
        </div>
        <p className="find-inputs__tip" hidden={hiddenAuth}>
          인증이 완료되었습니다.
        </p>

        <p className="find-inputs__title" hidden={hiddenAuth}>새로운 비밀번호 등록<em>*</em></p>
        <div className="find-inputs__value-wrapper" style={{display: hiddenAuth ? 'none' : 'flex'}}>
          <input type="password" id="input_password" onChange={handlePasswordChange} className="find-inputs__value" />
        </div>
        <p className="find-inputs__title" hidden={hiddenAuth}>비밀번호 확인<em>*</em></p>
        <div className="find-inputs__value-wrapper" style={{display: hiddenAuth ? 'none' : 'flex'}}>
          <input type="password" id="input_password_check" onChange={handlePasswordCheckChange} className="find-inputs__value" />
        </div>
        <button id="pw_reset_btn" className="find-pw-complete-btn" onClick={buttonClick} hidden={hiddenAuth}>완료</button>
      </div>
    </div>
  );
};

export default withRouter(FindPw);