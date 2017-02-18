import React, { Component } from 'react';
import './styles.css';

class EditableField extends Component {

  constructor(props) {
    super();
    this.state = {
      label: props.initialLabel,
      value: props.initialValue,
      isEditing: props.initialValue === '' ? true : false,
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.initialValue !== '') {
      this.closeEdit();
    }
  }

  openEdit = () => {
    this.setState({isEditing: true});
  }

  closeEdit = () => {
    this.setState({isEditing: false});
  }

  changeValue = (e) => {
    this.setState({value: e.target.value});
  }

  changeLabelValue = (e) => {
    this.setState({label: e.target.value});
  }

  handleSave = () => {
    this.props.onSave({label: this.state.label, value: this.state.value});
  }

  handleCancel = () => {
    this.props.onRemove({label: this.state.label, value: this.state.value});
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className={this.props.className}>
          {this.props.hasLabel === true
            ? <input
                className={"fieldInput"}
                type='text'
                value={this.state.label}
                onChange={this.changeLabelValue} />
            : "" }
            <textarea className={"fieldTextArea"} type='text' value={this.state.value} onChange={this.changeValue} />
            <div className="fieldFooter">
              <span className={"fieldSaveButton"} onClick={this.handleSave}>&#10003;</span>
              {this.props.onRemove ? <span className={"fieldSaveButton"} onClick={this.handleCancel}>x</span> : ''}
            </div>
          </div>
      );
    } else {
      return (
        <div onClick={this.openEdit}>
          {this.props.hasLabel === true ? <div className={"subheader"}>{this.props.initialLabel}</div> : ""}
          <div className={this.props.className}>{this.props.initialValue}</div>
        </div>
      );
    }
  }
}

export default EditableField;
