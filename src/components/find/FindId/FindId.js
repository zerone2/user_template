import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './FindId.scss';

import PhoneAuth from 'components/auth/PhoneAuth';

const FindId = (props) => {

  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [checkExistUser, setCheckExistUser] = useState(false);
  const [existUserEmail, setExistUserEmail] = useState('');

  const handleInputChange = (e) => {
    if(e.target.id === 'input-name') {
      setName(e.target.value);
    }
  };

  // callback func
  const getPhoneNum = (data) => {
    setPhoneNum(data.phoneNum);
    if(data.existUser) {
      setCheckExistUser(data.existUser);
      setExistUserEmail(data.userEmail);
    }
  };

  return (
    <div className="find-section find-id">
      <div className="find-top">
        <p className="find-top__title">아이디 찾기</p>
      </div>
      <div className="find-inputs">
        <div className="input-container">
          <p className="inputs__title">이름<em>*</em></p>
          <div className="inputs__value-wrapper">
            <input type="text" id="input-name" className="inputs__value" onChange={handleInputChange} placeholder="ex. 조영일" required/>
          </div>
        </div>
        <PhoneAuth inputValue={"name"} name={name} callback={getPhoneNum}/>
        <div className="input-container" style={{display: phoneNum === "" ? 'none' : 'block'}}>
          {
            checkExistUser ?
              <div className="find-id__result">
                <p>귀하의 아이디는 다음과 같습니다.</p>
                <div>{existUserEmail}</div>
              </div>
              :
              <div className="find-id__result">
                <p>일치하는 아이디가 없습니다.<br/>회원가입을 해주세요.</p>
                <div>{existUserEmail}</div>
              </div>
          }
        </div>
        <div className="input-container">
          <div className="find-id__btn-area">
            <Link to="/login"><button>로그인</button></Link>
            <Link to="/find/password"><button>비밀번호 찾기</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindId;