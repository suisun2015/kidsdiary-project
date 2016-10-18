
import * as acts from './AuthAction';

const authCache = (state = { }, action) => {
  switch (action.type) {
    case acts.SET_USER_TOKEN:
      return {
        token: action.data
      };

    default:
      return state;
  }
};

export default authCache;
