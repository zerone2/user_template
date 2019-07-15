import React, { useState, Fragment } from 'react';
import './PasswordCheck.scss';

const PasswordCheck = (props) => {

  const [inputPassword, setInputPassword] = useState('');
  const [pwLengthCheck, setPwLengthCheck] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e) => {
    if(e.target.id === "input_password") {
      if(e.target.value.length < 8) {
        setPwLengthCheck(false);
      } else {
        setPwLengthCheck(true);
      }
      setInputPassword(e.target.value);
    }
    else if(e.target.id === "input_password_check") {
      if(inputPassword === e.target.value) setPasswordMatch(true);
      else setPasswordMatch(false);

      props.callback({ // pass pw using callback
        pwLengthCheck: pwLengthCheck,
        password: e.target.value,
        passwordMatch: true
      });
    }
  };

  return (
    <Fragment>
      <div className="input-container">
        {
          props.reset ?
            <p className="find-input inputs__title" >새로운 비밀번호 등록<em>*</em></p>
            :
            <p className="pw-auth-input inputs__title">비밀번호<em>*</em></p>
        }
        <div className="pw-auth-input inputs__value-wrapper">
          <input type="password" id="input_password" className="pw-auth-input inputs__value" onChange={handleInputChange} />
        </div>
        <p className="pw-auth-input inputs__tip error-msg" hidden={pwLengthCheck}>※ 비밀번호는 최소 8자 이상이어야 합니다.</p>
      </div>
      <div className="input-container">
        <p className="pw-auth-input inputs__title">비밀번호 확인<em>*</em></p>
        <div className="pw-auth-input inputs__value-wrapper">
          <input type="password" id="input_password_check" className="pw-auth-input inputs__value" onChange={handleInputChange} />
        </div>
        <p className="pw-auth-input inputs__tip error-msg" hidden={passwordMatch}>비밀번호가 일치하지 않습니다.</p>
      </div>
    </Fragment>
  )
};

export default PasswordCheck;