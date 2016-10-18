import React, { Component, PropTypes } from 'react';
import NavigationMenu from './NavigationMenu';

import {connect} from 'react-redux';
import {requestDetail} from './init/InitActions';
import {requestLogout} from '../../common/login/actions/LoginActions';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class RootComponent extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static propTypes = {
    params: PropTypes.object,
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  getChildContext = () => {
    return {muiTheme: getMuiTheme(baseTheme)};
  };


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestDetail());
  }

  onClickLogout() {
    const {dispatch} = this.props;
    return () => {
      dispatch(requestLogout());
    };
  }

  render() {
    const {children, user} = this.props;
    console.log('user     =', user);
    if (!user.name) {
      return <div>&nbsp;loading..</div>;
    }


    return (
        <div>
          <NavigationMenu user={user}/>
          <section className="main_content">
            <section className="wrapper">
              {
                children
              }
            </section>
          </section>
        </div>
    );
  }
}

export default connect(state => state.home)(RootComponent);
