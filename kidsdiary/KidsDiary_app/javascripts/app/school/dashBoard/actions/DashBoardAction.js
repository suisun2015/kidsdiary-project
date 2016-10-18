import axios from 'axios';
import xhr from '../../../common/utils/SecureXHR';
import cookie from '../../../common/utils/Cookie';

/*
 * action types
 */
export const RECEIVE_RECENT_DIARIES = 'school.dashBoard.RECEIVE_RECENT_DIARIES';
export const RECEIVE_DETAIL = 'school.dashBoard.RECEIVE_DETAIL';


export function postPhotos(files) {
  const data = new FormData();
  data.append('userToken', cookie.get('userToken'));
  for (var i = 0; i < files.length; i++) {
    data.append("imageFile" + i, files[i]);
  }

  return (dispatch) => {
    return axios.post('/api/image/upload', data)
        .then(function (res) {
          console.log('res.data =', res.data);
        })
        .catch(function (res) {
          console.error('res.data =', res.data);
        });
  }
}

/*
 * データを取得した
 */
function receiveRecentDiaries(data) {
  return {
    type: RECEIVE_RECENT_DIARIES,
    data
  };
}

export function requestRecentDiaries(data) {
  const url = '/api/diary/recent_diaries';
  return (dispatch) => {
    return xhr.post(dispatch, url, {roomId: 1})
        .then(response => {
          dispatch(receiveRecentDiaries(response.data));
        })
        .catch(e => {
          console.log('e=', e);
        });
  };
}


function receiveDetail(data) {
  return {
    type: RECEIVE_DETAIL,
    data
  };
}

export function requestDetail(postData) {
  const url = '/api/sample/some_data/detail';

  return (dispatch) => {
    return xhr.post(dispatch, url, postData)
        .then((responce) => {
          dispatch(receiveDetail(responce.data));
        })
        .catch(e => {
          dispatch(receiveDetail({
            someDetail: 'dum info xxx'
          }));
          console.log('e=', e);
        });
  };
}
