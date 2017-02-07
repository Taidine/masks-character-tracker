import React, { Component } from 'react';
import './styles.css';

class CharacterSheet extends Component {

  render() {
    return (
      <div className={"container"}>
        <div className={"header"}>
          {this.props.playbook}
        </div>
        <div className={"inputGroup"}>
          <div className={"inputField"}><input type='text' value='Name' /></div>
          <div className={"inputField"}><input type='text' value='CallSign' /></div>
          <div className={"inputField"}><input type='text' value='Player' /></div>
        </div>
        <div className={"statGroup"}>
          <div className={"labelBox"}>{'Labels go here'}</div>
          <div className={"conditionsBox"}>{'Conditions go here'}</div>
        </div>
        <div className={"accordion"}>{'Moves'}</div>
        <div className={"accordion"}>{'Influence'}</div>
        <div className={"accordion"}>{'Notes'}</div>
        <div className={"potentialGroup"}>
          {'Potential'}
          <input type='checkbox' />
          <input type='checkbox' />
          <input type='checkbox' />
          <input type='checkbox' />
          <input type='checkbox' />
          <button />
        </div>
      </div>
    );
  }
}

export default CharacterSheet;
