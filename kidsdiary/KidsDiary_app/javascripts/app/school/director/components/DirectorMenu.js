import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Firebase from 'firebase';
import moment from 'moment';
import {List, ListItem, Subheader, IconButton} from 'material-ui';
import {DatePicker} from 'material-ui';
import {FlatButton} from 'material-ui';
import {Dialog} from 'material-ui';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import {Row, Col} from '../../../common/components/FlexGrid';
import {ImageDiv} from '../../../common/components/ImageDiv';
import {ImageDivSquare} from '../../../common/components/ImageDivSquare';

import {requestDetail, postPhotos, requestRecentDiaries} from '../actions/DirectoreMenuAction';

class DirectorMenu extends Component {
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

    const getStyle = (src, width) => {
      const w = width ? width : 150;
      return {
        width: `${w}px`,
        height: `${w}px`,
        background: `url(${src}) center center`,
        backgroundSize: 'contain'
      }
    };
    const customContentStyle = {
      width: '420px',
      maxWidth: 'none',
      borderBottom: 'none'
    };


    return (
        <section className="content">
          <Row>
            <div className="col-20per h_center"></div>
            <div className="col-20per h_center">
              <FlatButton onClick={this.handleOpen} style={{width:'150px', height:'150px'}}>
                <div style={getStyle("/assets/images/director/01.jpg")}></div>
              </FlatButton><br />
              職員配置実績報告書 <br />ダウンロード
            </div>
            <div className="col-20per h_center" style={{opacity: 0.3}}>
              <ImageDivSquare src="/assets/images/director/02.jpg"/>
              職員管理
            </div>
            <div className="col-20per h_center" style={{opacity: 0.3}}>
              <ImageDivSquare src="/assets/images/director/03.jpg"/>
              招待
            </div>
            <div className="col-20per h_center"></div>
          </Row>

          <Dialog
              title="日付を選択してください"
              open={this.state.openDialog}
              onRequestClose={this.handleClose}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}
              contentStyle={customContentStyle}>

            <form method="post" action="/api/attendance/download" onSubmit={this.handleClose}>

              <DatePicker name="attendanceDateStr"
                          hintText="対象日を選択"
                          container="inline"
                          defaultDate={new Date()}
                          autoOk={true}
                          style={{width: '100%'}}/>
              <FlatButton style={{width: '100%'}}
                          type="submit">
                ダウンロード
              </FlatButton>
            </form>
          </Dialog>
        </section>
    );
  }
}

export default connect(state => state.dashBoard)(DirectorMenu);

const NotifyItem = (props) => {
  return <ListItem key={i} primaryText={m.message}
                   secondaryText={moment(parseInt(m.time_stamp)).format('M月D日 HH:mm:ss').toString()}
                   leftAvatar="/assets/images/temp0.jpg"/>;


};
