import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Reducers';
import defaultState from './defaultState';
import App from './App';
import './index.css';

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(reducers, defaultState, applyMiddleware(thunkMiddleware));
} else {
  const loggerMiddleware = createLogger();
  store = createStore(reducers, defaultState, applyMiddleware(thunkMiddleware, loggerMiddleware));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
