import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import * as Actions from '../../actions';
import './styles.css';
import Header from '../Header/Header';
import EditableInput from '../EditableInput/EditableInput';
import LabelComponent from '../LabelComponent/LabelComponent';
import EditableField from '../EditableField/EditableField';
import Accordion from '../Accordion/Accordion';
import { conditionLabels,
  conditionPenalty,
  conditionClear,
  playbookOpts } from '../../data/constants';

class CharacterSheet extends Component {

  saveField = (name, value) => {
    let newField = {};
    newField[name] = value;
    const sheet = Object.assign({}, this.props.currentSheet, newField);
    this.props.updateSheet(sheet);
  }

  onDeleteSheet = () => {
    this.props.deleteSheet(this.props.cId);
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
    const conditionsTableContent = this.props.conditions.map ((condition, i) =>
      <tr className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>
        <td className={(condition === 1 ? "bold " : "") + "conditionLabel"}>
            <div style={{display:"inline-block"}}>{conditionLabels[i]}</div>
            <div style={{display:"inline-block", fontSize: 'small', marginLeft: '5px'}}>
              {' (' + conditionPenalty[i] + ') '}
            </div>
          </td>
          <td className={"conditionMarked bold"}>
            <div data-tip={conditionClear[i]}>
              {condition === 1 ? '[clear]' : '' }
            </div></td>
      </tr>
    );
    return (
      <div className={"container"}>
      <ReactTooltip place={"top"}/>
        <div className={"header"}>
          <Header initialValue={this.props.playbook} selectOptions={playbookOpts} onSave={this.saveField.bind(this, 'playbook')} onDelete={this.onDeleteSheet} />
        </div>
        <div className={"inputGroup"}>
          <EditableInput label={"Name"} initialValue={this.props.name} onSave={this.saveField.bind(this, 'name')} />
          <EditableInput label={"Hero Name"} initialValue={this.props.heroName} onSave={this.saveField.bind(this, 'heroName')} />
          <EditableInput label={"Player"} initialValue={this.props.player} onSave={this.saveField.bind(this, 'player')} />
        </div>
        <div className={"statGroup"}>
          <LabelComponent initialLabels={this.props.labels} maxLabels={this.props.maxLabels} name={this.props.name} onSave={this.saveField.bind(this, 'labels')} />
          <div className={"conditionsBox"}>
            <div className={"subheader"} style={{marginLeft:'2px'}}>{'Conditions'}</div>
            <table className={"conditionsTable"}>
              <tbody>
              {conditionsTableContent}
              </tbody>
            </table>
          </div>
        </div>
        <Accordion headerText={'Moves & Powers'}>
          <div key={-1}>
            <span className={"subheader"}>{'Powers'}</span>
            <EditableField className={"accordionText"} initialValue={this.props.powers} onSave={this.saveField.bind(this, 'powers')}/>
          </div>
          {moves}
        </Accordion>
        <Accordion headerText={'Influence'}>
          <div className={"influenceGroup"}>
            <div className={"influenceColumn"}>
              <div className={"subheader"}>{'Influence-ees (+1 against):'}</div>
              {this.props.influence.on.map((name, i) => <div className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>{name}</div>)}
            </div>
            <div className={"influenceColumn"}>
              <div className={"subheader"}>{'Influencers:'}</div>
              {this.props.influence.by.map((name, i) => <div className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>{name}</div>)}
            </div>
            <div className={"influenceColumn"}>
              <div className={"subheader"}>{'Cannot take influence: '}</div>
              {this.props.influence.not.map((name, i) => <div className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>{name}</div>)}
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

const mapStateToProps = (state, ownProps) => {
  const cId = ownProps.cId;
  const sheet = state.sheets.sheets.find(s => s.cId === cId);
  return {
    ...sheet,
    currentSheet: {...sheet},
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default CharacterSheet = connect(
  mapStateToProps,
  mapDispatchToProps)(CharacterSheet);
