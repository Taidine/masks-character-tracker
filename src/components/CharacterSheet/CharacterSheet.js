import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import './styles.css';
import EditableInput from '../EditableInput/EditableInput';
import EditableField from '../EditableField/EditableField';
import Accordion from '../Accordion/Accordion';
import {labelLabels, conditionLabels, conditionText} from '../../data/constants';

class CharacterSheet extends Component {

  saveField = (name, value) => {
    const newField = {name, value};
    console.log(newField);
  }

  render() {
  const moves = this.props.moves.map(
    (move, index) =>
      <div key={index}>
        <span className={"subheader"}>{move.name}</span>
        <EditableField className={"accordionText"} initialValue={move.text} onSave={this.saveField.bind(this, 'move')}/>
      </div>
    )
    const notes = this.props.notes.map(
      (note, index) =>
        <div key={index}>
          <div className={"accordionText"}>{note}</div>
        </div>
      )
    const labelTableContent = this.props.labels.map ((label, i) =>
      <tr className={i%2 ? "rowHighlight": "rowLowlight"}>
        <td className={"labelLabel"}>{labelLabels[i]}</td>
        <td className={"labelValue"}> {(label - 2 > 0) ? '+' + (label-2) : (label-2) } </td>
      </tr>
    );
    const conditionsTableContent = this.props.conditions.map ((condition, i) =>
      <tr className={i%2 ? "rowHighlight": "rowLowlight"}>
        <td className={(condition === 1 ? ' bold' : '') + " conditionLabel" }>{conditionLabels[i]}</td>
        <td className={"conditionMarked bold"}>{condition === 1 ? 'x' : '' }</td>
      </tr>
    );
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
          <div className={"labelBox"}>
            <div className={"subheader"} style={{marginLeft:'2px'}}>{'Labels'}</div>
            <table className={"labelTable"}>
              {labelTableContent}
            </table>
          </div>
          <div className={"conditionsBox"}>
            <div className={"subheader"} style={{marginLeft:'2px'}}>{'Conditions'}</div>
            <table className={"conditionsTable"}>
              {conditionsTableContent}
            </table>
          </div>
        </div>
        <Accordion headerText={'Moves'}>{moves}</Accordion>
        <Accordion headerText={'Influence'}>
          <div className={"influenceGroup"}>
            <div className={"influenceColumn"}>
              <div className={"subheader"}>{'Influence-ees (+1 against):'}</div>
              {this.props.influence.on.map((name, i) => <div className={i%2 ? "rowHighlight": "rowLowlight"}>{name}</div>)}
            </div>
            <div className={"influenceColumn"}>
              <div className={"subheader"}>{'Influencers:'}</div>
              {this.props.influence.by.map((name, i) => <div className={i%2 ? "rowHighlight": "rowLowlight"}>{name}</div>)}
            </div>
            <div className={"influenceColumn"}>
              <div className={"subheader"}>{'Cannot take influence: '}</div>
              {this.props.influence.not.map((name, i) => <div className={i%2 ? "rowHighlight": "rowLowlight"}>{name}</div>)}
            </div>
          </div>
        </Accordion>
        <Accordion headerText={'Notes'}>{this.props.notes.length > 0 ? notes : 'No notes'}</Accordion>
        <div className={"potentialGroup"}>
          <div className={"potentialField"}>
            {'Potential: '}
            <input type='checkbox' checked={this.props.potential > 0} />
            <input type='checkbox' checked={this.props.potential > 1} />
            <input type='checkbox' checked={this.props.potential > 2} />
            <input type='checkbox' checked={this.props.potential > 3} />
            <input type='checkbox' checked={this.props.potential > 4} />
            <button disabled={this.props.potential !== 5}>{'Advance'}</button>
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
