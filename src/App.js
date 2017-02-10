import React, { Component } from 'react';
import { connect } from 'react-redux';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import {mockSheet1 as mockData} from './data/mockData';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'RECEIVE_SHEETS',
      sheets: [mockData],
    })
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
