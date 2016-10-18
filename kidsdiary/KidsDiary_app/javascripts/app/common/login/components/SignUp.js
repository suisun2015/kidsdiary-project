import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
    addLoginPageCss, removeLoginPageCss, requestLogin, requestSignUp
}
    from '../actions/LoginActions';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    TextField, Table, TableHeader, TableBody,
    TableRow, TableHeaderColumn, TableRowColumn,
    RaisedButton, Paper, FlatButton, Dialog
} from 'material-ui';

class SignUp extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  state = {
    schoolDialog: false,
    homeDialog: false
  };

  constructor(props) {
    super(props);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onClickSignUpAdmin = this.onClickSignUpAdmin.bind(this);
  }

  getChildContext = () => {
    return {muiTheme: getMuiTheme(baseTheme)};
  };

  componentDidMount = () => {
    addLoginPageCss();
  };

  componentWillUnmount = () => {
    removeLoginPageCss();
  };

  onClickLogin() {
    const {dispatch} = this.props;

    dispatch(requestLogin(
        {
          email: this.refs.userName.getValue(),
          password: this.refs.password.getValue()
        }
    ));
  }

  onClickSignUp() {
    const {dispatch} = this.props;

    dispatch(requestSignUp(
        {
          email: this.refs.email.getValue(),
          password: this.refs.password.getValue(),
          loginName: this.refs.loginName.getValue(),
          name: this.refs.userName.getValue(),
          phone: this.refs.phone.getValue()
        },
        'TEACHER',
        '/s/'
    ));
  }


  onClickSignUpAdmin = () => {
    const {dispatch} = this.props;

    dispatch(requestSignUp(
        {
          email: this.refs.email.getValue(),
          password: this.refs.password.getValue(),
          loginName: this.refs.loginName.getValue(),
          name: this.refs.userName.getValue(),
          phone: this.refs.phone.getValue(),
          schoolName: this.refs.schoolName.getValue()
        },
        'DIRECTOR',
        '/s/'
    ));
    this.handleClose();
  };

  onClickSignUpHome = () => {
    const {dispatch} = this.props;

    dispatch(requestSignUp(
        {
          email: this.refs.email.getValue(),
          password: this.refs.password.getValue(),
          loginName: this.refs.loginName.getValue(),
          name: this.refs.userName.getValue(),
          phone: this.refs.phone.getValue(),
          childName: this.refs.childName.getValue(),
          childBirthDate: 111,//this.refs.childBirthDate.getValue(),
          childFamilyName: this.refs.childFamilyName.getValue(),
          childGivenName: this.refs.childGivenName.getValue(),
          childGender: this.refs.childGender.getValue()
        },
        'GUARDIAN',
        '/h/'
    ));
    this.handleClose();
  };

  handleOpenAdmin = () => {
    this.setState({
      schoolDialog: true,
      homeDialog: false
    });
  };

  handleOpenHome = () => {
    this.setState({
      schoolDialog: false,
      homeDialog: true
    });
  };

  handleClose = () => {
    this.setState({
      schoolDialog: false,
      homeDialog: false
    });
  };

  render() {
    const {data} = this.props;

    const adminActions = [
      <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
      />,
      <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this.onClickSignUpAdmin}
      />
    ];
    const homeActions = [
      <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}
      />,
      <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this.onClickSignUpHome}
      />
    ];
    return (

        <div className="container">

          <div className="jumbotron" style={{height: '650px'}}>
            <div className="loginContainer">
              <h2>KIDS DIARY</h2>
              <div className="box">
                <TextField type="text" name="loginName" floatingLabelText="Login name" ref="loginName"/>
                <TextField type="password" name="password" floatingLabelText="Password" ref="password"/>
                <TextField type="text" name="userName" floatingLabelText="Full name" ref="userName"/>
                <TextField type="text" name="email" floatingLabelText="Email" ref="email"/>
                <TextField type="text" name="phone" floatingLabelText="Phone number" ref="phone"/>
                <br />
                <button className="btn btn-default full-width" onClick={this.onClickSignUp}>
                  <i className="glyphicon glyphicon-ok"/> 先生
                </button>
                <br />

                <button className="btn btn-default full-width" onClick={this.handleOpenAdmin}>
                  <i className="glyphicon glyphicon-ok"/> 園長先生
                </button>
                <br />
                <button className="btn btn-default full-width" onClick={this.handleOpenHome}>
                  <i className="glyphicon glyphicon-ok"/> 保護者
                </button>
                <br />
                <Link to="/login">
                  ログイン
                </Link>
              </div>
            </div>
          </div>

          <Dialog
              title="園名を入力"
              actions={adminActions}
              modal={true}
              open={this.state.schoolDialog}
              onRequestClose={this.handleClose}
          >
            <TextField type="text" name="schoolName" floatingLabelText="Phone number" ref="schoolName"/>
          </Dialog>

          <Dialog
              title="子供の情報を入力"
              actions={homeActions}
              modal={true}
              open={this.state.homeDialog}
              onRequestClose={this.handleClose}
          >
            <TextField type="text" name="childName" floatingLabelText="Child Name" ref="childName"/>
            <TextField type="text" name="childBirthDate" floatingLabelText="Child BirthDate" ref="childBirthDate"/>
            <TextField type="text" name="childFamilyName" floatingLabelText="Child FamilyName" ref="childFamilyName"/>
            <TextField type="text" name="childGivenName" floatingLabelText="Child GivenName" ref="childGivenName"/>
            <TextField type="text" name="childGender" floatingLabelText="Child Gender" ref="childGender"/>
          </Dialog>
        </div>

    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
  data: PropTypes.object
};

export default connect(state => state)(SignUp);
