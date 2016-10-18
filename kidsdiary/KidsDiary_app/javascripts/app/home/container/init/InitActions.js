import xhr from '../../../common/utils/SecureXHR';
import cookie from '../../../common/utils/Cookie';

/*
 * action types
 */
export const RECEIVE_DETAIL = 'home.initAction.RECEIVE_DETAIL';

/*
 * データを取得した
 */
function receiveDetail(data) {
  return {
    type: RECEIVE_DETAIL,
    data
  };
}

//ちょっと自分を取りたいだけ
export function requestDetail() {
  const url = '/api/my_profile';
  return (dispatch) => {
    return xhr.post(dispatch, url, {})
        .then(response => {
          dispatch(receiveDetail(response.data));
        })
    //.catch(e => {
    //  console.log('e=', e);
    //});
  };
}