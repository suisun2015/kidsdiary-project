import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
    addLoginPageCss, removeLoginPageCss,
    requestLogin
} from '../actions/LoginActions';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    TextField, Table, TableHeader, TableBody,
    TableRow, TableHeaderColumn, TableRowColumn,
    FlatButton, Paper
} from 'material-ui';

import {Row, Col} from '../../components/FlexGrid';

class Login extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  getChildContext = () => {
    return {muiTheme: getMuiTheme(baseTheme)};
  };

  componentDidMount = () => {
    resizeContentWrapper();
    addLoginPageCss();
  };

  componentWillUnmount = () => {
    removeLoginPageCss();
  };

  componentDidUpdate(prevProps) {
    const {dispatch, location} = this.props;
  }

  onClickLogin = () => {
    const {dispatch} = this.props;

    dispatch(requestLogin(
        {
          loginName: this.refs.loginName.getValue(),
          password: this.refs.password.getValue()
        }
    ));
  };
//*[@id="root"]/div

  render() {
    return (
        <Row center className="fullHeight">
          <div className='gradient-1' style={{color:'#FFFFFF', width:'100%', height:'100%'}}  id="contentWrapper">
            <div style={{position:'relative',
              top:'25px',
              textAlign:'center'}}>
              <span style={{fontSize:'76px'}}>KidsDiary</span><br />
            </div>

            <div style={{ width:'400px', margin:' auto'}}>

              <Paper zDepth={1} style={{marginTop:'100px'}}>
                <TextField
                    ref="loginName"
                    hintText="ユーザー名"
                    floatingLabelText="ユーザー名"
                    underlineShow={false}
                    style={{
                    marginLeft:'16px',
                    marginRight:'-16px',
                  width: '100%'
                  }}
                /><br/>
                <TextField ref="password"
                           hintText="パスワード"
                           floatingLabelText="パスワード"
                           type="password"
                           underlineShow={false}
                           style={{
                    marginLeft:'16px',
                    marginRight:'-16px',
                  width: '100%'
                  }}
                /><br/>
                <FlatButton backgroundColor="#AA59FF"
                            labelStyle={{color: "#FFFFFF"}}
                            style={{
                  width: '100%'
                  }}
                            label="ログイン"
                            onClick={this.onClickLogin}/>
              </Paper>
              <div style={{position:'relative', top:'30px'}}>
                <Link to="/signUp">
                  <div style={{float:'left', color:"#FFFFFF"}}>{
                    //サインアップ
                  }</div>
                </Link>
                <div style={{float:'right'}}>{
                  //パスワードをお忘れの場合
                }</div>
              </div>
            </div>
          </div>

          <footer className="footer" style={{width:'100%'}}>
            <div className="container text-center">
              <nav className="links">
                <div className="links legal-links list-inline">
                  <a href="privacy.html">プライバーシ</a> | <a href="terms.html">利用契約</a>
                </div>
                <small className="copyright">Copyright &copy; 2016 <a
                    href="http://themes.3rdwavemedia.com/">KidsDiary</a>
                </small>
              </nav>
            </div>
          </footer>
        </Row>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
  data: PropTypes.object
};

export default connect(state => state)(Login);

//window.console = {log: () => {}};
const resizeContentWrapper = () => document.getElementById('contentWrapper').style.minHeight = (window.innerHeight - 183) + 'px';
window.addEventListener('load', resizeContentWrapper, false);
window.addEventListener('resize', resizeContentWrapper, false);
