import axios from 'axios';
import xhr from '../../../common/utils/SecureXHR';
import cookie from '../../../common/utils/Cookie';
import {push} from 'react-router-redux';

/*
 * action types
 */
export const INITIALIZE = 'common.diary.INITIALIZE';
export const RECEIVE_DIARY_LIST = 'common.diary.RECEIVE_DIARY_LIST';
export const RECEIVE_MY_DETAIL = 'common.diary.RECEIVE_MY_DETAIL';
export const RECEIVE_DETAIL = 'common.diary.RECEIVE_DETAIL';
export const RECEIVE_TIMELINE = 'common.diary.RECEIVE_TIMELINE';
export const RECEIVE_PROFILE= 'common.diary.RECEIVE_PROFILE';
export const RECEIVE_MY_PROFILE= 'common.diary.RECEIVE_MY_PROFILE';
export const DIARY_OPEN_CLOSE = 'common.diary.DIARY_OPEN_CLOSE';

export function initProps() {
  return {
    type: INITIALIZE
  }
}

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
function receiveDiaryList(data) {
  return {
    type: RECEIVE_DIARY_LIST,
    data
  };
}

export function requestDiaryList(data) {
  const url = '/api/diary/list';
  return (dispatch) => {
    return xhr.post(dispatch, url, data)
        .then(response => {
          dispatch(receiveDiaryList(response.data));
        })
        .catch(e => {
          console.log('e=', e);
        });
  };
}

function receiveMyProfile(data) {
  return {
    type: RECEIVE_MY_PROFILE,
    data
  };
}

export function requestMyProfile() {
  const url = '/api/my_profile';
  return (dispatch) => {
    return xhr.post(dispatch, url, {})
        .then(response => {
          dispatch(receiveMyProfile(response.data));
        })
        .catch(e => {
          console.log('e=', e);
        });
  };
}

function receiveProfile(data) {
  return {
    type: RECEIVE_PROFILE,
    data
  };
}

export function requestProfile(data) {
  const url = '/api/profile';
  return (dispatch) => {
    return xhr.post(dispatch, url, data)
        .then(response => {
          dispatch(receiveProfile(response.data));
        })
        .catch(e => {
          console.log('e=', e);
        });
  };
}

export function requestUpload(data) {
  const url = '/api/sample/some_data/search';
  return (dispatch) => {
    return xhr.post(dispatch, url, data)
        .then(response => {
          dispatch(receiveSomeData(response.data));
        })
        .catch(e => {
          // API未実装のとき
          const dummy = {
            list: [{name: 'dum1'}, {name: 'dum2'}, {name: 'dum3 ...'}]
          };

          dispatch(receiveSomeData(dummy));
          console.log('e=', e);
        });
  };
}

function receiveMyDetail(data) {
  return {
    type: RECEIVE_MY_DETAIL,
    data
  };
}

function receiveDetail(data) {
  return {
    type: RECEIVE_DETAIL,
    data
  };
}

function openSnackbar(data) {
  return {
    type: DIARY_OPEN_CLOSE,
    data: {message: data, open: true}
  };
}

export function closeSnackbar() {
  return {
    type: DIARY_OPEN_CLOSE,
    data: {open: false}
  };
}

export function requestMyDetail(postData) {
  const url = '/api/diary/my_detail';

  return (dispatch) => {
    return xhr.post(dispatch, url, postData)
        .then((responce) => {
          dispatch(receiveMyDetail(responce.data));
        })
        .catch(e => {
          console.log('e=', e);
        });
  };
}

export function requestDetail(postData) {
  const url = '/api/diary/detail';

  return (dispatch) => {
    return xhr.post(dispatch, url, postData)
        .then((responce) => {
          dispatch(receiveDetail(responce.data));
        })
        .catch(e => {
          console.log('e=', e);
        });
  };
}

function receiveTimeline(data) {
  return {
    type: RECEIVE_TIMELINE,
    data
  };
}

export function requestTimeline(postData) {
  const url = '/api/diary/timeline';

  return (dispatch) => {
    return xhr.post(dispatch, url, postData)
        .then((responce) => {
          dispatch(receiveTimeline(responce.data));
        })
        .catch(e => {
          console.log('e=', e);
        });
  };
}

export function requestDiaryPost(postData, childId, diaryDate, files, captions) {
  const url = '/api/diary/post';

  const uploadUrl = '/api/image/upload';
  const photos = new FormData();
  photos.append('userToken', cookie.get('userToken'));
  for (var i = 0; i < files.length; i++) {
    photos.append("f" + i, files[i]);
    photos.append("f" + i + "Caption", captions[i])
  }

  return (dispatch) => {


    return xhr.post(dispatch, uploadUrl, photos)
        .then((responce) => {
          postData.photos = responce.data;
          console.log('postData =', postData);
          xhr.post(dispatch, url, postData)
              .then((responce) => {
                const postData = {
                  childId,
                  diaryDate
                };
                dispatch(openSnackbar('書き込みました'));
                dispatch(push(`/s/diary/${childId}/${diaryDate}`));
                dispatch(requestMyDetail(postData));
              })
              .catch(e => {
                console.log('e=', e);
              });
        })
        .catch(e => {
          console.log('e=', e);
        });


  };
}
