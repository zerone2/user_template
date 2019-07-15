import React, { Fragment, useState } from 'react';
import './PhoneAuth.scss';

import * as UserAPI from "lib/api/user";

const PhoneAuth = (props) => {

  const [phoneNum, setPhoneNum] = useState('');
  const [showPhoneNum, setShowPhoneNum] = useState('');
  const [authNum, setAuthNum] = useState('');
  const [authBtnText, setAuthBtnText] = useState('인증');

  const [isValidateNum, setIsValidatedNum] = useState(true);
  const [authSend, setAuthSend] = useState(false);
  const [authComplete, setAuthComplete] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [userToken, setUserToken] = useState('');

  // make phone format string
  const formatMobile = (phoneNum) => {
    var rtnNum;
    var regExp =/(01[016789])([0-9]{4})([0-9]{4})$/;

    var myArray;
    if(regExp.test(phoneNum)){
      myArray = regExp.exec(phoneNum);
      rtnNum = myArray[1]+'-'+myArray[2]+'-'+myArray[3];
      return rtnNum;
    } else {
      return phoneNum;
    }
  };

  // validate phone number
  const validatePhone = (num) => {
    var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    return regExp.test(num);
  };

  const handleInputChange = (e) => {
    if(e.target.id === "input-phoneNum") {  // 예외처리 해야됨.
      setPhoneNum(e.target.value);
      setShowPhoneNum(formatMobile(e.target.value));
    } else if(e.target.id === "input-authNum") {
      setAuthNum(e.target.value);
    }
  };

  const buttonClick = (e) => {
    if(e.target.id === 'auth_send_btn') {   // 인증버튼 클릭
      console.log(validatePhone(phoneNum));
      if(validatePhone(phoneNum)) {
        setIsValidatedNum(true);
        if(props.inputValue === 'name') { // find id / name + phoneNum 조합으로 찾기.
          UserAPI.findUserId(props.name, phoneNum) // 임시 -> 추후에 핸드폰 인증모듈로 변경해야됨.
            .then(res => {
              console.log('[success] findUserId in phoneAuth');
              if (res.data.status === 200) {
                setUserEmail(res.data.response.email);
              }
              setAuthSend(true);
              setAuthBtnText('인증버튼 재전송');
              alert('임시 인증번호 : 1234');
              console.log(res);
            })
            .catch(err => {
              console.log('[error] phoneAuth error in findUserId using name, phoneNum');
              setAuthBtnText('인증');
              console.log(err);
            });
        } else {  // find password / email + phoneNum 조합으로 찾기.
          UserAPI.findUserPassword(props.email, phoneNum)
            .then(res => {
              console.log('[success] findUserPassword in phoneAuth');
              if (res.data.status === 200) {
                setUserToken(res.data.response);
              }
              setAuthSend(true);
              setAuthBtnText('인증버튼 재전송');
              alert('임시 인증번호 : 1234');
              console.log(res);
            })
            .catch(err => {
              console.log('[error] phoneAuth error in findUserPassword using email, phoneNum');
              setAuthBtnText('인증');
              console.log(err);
            });
        }
      } else {
        alert('인증 요청 실패');
        setIsValidatedNum(false);
        setAuthBtnText('인증');
      }
    } else if (e.target.id === 'auth_confirm_btn') {  // 인증확인 버튼 클릭
      if(authNum === '1234') {
        alert('인증 완료!'); // 임시.. 인증 제대로 갖춰지면 코드 변경해야됨.
        setAuthComplete(true);

        if(props.inputValue === 'name') {
          if (userEmail !== '' && userEmail !== null) {
            props.callback({
              phoneNum: phoneNum,
              existUser: true,
              userEmail: userEmail
            });
          } else {
            props.callback({
              phoneNum: phoneNum,
              existUser: false
            });
          }
        } else {
          if (userToken !== '' && userToken !== null) {
            props.callback({
              phoneNum: phoneNum,
              existUser: true,
              userToken: userToken
            });
          } else {
            props.callback({
              phoneNum: phoneNum,
              existUser: false
            });
          }
        }
      } else {
        alert('인증 실패!\n4자리 이상으로 입력해주세요.'); // 임시.
        setAuthComplete(false);
      }
    }
  };

  return (
    <Fragment>
      <div className="input-container">
        <p className="inputs__title">휴대폰 번호<em>*</em></p>
        <div className="inputs__value-wrapper">
          <input type="tel" id="input-phoneNum" className="inputs__value" onChange={handleInputChange} disabled={authSend} value={showPhoneNum} placeholder="010-1234-5678"/>
          <button id="auth_send_btn" onClick={buttonClick}>{authBtnText}</button>
        </div>
          {
            isValidateNum ?
              <p className="inputs__tip" hidden={!authSend}>
                인증번호 전송은 통신사에 따라 최대 1분까지 소요될 수 있습니다.
                 인증번호가 도착하지 않을 경우 ‘인증번호 재전송’을 눌러주세요.
              </p>
              :
              <p className="inputs__tip error-msg" hidden={isValidateNum}>
                올바른 핸드폰 번호를 입력해주세요.
              </p>
          }
      </div>
      <div className="input-container">
        <div className="inputs__value-wrapper" style={{display: authSend ? 'flex' : 'none'}}>
          <input id="input-authNum" className="inputs__value" onChange={handleInputChange} disabled={authComplete} placeholder="인증번호"/>
          <button id="auth_confirm_btn" onClick={buttonClick}>확인</button>
        </div>
        <p className="inputs__tip" hidden={!authComplete}>
          인증이 완료되었습니다.
        </p>
      </div>
    </Fragment>
  )
};

export default PhoneAuth;