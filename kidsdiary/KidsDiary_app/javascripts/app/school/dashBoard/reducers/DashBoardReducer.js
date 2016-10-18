import * as acts from '../actions/DashBoardAction';

const initialData = {
  recentDiaries: {list: []},
  detail: {}
};

export default function todoList(state = initialData, action = {}) {
  switch (action.type) {

    case acts.RECEIVE_DETAIL:
      return {
        ...state,
        detail: action.data
      };

    case acts.RECEIVE_RECENT_DIARIES:
      return {
        ...state,
        recentDiaries: action.data
      };

    default :
      return state;
  }
}
