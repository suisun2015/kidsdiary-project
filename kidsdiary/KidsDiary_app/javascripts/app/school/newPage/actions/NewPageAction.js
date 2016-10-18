
import xhr from '../../../common/utils/SecureXHR';

/*
 * action types
 */
export const RECEIVE_SOME_DATA = 'school.newPage.RECEIVE_SOME_DATA';
export const RECEIVE_DETAIL = 'school.newPage.RECEIVE_DETAIL';

/*
 * データを取得した
 */
function receiveSomeData(data) {
  return {
    type: RECEIVE_SOME_DATA,
    data
  };
}

export function requestSomeData(data) {
  const url = '/api/sample/some_data/search';
  return (dispatch) => {
    return xhr.post(dispatch, url, data)
      .then(response => {
        dispatch(receiveSomeData(response.data));
      })
      .catch(e => {
        // API未実装のとき
        const dummy = {
          list: [{name:'dum1'}, {name: 'dum2'}, {name: 'dum3 ...'}]
        };

        dispatch(receiveSomeData(dummy));
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
