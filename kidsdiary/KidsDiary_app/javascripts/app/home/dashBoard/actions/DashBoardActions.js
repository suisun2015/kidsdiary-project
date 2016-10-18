
import xhr from '../../../common/utils/SecureXHR';

/*
 * action types
 */
export const RECEIVE_INFO = 'home.dashBoard.RECEIVE_INFO';

/*
 * データを取得した
 */
function receiveInfo(data) {
  return {
    type: RECEIVE_INFO,
    data
  };
}

export function requestInfo() {
  const url = '/api/home/childInfo';
  return (dispatch) => {
    return xhr.post(dispatch, url, {})
      .then(response => {
        dispatch(receiveInfo(response.data));
      })
      .catch(e => {
        console.log('e=', e);
      });
  };
}

export function requestUpdate(tagId, tagData) {
  const url = '/api/crawler/siteTags/' + tagId;
  return (dispatch) => {
    return xhr.post(dispatch, url, tagData)
      .then(() => {
        dispatch(requestList());
      })
      .catch(e => {
        console.log('e=', e);
      });
  };
}

export function requestDelete(tagId) {
  const url = '/api/crawler/siteTags/' + tagId;
  return (dispatch) => {
    return xhr.delete(dispatch, url)
      .then(() => {
        dispatch(requestList());
      })
      .catch(e => {
        console.log('e=', e);
      });
  };
}

export function requestSave(tagData) {
  const url = '/api/crawler/siteTags';
  return (dispatch) => {
    return xhr.post(dispatch, url, tagData)
      .then(() => {
        dispatch(requestList());
      })
      .catch(e => {
        console.log('e=', e);
      });
  };
}
