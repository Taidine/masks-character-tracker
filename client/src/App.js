import React, { Component } from 'react';
import { connect } from 'react-redux';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import './App.css';

class App extends Component {

  componentDidMount() {

    const receiveSheets = (json) => {
    return this.props.dispatch({
      type: 'RECEIVE_SHEETS',
      sheets: json,
    });
  }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=utf-8");
    var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

      fetch('/api/characterSheets', myInit)
        .then(response => {
          var contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function(json) {receiveSheets(json)})
        }
      })
  };

  render() {
    return (
      <div className="App">
        {this.props.ids.map(cId => <CharacterSheet key={cId} cId={cId}/>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ids: state.cId.ids,
  }
}

App = connect(mapStateToProps, null)(App);

export default App;
