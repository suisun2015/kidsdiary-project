import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm, addArrayValue, removeArrayValue} from 'redux-form';

import * as acts from '../actions/DiaryAction';

import moment from 'moment';

import {TimePicker, TextField, Paper, FlatButton, RaisedButton, Toolbar, ToolbarGroup} from 'material-ui';

import Dropzone from 'react-dropzone';

import {Row, Col} from '../../../common/components/FlexGrid';
import {requestDiaryPost, requestMyDetail} from '../actions/DiaryAction';

class DiaryForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  state = {
    open: false,
    status: "元気",
    files: [],
    date: ''
  };

  componentDidMount() {
    const {dispatch, params:{childId, diaryDate}, myDetail} = this.props;
    if (diaryDate !== "new" && diaryDate.length !== 13) {
      return;
    }

    if (diaryDate === "new") {

      this.setState({
        date: Date.now(),
        status: myDetail.status
      });

      dispatch((dispatch) => {
        dispatch({
          type: acts.RECEIVE_MY_DETAIL,
          data: {}
        });
      })

    } 

    if(diaryDate.length === 13) {

      this.setState({
        date: parseInt(diaryDate),
        status: myDetail.status
      });

      const postData = {
        childId,
        diaryDate
      };
      dispatch(requestMyDetail(postData));
    }
  }

  getFormValues = (form) => {
    if (!form) return {};
    return Object.keys(form).filter((key) => !key.startsWith('_')).reduce((prev, key) => {
      prev[key] = form[key].value !== undefined ? form[key].value : form[key].defaultValue;
      return prev;
    }, {});
  };

  handleSubmit = () => {
    const {dispatch, fields, params: {childId, diaryDate}} = this.props;
    const {photoComment0, photoComment1, photoComment2} = this.refs;

    let postData = this.getFormValues(fields);
    postData.health = fields.health.map((c, idx) => this.getFormValues(c));
    postData.food = fields.food.map((c, idx) => this.getFormValues(c));
    postData.sleep = fields.sleep.map((c, idx) => this.getFormValues(c));
    postData.poop = fields.poop.map((c, idx) => this.getFormValues(c));
    postData.pee = fields.pee.map((c, idx) => this.getFormValues(c));
    postData.bath = fields.bath.map((c, idx) => this.getFormValues(c));

    postData.childId = childId;
    postData.diaryDate = this.state.date;

    let captions = [
      photoComment0 ? photoComment0.getValue() : '',
      photoComment1 ? photoComment1.getValue() : '',
      photoComment2 ? photoComment2.getValue() : ''
    ];

    dispatch(requestDiaryPost(postData, childId, this.state.date, this.state.files, captions));
  };

  onDrop = (idx) => {
    return (files) => {
      let sFiles = this.state.files;
      if (idx === 99)
        for (let i = 0; i < Math.min(files.length, 3); i++)
          sFiles.push(files[i]);
      else {
        for (let i = 0; i < Math.min(files.length, 3); i++) {
          sFiles[idx + i] = files[i];
        }
      }
      this.setState({files: sFiles});
    }
  };

  render() {
    const state = this.state;
    const {myDetail, fields, addValue, params: {diaryDate}} = this.props;

    const paperStyle = {
      height: 160,
      width: 160,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block'
    };

    const menuStyle = {
      icon: {
        width: '28px',
        height: '28px',
        verticalAlign: 'middle'
      },
      text: {
        marginLeft: '8px',
        verticalAlign: 'middle'
      }
    };

    const setDefaultTime = (timeVal) => {
      const defaultTime = (timeVal.initialValue)?timeVal.initialValue:this.state.date;
      //  timeVal.onChange(defaultTime);

      timeVal.value = (timeVal.value !== '')?timeVal.value:defaultTime;
      return defaultTime
    }

    return (
      <section className="content">
        <Row style={{paddingTop:'8px', paddingBottom:'8px'}}>
          <Col md="12">
            <h2>
              {(diaryDate ==='new')?('新規ダイアリー'):moment(this.state.date).format('YYYY年 M月D日')}
            </h2>
          </Col>
        </Row>

        <Row>
          <Col md='12'>
            <Row style={{backgroundColor:"#ECECEC"}}>
              <Col>
                <div style={{paddingLeft:"3em", lineHeight:"2.5em"}}>
                基本情報
                </div>
              </Col>
            </Row>
            <Row style={{borderBottom:'solid 0.1em'}}>
              <Col md='12'>
                <FlatButton
                  style={{width:'100%'}}
                  onClick={(event) => {
                    event.preventDefault();
                    addValue('DiaryForm', `health`);
                  }}><Row>
                    <Col md='12'>
                      <Row start>
                        <Col md='4'>体温入力</Col>
                        <Col md='7'></Col>
                        <Col md='1'>+</Col>
                      </Row>
                    </Col>
                  </Row>
                </FlatButton>
              </Col>
            </Row> {
              fields.health.map((h, idx) => {
                return <Row>
                  <Col md="1" className="v-center-box h_center">
                    <i className="material-icons">accessibility</i>
                  </Col>
                  <Col md="7">
                    <TimePicker
                      autoOk={true}
                      format="24hr"
                      hintText='計測時刻'
                      fullWidth={true}
                      defaultTime={new Date(setDefaultTime(h.healthTime)) }
                      onChange={(e,d) => h.healthTime.onChange(d.getTime()) }/>
                    <TextField hintText='健康' floatingLabelText="状態" style={{width:'100%'}} type="text" { ...h.healthStatus }/>
                    <TextField hintText='36.5' floatingLabelText="体温" style={{width:'100%'}} type="text" { ...h.temperature }/>
                  </Col>
                </Row>
                })
            }

            <Row style={{borderBottom:'solid 0.1em'}}>
              <Col md='12'>
                <FlatButton
                  style={{width:'100%'}}
                  onClick={(event) => {
                    event.preventDefault();
                    addValue('DiaryForm', `food`);
                  }}><Row>
                    <Col md='12'>
                      <Row start>
                        <Col md='4'>食事入力</Col>
                        <Col md='7'></Col>
                        <Col md='1'>+</Col>
                      </Row>
                    </Col>
                  </Row>
                </FlatButton>
              </Col>
            </Row>
            {fields.food.map((f, idx)=> {
              return <Row>
                <Col md="1" className="v-center-box h_center">
                  <i className="material-icons">accessibility</i>
                </Col>
                <Col md="7">
                  <TimePicker
                    autoOk={true}
                    format="24hr"
                    hintText='食事時刻'
                    floatingLabelText='食事時刻'
                    fullWidth={true}
                    defaultTime={new Date(setDefaultTime(f.foodTime)) }
                    onChange={(e,d) => f.foodTime.onChange(d.getTime()) }/>
                  <TextField floatingLabelText="メニュー" style={{width:'100%'}} type="text" { ...f.foodMenu }/>
                </Col>
              </Row>
              })
            }

            <Row style={{borderBottom:'solid 0.1em'}}>
              <Col md='12'>
                <FlatButton
                  style={{width:'100%'}}
                  onClick={(event) => {
                    event.preventDefault();
                    addValue('DiaryForm', `sleep`);
                  }}><Row>
                    <Col md='12'>
                      <Row start>
                        <Col md='4'>睡眠入力</Col>
                        <Col md='7'></Col>
                        <Col md='1'>+</Col>
                      </Row>
                    </Col>
                  </Row>
                </FlatButton>
              </Col>
            </Row>
            {fields.sleep.map((a, idx)=> {

              return <Row>
                <Col md="1" className="v-center-box h_center">
                  <i className="material-icons">accessibility</i>
                </Col>
                <Col md="7">
                  <TimePicker
                    autoOk={true}
                    format="24hr"
                    hintText='就寝時刻'
                    floatingLabelText='就寝時刻'
                    fullWidth={true}
                    defaultTime={new Date(setDefaultTime(a.sleepTime)) }
                    onChange={(e,d) => a.sleepTime.onChange(d.getTime()) }/>
                  <TimePicker
                    autoOk={true}
                    format="24hr"
                    hintText='起床時刻'
                    floatingLabelText='起床時刻'
                    fullWidth={true}
                    defaultTime={new Date(setDefaultTime(a.awakeTime)) }
                    onChange={(e,d) => a.awakeTime.onChange(d.getTime()) }/>
                </Col>
              </Row>
              })
            }

            <Row>
              <Col md="11" className="col-md-offset-1">
                <TextField { ...fields.textContent }
                  style={{width:'100%'}}
                  hintText="保護者への連絡"
                  floatingLabelText="保護者への連絡"
                  multiLine={true}
                />
              </Col>
            </Row>

            <Row>
              {state.files.map((f, idx) => {
                return (
                  <Col md="4" className="h_center" key={idx}>
                    <Paper style={paperStyle} zDepth={1}>
                      <Dropzone onDrop={this.onDrop(idx)} className="dropOnPaper">
                        {<img src={f.preview} className="dropOnPaper"/>}
                      </Dropzone>
                    </Paper>
                    <br />
                    <TextField style={{width:'100%'}} hintText="コメント" ref={'photoComment' + idx}/>
                  </Col>);
              })}
              {(state.files.length >= 3) ? null : <Col md="4" className="h_center">
                <Paper style={paperStyle} zDepth={1}>
                  <Dropzone onDrop={this.onDrop(99)} className="dropOnPaper">
                    <img src='/assets/images/add_image.png' className="dropOnPaper"/>
                  </Dropzone>
                </Paper>
              </Col>
              }
            </Row>

            <Row>
              <Toolbar style={{backgroundColor:''}}>
                <ToolbarGroup firstChild={true} float="left">
                </ToolbarGroup>
                <ToolbarGroup float="right">
                  <RaisedButton primary onClick={this.handleSubmit}>
                    <i className="material-icons" style={{color:'white'}}>create</i>
                  </RaisedButton>
                </ToolbarGroup>
              </Toolbar>
            </Row>
          </Col>
        </Row>

      </section>

    );
  }
}

const toInitialValues = (myDetail) => {
  const returnValue = { 
    helalth: myDetail.health,
    food: myDetail.food,
    sleep: myDetail.sleep,
    textContent: myDetail.textContent
  }
  return returnValue;
};

const fields = [
  'health[].healthStatus',
  'health[].temperature',
  'health[].healthTime',
  'food[].foodMenu',
  'food[].foodTime',
  'sleep[].sleepTime',
  'sleep[].awakeTime',
  'poop[].poopStatus',
  'poop[].poopTime',
  'pee[].peeStatus',
  'pee[].peeTime',
  'bath[].bathTime',
  'textContent'
];

const validate = (values) => {
  const errors = {};
  if (values.someValue < 0) {
    errors.someValue = "some value required over 0";
  }
  return errors;
};

DiaryForm = reduxForm(
  {
    form: 'DiaryForm',
    fields,
    validate
  },
  state => ({
    initialValues: toInitialValues(state.diary.myDetail), // form's initialValues
    ...state.diary
  }),
  {
    addValue: addArrayValue,
    removeValue: removeArrayValue
  }
)(DiaryForm);

export default DiaryForm;
