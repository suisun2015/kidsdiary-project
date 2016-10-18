import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment';

import {
  Tabs, Tab, Dialog, Paper, FlatButton, FloatingActionButton, Snackbar
} from 'material-ui';

import ActionDone from 'material-ui/svg-icons/action/done';
import {Row, Col} from '../../../common/components/FlexGrid';
import {ImageDiv} from '../../../common/components/ImageDiv';
import {
  requestProfile, requestMyProfile, requestTimeline, requestDetail, postPhotos, closeSnackbar,
  initProps
} from '../actions/DiaryAction';

class DiaryDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
    someData01: PropTypes.object
  };

  regex = /(\n)/g;

  state = {
    openPhoto: false,
    openPhotoUrl: {},
    slideIndex: 0
  };

  handleChangeSidebar = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  handleOpenPhoto = (photoUrl) => () => {
    this.setState({
      openPhoto: true,
      openPhotoUrl: photoUrl
    });
  };

  handleClosePhoto = () => {
    this.setState({
      openPhoto: false,
      openPhotoUrl: {}
    });
  };

  componentDidMount() {
    const {dispatch, params:{childId, diaryDate}} = this.props;
    //dispatch(requestSomeData());
    if (!childId) {
      return;
    }
    const postData = {
      childId,
      diaryDate
    };
    dispatch(initProps());
    dispatch(requestDetail(postData));
    dispatch(requestTimeline(postData));

      /*
    const postDataForChildProfile = {
      userId: childId
    };
    dispatch(requestProfile(postDataForChildProfile));
    */
    dispatch(requestMyProfile());
  }

  componentDidUpdate(prevProps) {
  }

  onClickRequest() {
    const {dispatch} = this.props;
    dispatch(requestDetail({}));
  }

  onDrop = (files) => {
    console.log('Received files: ', files);
    this.setState({files});
  };

  timeFormat = (time) => {
    var m = moment();

    // formatを指定して出力
    m.format("YYYY年MM月DD日 ddd");
    const t = new Date(time);
    return `${t.getHours()}時${t.getMinutes() !== 0 ? t.getMinutes() + '分' : ''}`;
  };

  handleToForm = () => {
    const {params: {childId, diaryDate}} = this.props;
    this.props.dispatch(push(`/s/diary/${childId}/${diaryDate}/form`))
  };

  handleRequestClose = () => {
    console.log('close =');
    this.props.dispatch(closeSnackbar());
  };

  createTimelineBlock = (rawData = {}) => {
    return {
      timeline: rawData.list.length > 0 ?
        rawData.list.map((timeline, idx) =>
          <li>
            <Row center={true}>
              <Col md='5'>
                <time className="cbp_tmtime">

                  {(()=>{const timelineDate = moment(timeline.time);
                    return <Row center={true}>
                      <Col md='12'>
                        <Row center={true}>
                          <Col>{
                            timelineDate.format('hh:mm') }
                          </Col>
                        </Row>
                        <Row center={true}>
                          <Col>{
                            timelineDate.format('A')}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    })()
                  }

                </time>
              </Col>
              <Col md='2'>
                <div className="cbp_tmicon" style={{color:(timeline.type == 'Awake' || timeline.type == 'Sleep')?'purple':
                  (timeline.type == 'Food')?'blue':
                  (timeline.type == 'Health')?'green':
                  (timeline.type == 'PickUp')?'green':'black'}}></div>
              </Col>
              <Col md='5'>
                <p>{timeline.text}</p>
              </Col>
            </Row>
          </li>
        )
        : null
    }
  };

  createBlock = (rawData = {}) => {
    return {
      health: rawData.health.length > 0 ? <div>
        {
          rawData.health.map((health, idx) =>
            <div>
              <div className="detail-info"
                style={{color: health.healthStatus && health.healthStatus !== '健康' ? 'red' : ''}}>
                <p>{(health.healthStatus != '') ? health.healthStatus : '-'}</p>
              </div>
            </div>
            )
        }
      </div> : <div>-</div>,
      temperature: rawData.health.length > 0 ? <div>
        {
          rawData.health.map((health, idx) =>
            <div>
              <div className="detail-info" style={{color: health.temperature >= 37 ? 'red' : ''}}>
                <p>
                  {(health.temperature != '') ? (health.temperature).toFixed(1) : '-'}℃
                </p>
              </div>
            </div>
            )
        }
      </div> : <div>-</div>,
      lastFoodTime: rawData.food.length > 0 ? <div className="detail-info">
        {rawData.food[rawData.food.length - 1].foodTime ? <p>{this.timeFormat(rawData.food[rawData.food.length - 1].foodTime)}</p> : <p>-時</p>}
      </div> : <div>-</div>,
      lastFood: rawData.food.length > 0 ? <div className="option-info">
        {rawData.food[rawData.food.length - 1].foodMenu ? <p>{rawData.food[rawData.food.length - 1].foodMenu}</p> : <p>-</p>}
      </div> : <div>-</div>,
      sleepTime: rawData.sleep.length > 0 ? <div className="detail-info">
        {rawData.sleep.map((sleep, idx) =>
          <div>
            {sleep ?
              <p>{
                (sleep.awakeTime - sleep.sleepTime) > 0 ?
                  ((sleep.awakeTime - sleep.sleepTime) / 3600000).toFixed(1)
                    : (( ( sleep.awakeTime - sleep.sleepTime) + 86400000) / 3600000).toFixed(1)
              }時間</p> : <p>-時間</p>
            }
          </div>
          )
        }
      </div> : <div>-</div>,
      pickUpPerson: rawData.pickUpPerson ? <div className="detail-info">
        <p>{rawData.pickUpPerson ? rawData.pickUpPerson : '-'}</p>
        <p>{this.timeFormat(rawData.pickUpTime)}</p>
      </div> : <div>-</div>
    }
  };

  nl2br = (text) => {
    return text.split(this.regex).map(line => {
      if (line.match(this.regex)) {
        return React.createElement('br');
      }
      else {
        return line;
      }
    });
  };

  render() {

    const {detail, diaryTimeline, myProfile} = this.props;

    const gridStyle = {
      teacherRoot: {
        display: 'flex',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap'
      },
      teacherGridList: {
        width: 450,
        height: 150,
        flexDirection: 'row-reverse',
        overflowY: 'auto'
      },
      guardianRoot: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      guardianGridList: {
        width: 450,
        height: 150,
        overflowY: 'auto'
      }
    };

    const pStyle = {fontSize: '0.6rem', color: '#ccc'};

    const teacherContents = this.createBlock(detail.teacher);
    const guardianContents = this.createBlock(detail.guardian);
    const timelineContents = this.createTimelineBlock(diaryTimeline);

    console.log(myProfile);
    return (
      <section className="content">
        <Row>
          <Col md="4">
            <Tabs
              onChange={this.handleChangeSidebar}
              value={this.state.slideIndex}
            >
              <Tab label="健康状態" value={0} />
              <Tab label="タイムライン" value={1} />
            </Tabs>
            <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleChangeSidebar}
            >
              <div>
                <Row center style={{paddingTop:'8px', paddingBottom:'8px'}}>
                  <Col>
                    <ImageDiv src={(()=>{
                      for(let i=0; i < detail.body.length; i++){
                        if(detail.body[i].userType == 'GUARDIAN'){
                          return '/image/' + detail.body[i].avatarUrl
                        }
                      }})()}
                      width={64}
                      border="solid 3px #fff"
                      style={{marginTop:'8px', float:'left'}}/>
                  </Col>
                </Row>

                <Row>
                  <Col md="5" className="h_center">
                    <div className="option-info">学校</div>
                  </Col>
                  <Col md="2" className="h_center">
                  </Col>
                  <Col md="5" className="h_center">
                    <div className="option-info">自宅</div>
                  </Col>
                </Row>

                <Row>
                  <Col md="5" className="h_center bottom-line">
                    {teacherContents.health}
                  </Col>
                  <Col md="2" className="h_center">
                    <Row center>
                      <Col>
                        <i className="material-icons md-36">accessibility</i>
                      </Col>
                    </Row>
                    <Row center>
                      <Col className="option-info" style={{paddingBottom:'8px'}}>
                        状態
                      </Col>
                    </Row>
                  </Col>
                  <Col md="5" className="h_center bottom-line">
                    {guardianContents.health}
                  </Col>
                </Row>
                <Row>
                  <Col md="5" className="h_center bottom-line">
                    {teacherContents.temperature}
                  </Col>
                  <Col md="2" className="h_center">
                    <Row center>
                      <Col>
                        <img src="/assets/images/app/temperature.png" width="36" height="36"/>
                      </Col>
                    </Row>
                    <Row center>
                      <Col className="option-info" style={{paddingBottom:'8px'}}>
                        体温
                      </Col>
                    </Row>
                  </Col>
                  <Col md="5" className="h_center bottom-line">
                    {guardianContents.temperature}
                  </Col>
                </Row>

                <Row>
                  <Col md="5" className="h_center bottom-line">
                    {teacherContents.sleepTime}
                  </Col>
                  <Col md="2">
                    <Row center>
                      <img src="/assets/images/app/sleep.png" width="36" height="36"/>
                    </Row>
                    <Row center className="option-info" style={{paddingBottom:'8px'}}>睡眠時間</Row>
                  </Col>
                  <Col md="5" className="h_center bottom-line">
                    {guardianContents.sleepTime}
                  </Col>
                </Row>

                <Row>
                  <Col md="5" className="h_center">
                    {teacherContents.lastFoodTime }
                    {teacherContents.lastFood}
                  </Col>
                  <Col md="2">
                    <Row center>
                      <i className="material-icons md-36">restaurant_menu</i>
                    </Row>
                    <Row center className="option-info" style={{paddingBottom:'8px'}}>最終食事</Row>
                  </Col>
                  <Col md="5" className=" h_center">
                    {guardianContents.lastFoodTime}
                    {teacherContents.lastFood}
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col md="12">
                <ul className="cbp_tmtimeline">
                  {timelineContents.timeline}
                </ul>
              </Col>
            </Row>
              </div>
            </SwipeableViews>

          </Col>
          <Col md="8">
            {
              detail.body.map((b, idx) => {
                const guardian = b.userType === 'GUARDIAN';
                return (<Row end={guardian}>{guardian ? 
                  <Col md="10" xs="11"
                    style={{marginTop:'1rem'}}>

                    <Row>
                      <Col className="option-info"><img src={'/image/' + b.avatarUrl}
                          width="38px"
                          height="38px"/>
                      </Col>
                      <Col className="option-info">
                        <Row><Col>保護者より</Col></Row>
                        <Row><Col>{this.timeFormat(b.time)}</Col></Row>
                      </Col>
                    </Row>
                    <Row><Col md="12">
                        <Row><Col>{this.nl2br(b.textContent)}</Col></Row>
                        {b.photos.length > 0 ? <Row end={guardian}>
                          {b.photos.map((p, idx2)=> {
                            return (<Col md="2">
                              <Paper onClick={this.handleOpenPhoto('/image/' + p.url)}>
                                <Row center><Col><img style={{height: '100%', width: '100%', objectFit: 'contain'}} src={'/image/' + p.url}/></Col></Row>
                                <Row center><Col className="option-info">{p.caption}</Col></Row>
                              </Paper>
                            </Col>);
                          })}
                        </Row>
                        : null
                        }
                    </Col></Row>
                  </Col>
                  : <Col md="10" xs="11"
                    style={{marginTop:'1rem'}}>

                    <Row>
                      <Col className="option-info"><img src={'/image/' + b.avatarUrl}
                          width="38px"
                          height="38px"/>
                      </Col>
                      <Col className="option-info">
                        <Row><Col>先生より</Col></Row>
                        <Row><Col>{this.timeFormat(b.time)}</Col></Row>
                      </Col>
                    </Row>
                    <Row><Col md="12">
                        <Row><Col>{this.nl2br(b.textContent)}</Col></Row>
                        {b.photos.length > 0 ? <Row end={guardian}>
                          {b.photos.map((p, idx2)=> {
                            return (<Col md="2">
                              <Paper onClick={this.handleOpenPhoto('/image/' + p.url)}>
                                <Row center><Col><img style={{height: '100%', width: '100%', objectFit: 'contain'}} src={'/image/' + p.url}/></Col></Row>
                                <Row center><Col className="option-info">{p.caption}</Col></Row>
                              </Paper>
                            </Col>);
                          })}
                        </Row>
                        : null
                        }
                    </Col></Row>
                  </Col>
                  }
                </Row> 
                )})
            }
            <Row end={true}>
              <Col>
                <FlatButton primary onClick={this.handleToForm}
                  style={{width: '48px', marginTop: '1em'}}>
                  <img src="/assets/images/app/reply_r.png" width="48px" height="48px"/>
                </FlatButton>
              </Col>
            </Row>
          </Col>
        </Row>
        <Dialog
          open={this.state.openPhoto}
          onRequestClose={this.handleClosePhoto}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}>
          <img src={this.state.openPhotoUrl}/>
        </Dialog>
      </section>
    );
  }
}

export default connect(state => state.diary)(DiaryDetail);
