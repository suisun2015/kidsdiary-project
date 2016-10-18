import * as acts from '../actions/AlbumAction';

const initialData = {
  albumList: {list: []},
  albumDetail: {list: []},
  detail: {}
};

export default function todoList(state = initialData, action = {}) {
  switch (action.type) {

    case acts.RECEIVE_ALBUM_LIST:
      return {
        ...state,
        albumList: action.data
      };

    case acts.RECEIVE_ALBUM_DETAIL:
      return {
        ...state,
        albumDetail: action.data
      };

    default :
      return state;
  }
}
