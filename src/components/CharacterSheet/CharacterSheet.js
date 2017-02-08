import React, { Component } from 'react';
import './styles.css';
import EditableInput from '../EditableInput/EditableInput';
import Accordion from '../Accordion/Accordion';

class CharacterSheet extends Component {

  saveField = (name, value) => {
    const newField = {name, value};
    console.log(newField);
  }

  render() {
  const moves = this.props.moves.map(
    (move, index) =>
      <div key={index}>
        <span className={"accordionSubheader"}>{move.name}</span>
        <div className={"accordionText"}>{move.text}</div>
      </div>
    )
    const notes = this.props.notes.map(
      (note, index) =>
        <div key={index}>
          <div className={"accordionText"}>{note}</div>
        </div>
      )
    return (
      <div className={"container"}>
        <div className={"header"}>
          {this.props.playbook}
        </div>
        <div className={"inputGroup"}>
          <EditableInput label={"Name"} initialValue={this.props.name} onSave={this.saveField.bind(this, 'name')} />
          <EditableInput label={"Hero Name"} initialValue={this.props.heroName} onSave={this.saveField.bind(this, 'heroName')} />
          <EditableInput label={"Player"} initialValue={this.props.player} onSave={this.saveField.bind(this, 'player')} />
        </div>
        <div className={"statGroup"}>
          <div className={"labelBox"}>{'Labels go here'}</div>
          <div className={"conditionsBox"}>{'Conditions go here'}</div>
        </div>
        <Accordion headerText={'Moves'}>{moves}</Accordion>
        <Accordion headerText={'Influence'}>{'Influence'}</Accordion>
        <Accordion headerText={'Notes'}>{this.props.notes.length > 0 ? notes : 'No notes'}</Accordion>
        <div className={"potentialGroup"}>
          <div className={"potentialField"}>
            {'Potential: '}
            <input type='checkbox' checked={this.props.potential > 0} />
            <input type='checkbox' checked={this.props.potential > 1} />
            <input type='checkbox' checked={this.props.potential > 2} />
            <input type='checkbox' checked={this.props.potential > 3} />
            <input type='checkbox' checked={this.props.potential > 4} />
            <button disabled={this.props.potential != 5}>{'Advance'}</button>
            </div>
            <div className={"potentialField"}>
            <a href={'#'}> {this.props.advancements.number + ' previous advancements'} </a>
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterSheet;
