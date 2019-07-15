import React from 'react';
import { Link } from "react-router-dom";
import './ReturnTemplate.scss';

import left_arrow from 'static/images/common/arrow-left.png';

const ReturnTemplate = (props) => {
  return (
    <div className="return-template">
      <Link to={"/" + props.params}>
        <div className="return-btn">
          <img src={left_arrow} alt="back_button"/>
          <p>뒤로 가기</p>
        </div>
      </Link>
    </div>
  )
};

export default ReturnTemplate;