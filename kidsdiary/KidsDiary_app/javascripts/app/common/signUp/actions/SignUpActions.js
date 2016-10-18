import xhr from '../../utils/SecureXHR';
import cookie from '../../utils/Cookie';
import { push } from 'react-router-redux'

export const RECEIVE_SCHOOL_LIST = 'common.signUp.RECEIVE_SCHOOL_LIST';
export const RECEIVE_ROOM_LIST = 'common.signUp.RECEIVE_ROOM_LIST';

function receiveSchoolList(data) {
  return {
    type: RECEIVE_SCHOOL_LIST,
    data
  };
}

export function requestSchoolList() {
  const url = '/api/school/list';

  return (dispatch) => {
    return xhr.get(dispatch, url)
      .then((responce) => {
        dispatch(receiveSchoolList(responce.data));
      })
      .catch(e => {
        dispatch(receiveSchoolList({
          someList: 'dum info xxx'
        }));
        console.log('e=', e);
      });
  };
}

function receiveRoomList(data) {
  return {
    type: RECEIVE_ROOM_LIST,
    data
  };
}

export function requestRoomList(data) {
  const url = '/api/school/room/search';

  return (dispatch) => {
    return xhr.post(dispatch, url, data)
      .then((responce) => {
        dispatch(receiveRoomList(responce.data));
      })
      .catch(e => {
        dispatch(receiveSchoolList({
          someList: 'dum info xxx'
        }));
        console.log('e=', e);
      });
  };
}

export function requestSignUp(data, type, nextPath = '', picture) {
  let url = '';
  if (type === 'TEACHER') {
    url = '/api/teacher_sign_up';
  } else if (type === 'DIRECTOR') {
    url = '/api/director_sign_up';
  } else if (type === 'GUARDIAN') {
    url = '/api/guardian_sign_up';
  }

  const signUpPost = (dispatch) => {
    xhr.post(dispatch, url, data)
      .then((response = null) => {
        cookie.set({
          name: 'userToken',
          value: response.data.userToken
        });
        cookie.set({
          name: 'userId',
          value: response.data.userId
        });
        dispatch(push(nextPath));
      })
      .catch(e => {
        console.log('e=', e);
      });
  }

  if(!picture[0]){
    return signUpPost
  } else {
    const uploadUrl = '/api/image/anonymous_upload';
    const photos = new FormData();
    photos.append('imageFile0Caption', 'avatar');
    photos.append("imageFile0", picture[0]);
    return (dispatch) => {
      return xhr.post(dispatch, uploadUrl, photos)
        .then((responce) => {
          data.avatarUrl = responce.data[0];
          console.log('data',data);

          return signUpPost(dispatch)
        })
    }
  }
}

