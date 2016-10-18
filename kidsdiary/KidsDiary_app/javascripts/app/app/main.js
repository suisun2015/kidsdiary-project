import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { Router, browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createHistory } from 'history';
import routes from './Routes';
import reducer from './Reducers';
import DevTools from '../common/containers/DevTools';
import Toastr from '../common/containers/toaster/ToasterComponent';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const loggerMiddleware = createLogger();

const store = compose(
    applyMiddleware(
        thunkMiddleware,
        /* @echo COMMENT_LINE */// loggerMiddleware,
        routerMiddleware(browserHistory)
    )
/* @echo COMMENT_LINE */ , DevTools.instrument()
)(createStore)(reducer);

const history = syncHistoryWithStore(browserHistory, store);

// Required for replaying actions from devtools to work
//reduxRouterMiddleware.listenForReplays(store);

//
render(
  <div>
    <Provider store={ store }>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
    <DevTools store={store} />
    <Provider store={store}>
      <Toastr />
    </Provider>
  </div>,
  document.getElementById('root')
);
