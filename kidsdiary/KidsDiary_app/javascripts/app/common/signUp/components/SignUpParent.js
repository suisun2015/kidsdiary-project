import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {requestSignUp, requestSchoolList, requestRoomList} from '../actions/SignUpActions';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {TextField, FlatButton, SelectField, MenuItem, DatePicker, AutoComplete} from 'material-ui';

import Dropzone from 'react-dropzone';
import {ImageDiv} from '../../../common/components/ImageDiv';
import {Row, Col} from '../../components/FlexGrid';
class SignUp extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    childGender: {},
    childBirthDate: {},
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

  onClickSignUpHome = () => {
    const {dispatch} = this.props;

    dispatch(requestSignUp(
      {
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue(),
        loginName: this.refs.loginName.getValue(),
        name: this.refs.userName.getValue(),
        nameKana: this.refs.userNameKana.getValue(),
        phone: this.refs.phone.getValue(),
        childName: this.refs.childName.getValue(),
        childNameKana: this.refs.childNameKana.getValue(),
        childBirthDate: this.state.childBirthDate,
        childNickName: this.refs.childNickName.getValue(),
        childGender: this.state.childGender,
        schoolId: this.state.schoolId,
        roomId: this.state.roomId
      },
      'GUARDIAN',
      '/h/',
      this.state.picture
    ));
  };

  onDrop = (picture) => {
    this.setState({picture: picture});
  };

  handleChildGenderChange = (event, index, value) => {this.setState({childGender: value});}

  handleChildBirthDateChange = (event, value) => {
    let day = value.getDate();
    if(day < 10){
      day = '0' + day;
    }
    let month = value.getMonth() + 1;
    if(month<10){
      month = '0' + month;
    }
    this.setState({childBirthDate: day + '.' + month + '.' + value.getFullYear()});
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestSchoolList());
  }

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
              <TextField
                ref='childName'
                hintText='お子様の名前'
                floatingLabelText='お子様の名前'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                ref='childNameKana'
                hintText='お子様の名前（カタカナ）'
                floatingLabelText='お子様の名前（カタカナ）'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                ref='childNickName'
                hintText='お子様のニックネーム'
                floatingLabelText='お子様のニックネーム'
                fullWidth={true}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <SelectField
                value={this.state.childGender}
                onChange={this.handleChildGenderChange}
                ref='childGender'
                hintText='お子様の性別'
                floatingLabelText='お子様の性別'
                fullWidth={true}
              >
                <MenuItem value={'F'} label="女" primaryText="女" />
                <MenuItem value={'M'} label="男" primaryText="男" />
              </SelectField>
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <DatePicker
                autoOk={true}
                onChange={this.handleChildBirthDateChange}
                ref='childBirthDate'
                hintText='お子様の誕生日'
                floatingLabelText='お子様の誕生日'
                container="inline"
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
              <FlatButton backgroundColor="#AA59FF"
                labelStyle={{color: "#FFFFFF"}}
                style={{
                  width: '100%',
                  height: '100%'
                }} 
                label="登録"
                onClick={this.onClickSignUpHome}/>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect(state => state.signUp)(SignUp);
