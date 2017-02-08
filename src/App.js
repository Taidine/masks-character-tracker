import React, { Component } from 'react';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import {mockSheet1 as mockData} from './data/mockData';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CharacterSheet playbook={'The Beacon'} {...mockData}/>
      </div>
    );
  }
}

export default App;
