import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import './styles.css';
import EditableField from '../EditableField/EditableField';
import Accordion from '../Accordion/Accordion';
import EditableInput from '../EditableInput/EditableInput';
import Header from '../Header/Header';
import LabelComponent from '../LabelComponent/LabelComponent';
import ConditionComponent from '../ConditionComponent/ConditionComponent';
import MovesComponent from '../MovesComponent/MovesComponent';
import InfluenceComponent from '../InfluenceComponent/InfluenceComponent';
import PotentialComponent from '../PotentialComponent/PotentialComponent';
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
          <InfluenceComponent influence={this.props.influence} onSave={this.saveField.bind(this, 'influence')} />
        </Accordion>
        <Accordion headerText={'Notes'}>
          <EditableField
            className={"accordionText"}
            initialValue={this.props.notes.value || 'No notes'}
            onSave={this.saveField.bind(this, 'notes')}/>
        </Accordion>
        <PotentialComponent potential={this.props.potential} advancements={this.props.advancements} onSave={this.saveField.bind(this, 'potential')}/>
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
