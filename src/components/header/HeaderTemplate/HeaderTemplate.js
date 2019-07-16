import React from 'react';
import './HeaderTemplate.scss';
import HeaderMobile from '../HeaderMobile';
import HeaderDesktop from '../HeaderDesktop';

const HeaderTemplate = (props) => {

  return(
    <div className="header-template">
      {
        props.mobile ?
          <HeaderMobile/>
          :
          <HeaderDesktop/>
      }
    </div>
  )
};

export default HeaderTemplate;