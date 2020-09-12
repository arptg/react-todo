import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { Router as BrowserRouter } from 'react-router-dom';

import 'index.css';

import reducers from './redux/reducers';
import sagas from './redux/sagas';
import Router from './router';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const history = createBrowserHistory();

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(sagas);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <Provider store={store}>
        <Router history={history} />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
