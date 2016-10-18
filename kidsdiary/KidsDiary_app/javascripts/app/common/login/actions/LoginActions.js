import xhr from '../../utils/SecureXHR';
import cookie from '../../utils/Cookie';
import { push } from 'react-router-redux'


export const LOGIN_ERR = 'common.login.LOGIN_ERR';

export function addLoginPageCss() {
  const loginPageCssLink = document.getElementById('loginPageCssLink')
  if (!loginPageCssLink) {
    const headElement = document.getElementsByTagName('head')[0];
    const linkElement = document.createElement('link');

    linkElement.setAttribute('href', '/assets/stylesheets/LoginPage.css');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('id', 'loginPageCssLink');
    headElement.appendChild(linkElement);
  }
}

export function removeLoginPageCss() {
  const headElement = document.getElementsByTagName('head')[0];
  const linkElement = document.getElementById('loginPageCssLink');
  headElement.removeChild(linkElement);
}
function loginErr(e){
  return {
    type: LOGIN_ERR
  }
}
export function requestLogin(data, nextPath = '') {
  const url = '/api/login';
  return (dispatch) => {
    return xhr.post(dispatch, url, data)
        .then(response => {
          cookie.set({
            name: 'userToken',
            value: response.data.userToken
          });
          switch (response.data.userType) {
            case 'TEACHER':
              dispatch(push('/s/dash_board'));
              break;
            case 'GUARDIAN':
              dispatch(push('/h/dash_board'));
              break;
            case 'DIRECTOR':
              dispatch(push('/d/menu'));
              break;
          }
        })
        .catch(e => {
          dispatch(loginErr(e));
          console.log('e=', e);
        });
  };
}

export function requestMyProfile() {
  const url = '/api/my_profile';
  return (dispatch) => {
    return xhr.post(dispatch, url, {})
        .then(response => {
          switch (response.data.userType) {
            case 'TEACHER':
              dispatch(push('/s/dash_board'));
              break;
            case 'GUARDIAN':
              dispatch(push('/h/dash_board'));
              break;
            case 'DIRECTOR':
              dispatch(push('/d/menu'));
              break;
          }
        })
        .catch(e => {
          cookie.unset('userToken');
          cookie.unset('userId');
          dispatch(push('/login'));
        });
  };
}

export function requestLogout(data) {
  const url = '/api/logout';
  return (dispatch) => {
    cookie.unset('userToken');
    cookie.unset('userId');
    dispatch(push('/login'));
  };
}
