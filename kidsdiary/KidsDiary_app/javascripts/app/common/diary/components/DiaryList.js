import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import moment from 'moment';

import {List, ListItem, FloatingActionButton} from 'material-ui';

import ContentHeader from '../../../common/components/ContentHeader';
import { Row, Col } from '../../../common/components/FlexGrid';

import {requestDiaryList, requestDetail} from '../actions/DiaryAction';

class DiaryList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  state = {
    open: false,
    files: []
  };

  componentDidMount() {
    const { dispatch, params:{childId} } = this.props;
    if (childId) {
      const postData = {
        childId
      };
      dispatch(requestDiaryList(postData));
    }
  }

  handleToForm = () => {
    const {params: {childId, diaryDate}} = this.props;
    this.props.dispatch(push(`/s/diary/${childId}/new/form`))
  };

  handleDiaryOpen = (dateLong) => {
    const { dispatch, params:{childId} } = this.props;
    dispatch(push(`/s/diary/${childId}/${dateLong}`));
  };

  timeSince = (date) => {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  render() {
    const { diaryList } = this.props;

    const infoDivStyle = {
      height: '140px',
      width: '100%',
      textAlign: 'center',
      display: 'inline-block'
    };
    const rowStyle = {
      borderBottom: 'solid 1px #ccc'
    };
    const colStyle = {
      borderLeft: 'solid 1px #ccc'
    };
    const fabStyle = {
      margin: 20,
      boxShadow: ''
    };

    return (
      <section>
        <List>
          {diaryList.list.map((item, idx) => {
            const itemDateObject = new Date(parseInt(item.diaryDate));
            const momentObject = moment(itemDateObject);
            return <div>
              <ListItem
                onTouchTap={()=>this.handleDiaryOpen(item.diaryDate)}
                primaryText={
                  <Row>
                    <Col md="2">
                      <Row>
                        <Col className="detail-info">
                          {momentObject.format("MMM DD [(]ddd[)]") }
                        </Col>
                        <Col className="option-info">
                          {this.timeSince(itemDateObject) + " ago"}
                        </Col>
                      </Row>
                    </Col>
                    <Col md="9">
                      <Row>
                        <Col md="12">
                          {item.textContent}
                        </Col>
                      </Row>
                      <Row>
                        <Col md="1" className="option-info">
                          {item.readStatus ? '既読':'未読'}
                        </Col>
                        <Col md="1" className="option-info">
                        </Col>
                      </Row>
                    </Col>
                    <Col md="1">
                      <img style={{height: '5em', width: '100%', objectFit: 'contain'}} src={"/image/" + item.photos[0]} />
                    </Col>
                  </Row>
                }
              />
            </div>
          })}
        </List>
        <Row center>
          <Col>
            <FloatingActionButton onClick={this.handleToForm} style={{bottom: '50px', position: 'fixed', zIndex: '2'}}>
              <div>新規</div>
            </FloatingActionButton>
          </Col>
        </Row>
      </section>
    );
  }
}

export default connect(state => state.diary)(DiaryList);
