import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Firebase from 'firebase';
import moment from 'moment';
import {List, ListItem, Subheader, FloatingActionButton} from 'material-ui';
import {DatePicker} from 'material-ui';
import {FlatButton} from 'material-ui';
import {Dialog} from 'material-ui';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import {Row, Col} from '../../../common/components/FlexGrid';
import {ImageDiv} from '../../../common/components/ImageDiv';

import {requestDetail, postPhotos, requestRecentDiaries} from '../actions/DashBoardAction';

class DashBoard extends Component {
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
      files: [],
      messages: [],
      openDialog: false
    };
  }

  componentDidMount() {
    const self = this;
    const {dispatch} = this.props;
    //const myFirebaseRef = new Firebase("https://kidsdiary.firebaseio.com/");
    //myFirebaseRef.child("message_list/kidsdiary_room").on("value", function (snapshot) {
    //  console.log(snapshot.val());  // Alerts "San Francisco"
    //  const obj = snapshot.val();
    //  if (obj) {
    //    const messageAry = Object.keys(obj).map((k, i)=> {
    //      return obj[k];
    //    }).reverse();
    //
    //    self.setState({messages: messageAry});
    //  }
    //});

    dispatch(requestRecentDiaries());
  }

  componentDidUpdate(prevProps) {
    const {dispatch, location} = this.props;

    if (location !== prevProps.location) {
      //dispatch(requestSomeData());
    }
  }

  handleOpen = () => {
    this.setState({openDialog: true});
  };

  handleClose = () => {
    this.setState({openDialog: false});
  };

  onClickSubmit = () => {
    const {dispatch} = this.props;
    const {files} = this.state;
    console.log('files =', files);
    dispatch(postPhotos(files));
    this.setState({open: false, files: []});
  };

  onClickRequest() {
    const {dispatch} = this.props;
  }

  onDrop = (files) => {
    console.log('Received files: ', files);
    this.setState({files});
  };

  render() {
    const {messages} = this.state;
    const {data, recentDiaries} = this.props;
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      },
      gridList: {
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        margin: 14
      }
    };

    const listStyle = {
      height: '280px',
      overflowY: 'auto'
    };

    const style = {
      height: '140px',
      display: 'inline-block',
      padding: '16px'
    };

    const fabStyle = {
      margin: 28,
      marginBottom: 20,
      boxShadow: ''
    };
    const N_A = <Row className="bottom-line">
      <Col md="12">
        今日のお知らせ ニューストピックス<br/>
        今日のお知らせ ニューストピックス<br/>
        今日のお知らせ ニューストピックス<br/>
      </Col>
    </Row>;
    return (
        <section className="">

          <Row className="bottom-line bottom-xs">
            <Col md="6" sm="12">
              <Row className="bottom-line">
                <Col md="4" style={style} className="v_center h_center">
                  登園記録DL<br />
                  <FloatingActionButton onClick={this.handleOpen}>
                    <ContentAdd />
                  </FloatingActionButton>
                </Col>

                <Col md="4" style={style} className="v_center h_center left-line">
                  ダイアリー<br />
                  <FloatingActionButton mini containerStyle={fabStyle} backgroundColor="#ccc">
                    <ContentAdd />
                  </FloatingActionButton>
                </Col>

                <Col md="4" style={style} className="v_center h_center left-line">
                  お知らせ<br />
                  <FloatingActionButton mini containerStyle={fabStyle} backgroundColor="#ccc">
                    <ContentAdd />
                  </FloatingActionButton>
                </Col>
              </Row>
              <Row className="">
                <Col md="4" style={style} className="v_center h_center">
                  アルバム<br />
                  <FloatingActionButton mini containerStyle={fabStyle} backgroundColor="#ccc">
                    <ContentAdd />
                  </FloatingActionButton>
                </Col>
                <Col md="4" style={style} className="v_center h_center left-line">
                  カレンダー<br />
                  <FloatingActionButton mini containerStyle={fabStyle} backgroundColor="#ccc">
                    <ContentAdd />
                  </FloatingActionButton></Col>
                <Col md="4" style={style} className="v_center h_center left-line">
                  食事<br />
                  <FloatingActionButton mini containerStyle={fabStyle} backgroundColor="#ccc">
                    <ContentAdd />
                  </FloatingActionButton>
                </Col>
              </Row>
            </Col>
            <Col md="6" sm="12" className=" left-line">
              <List containerStyle={listStyle}>
                <Subheader>お知らせ</Subheader>
                {
                  messages.map((m, i) => {
                    return <ListItem key={i} primaryText={m.message}
                                     secondaryText={moment(parseInt(m.time_stamp)).format('M月D日 HH:mm:ss').toString()}
                                     leftAvatar={<Avatar src="/assets/images/temp0.jpg"/>}/>;
                  })
                }
              </List>
            </Col>
          </Row>

          <Row>
            <div className="col-20per h_center">
              2
            </div>
            <div className="col-20per h_center">
              1
            </div>
            <div className="col-20per h_center">
              4/6
            </div>
            <div className="col-20per h_center">
              1
            </div>
            <div className="col-20per h_center">
              5
            </div>
          </Row>

          <Row>
            {
              recentDiaries.list.map((d, idx) => (
                  <Col md="3" key={idx} className="h_center" style={{marginTop:'24px'}}>
                    <Link to={`/s/diary/${d.childId}/${d.diaryDate}`}>
                      <ImageDiv src={d.imageUrl ? d.imageUrl : '/assets/images/temp0.jpg'}
                                border={d.readStatus === 'true'?"solid 3px #fff":"solid 3px #508DDB"}
                      />
                    </Link>
                    <div>{d.childName}</div>
                  </Col>
              ))
            }
          </Row>

          <Dialog
              open={this.state.openDialog}
              onRequestClose={this.handleClose}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}>

            <form method="post" action="/api/attendance/download" onSubmit={this.handleClose}>

              <DatePicker name="attendanceDateStr"
                          hintText="対象日を選択"
                          container="inline"
                          defaultDate={new Date()}
                          autoOk="true"/>
              <FlatButton type="submit">
                <FileDownload />
              </FlatButton>
            </form>
          </Dialog>
        </section>
    );
  }
}

export default connect(state => state.dashBoard)(DashBoard);

const NotifyItem = (props) => {
  return <ListItem key={i} primaryText={m.message}
                   secondaryText={moment(parseInt(m.time_stamp)).format('M月D日 HH:mm:ss').toString()}
                   leftAvatar="/assets/images/temp0.jpg"/>;


};
