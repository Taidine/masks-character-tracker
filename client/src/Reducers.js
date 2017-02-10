import { combineReducers } from 'redux';
import { sheetTemplate } from './data/initializeSheet';

// Reducers

const sheets = (state=[sheetTemplate], action) => {
  switch (action.type) {

    case ('RECEIVE_SHEETS'): {
      return action.sheets;
    }

    case ('ADD_SHEET'): {
      const initialValues = action.sheet || {};
      const cId = {cId: action.cId};
      const newSheet = Object.assign({}, sheetTemplate, cId, initialValues);
      return [...state, newSheet];
    }

    // Single sheet actions

    case ('UPDATE_SHEET'): {
        const sheetId = action.sheet.cId;
        const currentSheets = [...state];
        const sheetIndex = currentSheets.findIndex(s => s.cId === sheetId);
        const sheetsBefore = currentSheets.slice(0, sheetIndex);
        const sheetsAfter = currentSheets.slice(sheetIndex+1);
        return sheetsBefore.concat(action.sheet, sheetsAfter);
    }

    default: return state;
  }
}

const cId = (state={ids:[], nextId: 0}, action) => {
  switch (action.type) {
    case ('RECEIVE_SHEETS'): {
      let ids = action.sheets.map(sheet => sheet.cId);
      ids.sort();
      const nextId = ids[ids.length] + 1;
      return ({ids, nextId});
    }

    case ('ADD_SHEET'): {
      const nextId = action.cId + 1;
      const ids = [...state.ids, action.cId];
      return {ids, nextId};
    }

    default: return state;
  }
}

const reducers = combineReducers ({
  sheets,
  cId,
})

export default reducers;
