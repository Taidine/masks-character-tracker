import fetch from 'isomorphic-fetch';

export const fetchingSheets = () => {
  return {type: 'FETCHING_SHEETS'};
}

export const receiveSheets = (json) => {
  return {
    type: 'RECEIVE_SHEETS',
    sheets: json,
  }
}

export const receiveSheetsFailed = (json) => {
  return {
    type: 'RECEIVE_SHEETS_FAILED',
  }
}

export const getSheets = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var myInit = { method: 'GET',
             headers: myHeaders,
             mode: 'cors',
             cache: 'no-cache',
           };
    return dispatch => {
      // dispatch(fetchingSheets);
      fetch('/api/characterSheets', myInit)
        .then(response => {
            return response.json().then((data) => {
              dispatch(receiveSheets(data));
            });
    })
  }
}

export const updateSheet = (sheet) => {
  delete sheet._id;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json; charset=utf-8");
  var myInit = { method: 'Put',
             headers: myHeaders,
             mode: 'cors',
             cache: 'default',
             body: JSON.stringify(sheet),
           };
    return dispatch => {
      dispatch(fetchingSheets);
      fetch('/api/characterSheets', myInit)
        .then(response => {
          dispatch(getSheets());
    })
  }
}

export const addSheet = (sheet) => {
  delete sheet._id;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json; charset=utf-8");
  var myInit = { method: 'Post',
             headers: myHeaders,
             mode: 'cors',
             cache: 'default',
             body: JSON.stringify(sheet),
           };
    return dispatch => {
      fetch('/api/characterSheets', myInit)
        .then(response => {
          dispatch(getSheets());
    })
  }
}

export const deleteSheet = (cId) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var myInit = { method: 'Delete',
             headers: myHeaders,
             mode: 'cors',
             cache: 'default',
             body: JSON.stringify({cId}),
           };
    return dispatch => {
      fetch('/api/characterSheets', myInit)
        .then(response => {
          dispatch(getSheets());
    })
  }
}
