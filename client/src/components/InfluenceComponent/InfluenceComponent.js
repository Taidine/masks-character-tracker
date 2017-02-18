import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import EditableInput from '../EditableInput/EditableInput';
import './styles.css';

class InfluenceComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      key: '',
    };
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (newProps.influence !== oldProps.influence) {
      this.setState({key: ''});
    }
  }

  setKey = (key) => {
    this.setState({key});
  }

  addInfluence = (key, name) => {
    if (name !== ''){
      let newInfluence = {};
      newInfluence[key] = this.props.influence[key].concat([name]);
      this.props.onSave(Object.assign({}, this.props.influence, newInfluence));
    }
  }

  deleteInfluence = (key, index) => {
    let oldInfluence = this.props.influence[key].slice();
    oldInfluence.splice(index, 1);
    let newInfluence = {};
    newInfluence[key] = oldInfluence;
    this.props.onSave(Object.assign({}, this.props.influence, newInfluence));
  }

  generateInfluenceRow = (name, i, key) => {
    return (
      <div className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>
        <span className={"tinyLink"} onClick={this.deleteInfluence.bind(this, key, i)}> [ - ] </span>
        <span className={"influenceText"}>{name}</span>
      </div>);
  }

  generateInfluenceFooter = (key) => {
    return (
      <div className={"influenceFooter"}>
        {this.state.key === key
          ? <EditableInput initialValue={""} onSave={this.addInfluence.bind(this, key)} onRemove={this.setKey.bind(this, '')} />
          : <span className={"tinyLink"} onClick={this.setKey.bind(this, key)}>[Add]</span>}
      </div>);
  }

  render() {
    return (
      <div className={"influenceGroup"}>
        <div className={"influenceColumn"}>
          <div className={"subheader"}>{'Influence-ees (+1 against):'}</div>
          {this.props.influence.on.map((name, i) => this.generateInfluenceRow(name, i, 'on'))}
          {this.generateInfluenceFooter('on')}
        </div>
        <div className={"influenceColumn"}>
          <div className={"subheader"}>{'Influencers:'}</div>
          {this.props.influence.by.map((name, i) => this.generateInfluenceRow(name, i, 'by'))}
          {this.generateInfluenceFooter('by')}
        </div>
        <div className={"influenceColumn"}>
          <div className={"subheader"}>{'Cannot take influence: '}</div>
          {this.props.influence.not.map((name, i) => this.generateInfluenceRow(name, i, 'not'))}
          {this.generateInfluenceFooter('not')}
        </div>
      </div>
      )
    }
  }

export default InfluenceComponent;
