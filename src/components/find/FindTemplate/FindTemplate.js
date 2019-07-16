import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './FindTemplate.scss';

import ReturnTemplate from "components/return/ReturnTemplate";
import FindId from "components/find/FindId";
import FindPw from "components/find/FindPw";
import HeaderTemplate from "components/header/HeaderTemplate";

class FindTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      findObject: props.match.params.object,
      mobile: (window.innerWidth < 767)
    };
  }

  componentDidUpdate(prevProps) {
    const { params: {object} } = this.props.match;
    if (prevProps.match.params.object !== object) {
      this.setState({
        findObject: object
      })
    }
    // console.log(object);
    // console.log(prevProps.history);
  }

  render() {
    let state = this.state;
    return(
      <div className="find-template">
        {
          state.mobile ?
            <HeaderTemplate mobile={state.mobile}/>
            :
            <ReturnTemplate params='login'/>
        }
        {state.findObject === 'id' ? <FindId/> : <FindPw/>}
      </div>
    )
  }
}

export default withRouter(FindTemplate);