import * as acts from '../actions/PetListAction';

const initialData = {
  someData: {list: []},
  detail: {}
};

export default function todoList(state = initialData, action = {}) {
  switch (action.type) {

    case acts.RECEIVE_SOME_DATA:
      return {
        ...state,
        someData: action.data
      };

    case acts.RECEIVE_DETAIL:
      return {
        ...state,
        detail: action.data
      };

    default :
      return state;
  }
}
