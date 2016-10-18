import { combineReducers } from 'redux';

import schoolInit from './container/init/InitReducer';
import dashBoard from './dashBoard/reducers/DashBoardReducer';
import petList from './petList/reducers/PetListReducer';

const SchoolReducers = {
  petList,
  schoolInit,
  dashBoard
};

export default SchoolReducers;
