import React, { Component } from 'react';
import { connect } from 'react-redux';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import './App.css';
import {mockSheet1} from './data/mockData';

class App extends Component {

  componentDidMount() {

      const msg = (cb) => fetch('/api/hello')
        .then(response => {console.log(response); return response})
        .then(this.checkStatus)
        .then(this.parseJSON)
        .then (cb);

      msg((response) => {console.log(response)});

      let sheets = [mockSheet1];

      this.props.dispatch({
        type: 'RECEIVE_SHEETS',
        sheets
      })
  };

  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }

  parseJSON = (response) => {
    response.json();
  }

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
