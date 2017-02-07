import React, { Component } from 'react';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import './App.css';

class App extends Component {
  render() {
    console.log(CharacterSheet);
    return (
      <div className="App">
        <CharacterSheet playbook={'The Beacon'}/>
      </div>
    );
  }
}

export default App;
