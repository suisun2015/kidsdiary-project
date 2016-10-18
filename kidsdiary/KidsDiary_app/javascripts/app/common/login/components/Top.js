import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {requestMyProfile} from '../actions/LoginActions';

class Top extends Component {

  render() {
    var redirect_url = "https://www.kidsdiary.jp/" + location.search;
    if (document.referrer) {
      var referrer = "referrer=" + encodeURIComponent(document.referrer);
      redirect_url = redirect_url + (location.search ? '&' : '?') + referrer;
    }
    location.href = redirect_url;
    //    const {dispatch} = this.props;
    //    dispatch(requestMyProfile());
    return <div></div>;
  }
}

export default connect(state => state)(Top);
