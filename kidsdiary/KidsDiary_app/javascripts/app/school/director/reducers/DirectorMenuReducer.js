import * as acts from '../actions/DirectoreMenuAction';

const initialData = {
  recentDiaries: {list: []},
  detail: {}
};

export default function directorMenu(state = initialData, action = {}) {
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
