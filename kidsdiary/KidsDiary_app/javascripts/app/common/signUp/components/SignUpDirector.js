import React, {Component, PropTypes} from 'react';
import {createStore, combineReducers} from 'redux';
import {reduxForm, addArrayValue, removeArrayValue} from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {requestSignUp} from '../actions/SignUpActions';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {TextField, FlatButton} from 'material-ui';

import Dropzone from 'react-dropzone';
import {ImageDiv} from '../../../common/components/ImageDiv';
import {getFormValues} from '../../utils/Utils';
import {Row, Col} from '../../components/FlexGrid';

class SignUp extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    picture: []
  };

  getChildContext = () => {
    return {muiTheme: getMuiTheme(baseTheme)};
  };

  onDrop = (picture) => {
    this.setState({picture: picture});
  };

  onClickSignUpAdmin = () => {
    const {dispatch, fields} = this.props;
    const rooms = fields.rooms.map((room) => room.value);
    let sendValues = getFormValues(fields);
    sendValues.rooms = rooms;
    dispatch(requestSignUp(
      sendValues
      ,
    'DIRECTOR',
    '/s/',
    this.state.picture
    ));
  };
  render() {
    const {fields, addValue} = this.props;

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
                hintText='ユーザーの名前'
                floatingLabelText='ユーザーの名前'
                fullWidth={true}
                { ...fields.name}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                hintText='ユーザーの名前（カタカナ）'
                floatingLabelText='ユーザーの名前（カタカナ）'
                fullWidth={true}
                { ...fields.nameKana}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                hintText='アカウント名'
                floatingLabelText='アカウント名'
                fullWidth={true}
                { ...fields.loginName}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                hintText='メールアドレス'
                floatingLabelText='メールアドレス'
                fullWidth={true}
                { ...fields.email}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                hintText='電話番号'
                floatingLabelText='電話番号'
                fullWidth={true}
                { ...fields.phone}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                type='password'
                hintText='パスワード'
                floatingLabelText='パスワード'
                fullWidth={true}
                { ...fields.password}
              />
            </Col>
          </Row>
          <Row center>
            <Col md='6'>
              <TextField
                hintText='園名'
                floatingLabelText='園名'
                fullWidth={true}
                { ...fields.schoolName}
              />
            </Col>
          </Row>
          {fields.rooms.map((room, idx) => {
            return(
              <Row center>
                <Col md='6'>
                  <TextField
                    type='rooms'
                    hintText='教室'
                    floatingLabelText='教室'
                    fullWidth={true}
                    { ...room} key={idx}
                  />
                </Col>
              </Row>
              )
          }
          )
          }
          <Row center>
            <Col md='6'>
              <FlatButton backgroundColor="#AA59FF"
                labelStyle={{color: "#FFFFFF"}}
                style={{
                  width: '100%',
                  height: '100%',
                }} 
                label="教室名追加"
                onClick={function (event) {
                  event.preventDefault();
                  addValue('DirectorSignUpFrom', `rooms`);
                }}/>
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
                onClick={this.onClickSignUpAdmin}/>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const fields = [
  'name',
  'nameKana',
  'loginName',
  'password',
  'email',
  'phone',
  'schoolName',
  'rooms[]'
];

export default reduxForm(
  {
    form: 'DirectorSignUpFrom',
    fields
  },

  state => state,

  {
    addValue: addArrayValue,
    removeValue: removeArrayValue
  }
)(SignUp);

