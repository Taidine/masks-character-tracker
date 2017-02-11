import { combineReducers } from 'redux';
import { sheetTemplate } from './data/initializeSheet';

// Reducers

const sheets = (state=[sheetTemplate], action) => {
  switch (action.type) {

    case ('RECEIVE_SHEETS'): {
      let newSheets = action.sheets;
      let currentSheets = state.slice();
      let sheets = [];
      currentSheets.forEach ( (currentSheet) => {
          let newSheetIndex = newSheets.findIndex((ns) => ns.cId === currentSheet.cId);
          if (newSheetIndex >= 0){
            let newSheet = newSheets.splice(newSheetIndex, 1);
            sheets.push(Object.assign({}, currentSheet, newSheet));
          }
        });
      sheets = sheets.concat(newSheets);
      return sheets;
    }

    default: return state;
  }
}

const cId = (state={ids:[]}, action) => {
  switch (action.type) {
    case ('RECEIVE_SHEETS'): {
      let newIds = action.sheets.map(sheet => sheet.cId);
      let currentIds = state.ids;
      newIds = newIds.filter(nId => !currentIds.includes(nId));
      let ids = currentIds.concat(newIds);
      return ({ids});
    }

    default: return state;
  }
}

const reducers = combineReducers ({
  sheets,
  cId,
})

export default reducers;
