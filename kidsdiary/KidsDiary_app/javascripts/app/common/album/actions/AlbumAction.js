
import xhr from '../../../common/utils/SecureXHR';

/*
 * action types
 */
export const RECEIVE_ALBUM_LIST = 'common.album.RECEIVE_ALBUM_LIST';
export const RECEIVE_ALBUM_DETAIL = 'common.album.RECEIVE_ALBUM_DETAIL';

/*
 * データを取得した
 */
function receiveAlbumList(data) {
  return {
    type: RECEIVE_ALBUM_LIST,
    data
  };
}

export function requestAlbumList(data) {
  const url = '/api/album/list';
  return (dispatch) => {
    return xhr.post(dispatch, url, data)
      .then(response => {
        console.log(response.data);
        dispatch(receiveAlbumList(response.data));
      })
    .catch(e => {
      // API未実装のとき
      const dummy = {
        list: [{name:'dum1'}, {name: 'dum2'}, {name: 'dum3 ...'}]
      };

        dispatch(receiveAlbumList(dummy));
        console.log('e=', e);
      });
  };
}


function receiveAlbumDetail(data) {
  return {
    type: RECEIVE_ALBUM_DETAIL,
    data
  };
}

export function requestAlbumDetail(postData) {
  const url = '/api/album/detail';

  return (dispatch) => {
    return xhr.post(dispatch, url, postData)
      .then((responce) => {
        dispatch(receiveAlbumDetail(responce.data));
      })
      .catch(e => {
        console.error('e=', e);
      });
  };
}
