import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './FindId.scss';

import * as UserAPI from 'lib/api/user';

const FindId = (props) => {

  const [hiddenSend, setHiddenSend] = useState(true);
  const [hiddenAuth, setHiddenAuth] = useState(true);
  const [returnAuthString, setReturnAuthString] = useState('');
  const [inputAuthString, setInputAuthString] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleNameChange = (e) => {setName(e.target.value);};
  const handlePhoneChange = (e) => {setPhoneNum(e.target.value);};
  const handleAuthChange = (e) => {setInputAuthString(e.target.value);};

  const buttonClick = (e) => {
    if(e.target.id === 'auth_btn') {
      UserAPI.findUserId(name, phoneNum)
        .then(res => {
          console.log('[success] findUserId');
          console.log(res);
          setHiddenSend(false);
          alert('인증번호가 전송되었습니다!');
          setUserEmail(res.data + 'morethan@chat.com');
          setReturnAuthString(''+res.status);
        })
        .catch(err => {
          console.log(err);
          setHiddenSend(true);
          alert('인증번호 전송이 실패했습니다.\n다시한번 확인 후 입력해주세요');
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
    }
  };

  return (
    <div className="find-section">
      <div className="find-top">
        <p className="find-top__title">아이디 찾기</p>
      </div>
      <div className="find-inputs">
        <p className="find-inputs__title">이름<em>*</em></p>
        <div className="find-inputs__value-wrapper">
          <input className="find-inputs__value" onChange={handleNameChange} placeholder="ex. 조영일"/>
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
          <input className="find-inputs__value" onChange={handleAuthChange} disabled={!hiddenAuth} placeholder="인증번호"/>
          <button id="auth_confirm_btn" onClick={buttonClick}>확인</button>
        </div>
        <p className="find-inputs__tip" hidden={hiddenAuth}>
          인증이 완료되었습니다.
        </p>

        <div className="find-id__result" style={{display: hiddenAuth ? 'none' : 'flex'}}>
          <p>귀하의 아이디는 다음과 같습니다.</p>
          <div>{userEmail}</div>
        </div>
        <div className="find-id__btn-area">
          <Link to="/login"><button>로그인</button></Link>
          <Link to="/find/password"><button>비밀번호 찾기</button></Link>
        </div>
      </div>
    </div>
  );
};

export default FindId;