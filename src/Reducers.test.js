import React from 'react';
import ReactDOM from 'react-dom';
import Redux, { createStore, combineReducers } from 'redux';
import reducers from './Reducers';
import sheetTemplate from './data/initializeSheet';
import { mockSheet1 } from './data/mockData';

const emptyState = {
  cId: 0,
  sheets: [sheetTemplate]
};

it('create store generates empty state', () => {
  const store = createStore(reducers);
  expect(store.getState()).toEqual(emptyState);
});

it('unknown action returns default state', () => {
  const store = createStore(reducers);
  expect(reducers(store.getState(), "UNKNOWN_ACTION")).toEqual([sheetTemplate]);
})
