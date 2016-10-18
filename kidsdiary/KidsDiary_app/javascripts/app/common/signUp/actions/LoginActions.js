import xhr from '../../utils/SecureXHR';
import cookie from '../../utils/Cookie';
import { push } from 'react-router-redux'


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
  const linkElement = document.getElementById('loginPageCssLink')
  headElement.removeChild(linkElement);
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
          }
        })
        .catch(e => {
          alert('ログインできません：' + e);
          console.log('e=', e);
        });
  };
}

export function requestSignUp(data, type, nextPath = '') {
  let url = '';
  if (type === 'TEACHER') {
    url = '/api/teacher_sign_up';
  } else if (type === 'DIRECTOR') {
    url = '/api/director_sign_up';
  } else if (type === 'GUARDIAN') {
    url = '/api/guardian_sign_up';
  }
  console.log('data =', data);
  return (dispatch) => {
    return xhr.post(dispatch, url, data)
        .then((response) => {
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
