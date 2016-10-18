import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';


import { reducer as formReducer } from 'redux-form';

import toaster from '../common/containers/toaster/ToasterReducer';
import authCache from '../common/auth/AuthReducer';
import CommonReducers from '../common/CommonReducers';
import SchoolReducers from '../school/SchoolReducers';
import HomeReducers from '../home/HomeReducer';

const reducer = combineReducers(
    Object.assign({},
        CommonReducers,
        SchoolReducers,
        HomeReducers,
        {
          toaster,
          routing: routerReducer,
          form: formReducer,
          authCache
        }
    )
);

export default reducer;
