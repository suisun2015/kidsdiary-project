
export const SET_USER_TOKEN = 'common.auth.SET_USER_TOKEN';

export function setUserToken(userToken) {
  return {
    type: SET_USER_TOKEN,
    data: userToken
  };
}