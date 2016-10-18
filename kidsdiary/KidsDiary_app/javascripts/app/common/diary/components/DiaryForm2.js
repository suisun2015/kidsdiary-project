import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    TextField, Table, TableHeader, TableBody,
    TableRow, TableHeaderColumn, TableRowColumn,
    Paper, FloatingActionButton, GridTile, GridList, Snackbar,
    SelectField, MenuItem, TimePicker,Divider,ActionDone


    ,Dialog
    ,FlatButton
    ,RaisedButton
    ,Card
    ,CardActions
    ,CardHeader
    ,CardText

    ,Toolbar
    ,ToolbarGroup,ToolbarSeparator,ToolbarTitle } from 'material-ui';



import Mobiscroll from 'react-mobiscroll';


import { requestDiaryPost, requestDetail, postPhotos } from '../actions/DiaryAction';


var TimeField = React.createClass({
  render: function () {
    var ops = {
      display: 'inline'
    };
    return (
        <div>
          <label>Time</label>
          <Mobiscroll preset="time" options={ops} elType="div"/>
        </div>
    );
  }
});


class DiaryForm2 extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
    someData01: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onClickRequest = this.onClickRequest.bind(this);

    this.state = {
      open: false,
      status: "元気",
      files: [],
      date: ''
    };
  }

  componentDidMount() {
    const { dispatch, params:{childId, diaryDate} } = this.props;
    //dispatch(requestSomeData());
    this.setState({date: new Date(parseInt(diaryDate))});
    if (!childId) {
      return;
    }
    const postData = {
      childId,
      diaryDate
    };
    dispatch(requestDetail(postData));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, location } = this.props;

    if (location !== prevProps.location) {
      dispatch(requestSomeData());
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {
    const { dispatch, params: { childId, diaryDate } } = this.props;
    const { textContent, temperature, sleepTime, awakeTime, photoComment0, photoComment1, photoComment2 } = this.refs;
    const postData = {
      childId,
      diaryDate,
      temperature: temperature.getValue(),
      textContent: textContent.getValue(),
      status: this.state.status,
      sleepTime: sleepTime.getTime().getTime(),
      awakeTime: awakeTime.getTime().getTime()
    };
    let captions = [
      photoComment0 ? photoComment0.getValue() : '',
      photoComment1 ? photoComment1.getValue() : '',
      photoComment2 ? photoComment2.getValue() : ''
    ];
    dispatch(requestDiaryPost(postData, childId, diaryDate, this.state.files, captions));
  };

  handleStatusChange = (event, index, health) => {
    this.setState({status: health});
  };

  onClickSubmit = () => {
    const { dispatch } = this.props;
    const { files } = this.state;
    console.log('files =', files);
    dispatch(postPhotos(files));
    this.setState({open: false, files: []});
  };

  onClickRequest() {
    const { dispatch } = this.props;

    dispatch(requestDetail({}));
  }

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

  timeFormat = (time) => {
    const t = new Date(time);
    return `${t.getHours()}時${t.getMinutes() !== 0 ? t.getMinutes() + '分' : ''}`;
  };

  render() {
    const state = this.state;


    var ops = {
      showInput: true,
      display: 'inline'
    };

    var timePickerOpts = {
      display: 'inline',
      showInput: true,
      data: [
        {text: '1', value: '1', group: ''},
        {text: '2', value: '2', group: ''},
        {text: '3', value: '3', group: ''},
        {text: '4', value: '4', group: ''},
        {text: '5', value: '5', group: ''},
        {text: '6', value: '6', group: ''},
        {text: '7', value: '7', group: ''},
        {text: '8', value: '8', group: ''},
        {text: '9', value: '9', group: ''},
        {text: '10', value: '10', group: ''},
        {text: '11', value: '11', group: ''},
        {text: '12', value: '12', group: ''},
        {text: '13', value: '13', group: ''},
        {text: '14', value: '14', group: ''},
        {text: '15', value: '15', group: ''},
        {text: '16', value: '16', group: ''},
        {text: '17', value: '17', group: ''},
        {text: '18', value: '18', group: ''},
        {text: '19', value: '19', group: ''},
      ]
    };

//    <Mobiscroll preset="select" options={timePickerOpts} elType="input"/><Mobiscroll preset="time" options={ops} elType="input"/>;
    return <div>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <h6>Header 6</h6>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit iusto adipisci, cupiditate animi, itaque
        qui aspernatur vel corrupti labore minima, excepturi ab, fuga rem dolores. Ratione sunt autem iusto aliquid.
      </p>

      <ul>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
      </ul>

      <ol>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
      </ol>
      <Mobiscroll preset="select" options={timePickerOpts} elType="input" ref="testTime"
                  onClick={()=>{console.log('this.refs.testTime.getValue() =',this.refs.testTime.getValue());}}/>
    </div>
  }
}

export default connect(state => state.diary)(DiaryForm2);
