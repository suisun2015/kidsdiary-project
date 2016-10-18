import * as acts from '../actions/SignUpActions';

const initialData = {
  schoolList: {list: []},
  roomList: {list: []}
};

export default function todoList(state = initialData, action = {}) {
  switch (action.type) {

    case acts.RECEIVE_SCHOOL_LIST:
      return {
        ...state,
        schoolList: action.data
      };

    case acts.RECEIVE_ROOM_LIST:
      return {
        ...state,
        roomList: action.data
      };

    default :
      return state;
  }
}
