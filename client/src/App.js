import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import initializeSheet from './data/initializeSheet';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getSheets();
  }

  onAddSheet = () => {
    let cIds = [].concat(this.props.ids);
    cIds.sort((a,b) => a > b);
    let lastId = cIds.pop();
    let cId = lastId + 1;
    let newSheet = Object.assign({}, initializeSheet, {cId});
    this.props.addSheet(newSheet);
  }

  render() {
    return (
      <div className="App">
        {this.props.ids.map(id => <CharacterSheet key={id} cId={id}/>)}
        <button onClick={this.onAddSheet}>Add Sheet</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ids: state.cId.ids,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
