import axios from 'axios';
import _ from 'immutable';
import { push } from 'react-router-redux'

import cookie from './Cookie';

const handleSuccess = result => {
  return Promise.resolve(result);
};

const handleError = dispatch => err => {
  switch (err.status) {
    case 401:
      dispatch(push('/login'));
      break;
    case 403:
      dispatch(push('/403'));
      break;
    default:
  }
  return Promise.reject(err);
};

/**
 * example :
 * import xhr from '../../utils/SecureXHR';
 * ...
 *   xhr.get(dispatch, '/api/resource/list');
 *   xhr.post(dispatch, '/api/resource/post', postData);
 *
 */
export default {
  get: (dispatch, requestUrl, config) => {
    return axios.get(requestUrl, config)
        .then(handleSuccess, handleError(dispatch));
  },

  post: (dispatch, requestUrl, postData = {}, config) => {
    postData.userToken = cookie.get('userToken');
    return axios.post(requestUrl, postData, config)
        .then(handleSuccess, handleError(dispatch));
  }
};
