import React, {Fragment, useState} from 'react';
import { withRouter } from 'react-router-dom';
// import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import './AuthTemplate.scss';

import * as UserAPI from 'lib/api/user';
import PhoneAuth from '../PhoneAuth';
import EmailAuth from '../EmailAuth';
import PasswordCheck from '../PasswordCheck';

const AuthTemplate = (props) => {
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [birth, setBirth] = useState(new Date());
  const [knownPath, setKnownPath] = useState('');

  const [isNameValid, setIsNameValid] = useState(false);
  const [inputValidate, setInputValidate] = useState(null);   // 적용예정. 붉은 테두리, 초록테두리로 구분예정.
  const [passwordCheck, setPasswordCheck] = useState(false);

  const [checkExistUser, setCheckExistUser] = useState(false);
  // const [existUserEmail, setExistUserEmail] = useState('');


  const validateName = name => {
    if (name.length > 1) {
      setIsNameValid(true);
      return true;
    }
    else {
      setIsNameValid(false);
      return false;
    }
  };

  const handleInputChange = (e) => {
    if(e.target.id === 'input-name') {
      setName(e.target.value);
      validateName(e.target.value);
    } else if (e.target.id === 'input-phoneNum') {
      setPhoneNum(e.target.value);
    } else if (e.target.id === 'input-birth') {
      setBirth(e.target.value);
    }
  };

  const buttonClick = (e) => {
    if (!passwordCheck) {
      alert('비밀번호가 올바르지 않습니다.\n다시 한번 확인해주세요.');
      return;
    }
    if (e.target.id === 'signup-complete-btn') { // 회원가입 구현부 세부수정 필요.
      UserAPI.createNewUser(
        {
          email: email,
          passWd: password,
          name: name,
          phoneNum: phoneNum,
          birth: birth,
          knownPath: knownPath
        }
      ).then(res => {
        console.log(res);
        alert('회원가입 완료!!');
        props.history.push('/login');
      }).catch(err => {
        console.log(err);
      });
    } else if (e.target.id === 'signup-fail-btn') {
      alert('로그인 화면으로 돌아갑니다.');
      props.history.push('/login');
    }
  };

  // const dateChange = (date) => {
  //   // Day.js object
  //   // console.log(date);
  //   setBirth(date);
  //   console.log(date);
  // };
  //
  // const locale = {
  //   name: 'ko',
  //   weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
  //   weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
  //   months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  // };

  const selectChange = (e) => {
    setKnownPath(e.target.value);
    console.log(e.target.value);
  };

  const getPhoneNum = (data) => {
    setPhoneNum(data.phoneNum);
    if(data.existUser) {
      setCheckExistUser(data.existUser);
      // setExistUserEmail(data.userEmail);
    } else {
      setCheckExistUser(false);
      // setExistUserEmail('');
    }
  };
  const getEmail = (data) => {setEmail(data);};
  const getPassword = (data) => { // set user password
    if(data.pwLengthCheck && data.passwordMatch) {
      setPassword(data.password);
      setPasswordCheck(data.passwordMatch); // check password === passwordCheck
    }
    else setPassword('');
  };

  return (
    <div className="auth-template">
      <div className="auth-inputs">
        <div className="input-container">
          <p className="inputs__title">이름<em>*</em></p>
          <div className="inputs__value-wrapper">
            <input type="text" id="input-name" className={inputValidate ? "inputs__value validate" : "inputs__value invalidate"} onChange={handleInputChange} placeholder="ex. 조영일" required/>
          </div>
        </div>
        <PhoneAuth inputValue={"name"} name={name} callback={getPhoneNum}/>
        { /* if user already exists, return back to login page */
          checkExistUser ?
            <Fragment>
              <p className="inputs__tip error-msg">※ 해당 유저 정보로 가입된 아이디가 존재합니다.</p>
              <button id="signup-fail-btn" className="confirm-btn" onClick={buttonClick}>돌아가기</button>
            </Fragment>
            :
            <Fragment>
              <EmailAuth name={name} phoneNum={phoneNum} callback={getEmail}/>
              <PasswordCheck reset={false} callback={getPassword}/>

              <div className="input-2-container">
                <div className="input-container">
                  <p className="inputs__title">생년월일<em>*</em></p>
                  <div className="inputs__value-wrapper">
                    <input type="text" id="input-birth" className="inputs__value" onChange={handleInputChange} placeholder="ex. 1990-01-01"/>
                  </div>
                  {/*<DatePicker className="inputs__value" locale={locale} onChange={dateChange} showDefaultIcon/>*/ /* 모듈문제. 임시 삭제 조치. */ }
                </div>
                <div className="input-container">
                  <p className="inputs__title">모른챗을 알게 된 경로<em>*</em></p>
                  <select className="inputs__value" value={knownPath} onChange={selectChange}>
                    <option/>
                    <option value="first">SNS 홍보</option>
                    <option value="second">창업 관련 행사</option>
                    <option value="third">영업</option>
                    <option value="fourth">기타</option>
                  </select>
                </div>
              </div>
              <button id="signup-complete-btn" className="confirm-btn" onClick={buttonClick}>완료</button>
            </Fragment>
        }
      </div>
    </div>
  )
};

export default withRouter(AuthTemplate);