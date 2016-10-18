import * as acts from './InitActions';

const initialData = {
  user: {}
};


export default function todoList(state = initialData, action = {}) {

  switch (action.type) {

    case acts.RECEIVE_DETAIL:
      return {
        ...state,
        user: action.data
      };

    default :
      return state;
  }
}
