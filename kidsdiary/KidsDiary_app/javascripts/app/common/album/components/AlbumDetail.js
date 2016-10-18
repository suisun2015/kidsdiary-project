import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Dialog, Paper} from 'material-ui';

import {ImageDiv} from '../../components/ImageDiv';
import {Row, Col} from '../../components/FlexGrid';

import {requestAlbumDetail} from '../actions/AlbumAction';

class AlbumDetail extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  state = {
    openPhoto: false,
    openPhotoUrl: {}
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
    const {dispatch, params:{albumId}} = this.props;
    if (!albumId) {
      return;
    }

    const requestData = {
      albumId
    };
    dispatch(requestAlbumDetail(requestData));
  }

  render() {
    const {albumDetail} = this.props;

    return (
      <div>
        <Row>
          {
            albumDetail.list.map((data, i) => {
              return (
                <Col md="4" lg="3">
                <div style={{height: '10em', width: '100%', objectFit: 'contain'}}>
                    <img onClick={this.handleOpenPhoto('/image/' + data.url)} style={{height: '8.5em', width: '100%', objectFit: 'contain'}} src={'/image/' + data.url} />
                    <Row center><Col>{data.caption}</Col></Row>
                </div>
                </Col>
                );
            })
          }
        </Row>

        <Dialog
          open={this.state.openPhoto}
          onRequestClose={this.handleClosePhoto}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}>
          <img src={this.state.openPhotoUrl}/>
        </Dialog>
      </div>
    );
  }
}

export default connect(state => state.album)(AlbumDetail);
