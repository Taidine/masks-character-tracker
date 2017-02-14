import { combineReducers } from 'redux';

// Reducers

const sheets = (state={}, action) => {
  switch (action.type) {

    case ('FETCHING_SHEETS'): {
      return {...state, isFetching: true};
    }

    case ('RECEIVE_SHEETS'): {
      let sheets = action.sheets;
      return {sheets, isFetching: false};
    }

    case ('RECEIVE_SHEETS_FAILED'): {
      console.log("Error receiving sheets");
      return {...state, isFetching: false};
    }

    default: return state;
  }
}

const cId = (state={}, action) => {
  switch (action.type) {
    case ('RECEIVE_SHEETS'): {
      let newIds = action.sheets.map(sheet => sheet.cId);
      return ({ids: newIds});
    }

    default: return state;
  }
}

const reducers = combineReducers ({
  sheets,
  cId,
})

export default reducers;
