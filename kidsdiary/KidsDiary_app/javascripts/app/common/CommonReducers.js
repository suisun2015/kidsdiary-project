import { combineReducers } from 'redux';

import album from './album/reducers/AlbumReducer';
import signUp from './signUp/reducers/SignUpReducer';
import diary from './diary/reducers/DiaryReducer';

const CommonReducers = {
  album,
  signUp,
  diary
};

export default CommonReducers;
