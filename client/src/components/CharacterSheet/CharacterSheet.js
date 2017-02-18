import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import './styles.css';
import Header from '../Header/Header';
import EditableInput from '../EditableInput/EditableInput';
import LabelComponent from '../LabelComponent/LabelComponent';
import ConditionComponent from '../ConditionComponent/ConditionComponent';
import MovesComponent from '../MovesComponent/MovesComponent';
import EditableField from '../EditableField/EditableField';
import Accordion from '../Accordion/Accordion';
import { playbookOpts } from '../../data/constants';

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
    const notes = this.props.notes.map(
      (note, index) =>
        <div key={index}>
          <div className={"accordionText"}>{note}</div>
        </div>
      )
    return (
      <div className={"container"}>
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
          <ConditionComponent initialConditions={this.props.conditions} onSave={this.saveField.bind(this, 'conditions')} />
        </div>
        <Accordion headerText={'Moves & Powers'}>
        <div key={-1}>
          <span className={"subheader"}>{'Powers'}</span>
          <EditableField className={"accordionText"} initialValue={this.props.powers.value} onSave={this.saveField.bind(this, 'powers')}/>
        </div>
          <MovesComponent moves={this.props.moves} onSave={this.saveField.bind(this, 'moves')} />
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
