import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {Paper} from 'material-ui';

import ContentHeader from '../../../common/components/ContentHeader';

import {ImageDiv} from '../../../common/components/ImageDiv';
import {Row, Col} from '../../components/FlexGrid';

import {requestAlbumList} from '../actions/AlbumAction';

class Album extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    let requestData = {
      pageIndex: 0,
      pageSize: 20
    }
    dispatch(requestAlbumList(requestData));
  }

  render() {
    const {albumList} = this.props;

    return (
      <Row> 
        {
          albumList.list.map((data, i) => {
            return (
              <Col md="4" lg="3">
                <div style={{height: '10em', width: '100%', objectFit: 'contain'}}>
                  <Link to={"/s/album/" + data.albumId}>
                    <img style={{height: '8.5em', width: '100%', objectFit: 'contain'}} src={'/image/' + data.url} />
                  </Link>
                  <Row center><Col>{data.albumTitle}</Col></Row>
                </div>
              </Col>
              );
          })
        }
      </Row>
    );
  }
}
export default connect(state => state.album)(Album);
