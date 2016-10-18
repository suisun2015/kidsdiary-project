import * as acts from '../actions/DashBoardActions';

const initialState = {
  info: {
    child: {}
  }
};

export default function homeDashBoard(state = initialState, action = {}) {
  switch (action.type) {

    case acts.RECEIVE_INFO:
      console.log('action =', action);
      return {
        ...state,
        info: action.data
      };

    default :
      return state;
  }
}
