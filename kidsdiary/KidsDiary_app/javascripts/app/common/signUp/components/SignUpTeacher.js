import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {requestSignUp, requestSchoolList, requestRoomList} from '../actions/SignUpActions';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {TextField, FlatButton, AutoComplete} from 'material-ui';
import Dropzone from 'react-dropzone';
import {ImageDiv} from '../../components/ImageDiv';

import {Row, Col} from '../../components/FlexGrid';
class SignUp extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    schoolId: {},
    roomId: {},
    picture: []
  };

  onSelectSchool = (chosenObject, chosenIndexNumber) => {
    this.setState({schoolId: chosenObject.schoolId});
    const {dispatch} = this.props;
    dispatch(requestRoomList({schoolId: chosenObject.schoolId}));
  }

  onSelectRoom = (chosenObject, chosenIndexNumber) => {
    this.setState({roomId: chosenObject.roomId});
  }

  getChildContext = () => {
    return {muiTheme: getMuiTheme(baseTheme)};
  };

  onClickSignUp = () => {
    const {dispatch} = this.props;

    dispatch(requestSignUp(
      {
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue(),
        loginName: this.refs.loginName.getValue(),
        name: this.refs.userName.getValue(),
        nameKana: this.refs.userNameKana.getValue(),
        phone: this.refs.phone.getValue(),
        schoolId: this.state.schoolId,
        roomId: this.state.roomId
      },
      'TEACHER',
      '/s/',
      this.state.picture
    ));
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestSchoolList());
  }

  onDrop = (picture) => {
    this.setState({picture: picture});
  };

  render() {
    const {schoolList, roomList} = this.props;

    const dataSourceConfig = {
      text: 'schoolName',
      value: 'schoolId'
    };

    const roomDataSourceConfig = {
      text: 'roomName',
      value: 'roomId'
    };

    return (
      <Row center>
        <Col md='6'>
          <Row center>
            <Col md="6" className="h_center">
              <Dropzone multiple={false} onDrop={this.onDrop} className="dropOnPaper">
                {(this.state.picture.length > 0) ?
                  <img src={this.state.picture[0].preview} className="dropOnPaper"/> :
                  <ImageDiv src={'/assets/images/add_image.png'}/>}
              </Dropzone>
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                ref='userName'
                hintText='ユーザーの名前'
                floatingLabelText='ユーザーの名前'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                ref='userNameKana'
                hintText='ユーザーの名前（カタカナ）'
                floatingLabelText='ユーザーの名前（カタカナ）'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                ref='loginName'
                hintText='アカウント名'
                floatingLabelText='アカウント名'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                ref='email'
                hintText='メールアドレス'
                floatingLabelText='メールアドレス'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                ref='phone'
                hintText='電話番号'
                floatingLabelText='電話番号'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <AutoComplete
                ref='schoolId'
                hintText='園名'
                floatingLabelText='園名'
                fullWidth={true}
                dataSource={schoolList.list}
                dataSourceConfig={dataSourceConfig}
                filter={AutoComplete.fuzzyFilter}
                onNewRequest={this.onSelectSchool}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <AutoComplete
                ref='roomId'
                hintText='教室名'
                floatingLabelText='教室名'
                fullWidth={true}
                dataSource={roomList.list}
                dataSourceConfig={roomDataSourceConfig}
                filter={AutoComplete.fuzzyFilter}
                onNewRequest={this.onSelectRoom}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                type='password'
                ref='password'
                hintText='パスワード'
                floatingLabelText='パスワード'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <FlatButton backgroundColor="#AA59FF"
                labelStyle={{color: "#FFFFFF"}}
                style={{
                  width: '100%',
                  height: '100%',
                }} 
                label="登録"
                onClick={this.onClickSignUp}/>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect(state => state.signUp)(SignUp);
