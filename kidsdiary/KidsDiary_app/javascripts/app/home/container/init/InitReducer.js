import * as acts from './InitActions';

const initialData = {
  user: {}
};


export default function home(state = initialData, action = {}) {

  switch (action.type) {

    case acts.RECEIVE_DETAIL:
      console.log('action         =', action);
      return {
        ...state,
        user: action.data
      };

    default :
      return state;
  }
}
