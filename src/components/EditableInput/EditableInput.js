import React, { Component } from 'react';
import './styles.css';

class EditableInput extends Component {

  constructor(props) {
    super();
    this.state = {
      value: props.initialValue,
      isEditing: false,
    };
  }

  componentWillReceiveProps (nextProps, props) {
    this.setState ({isEditing: false});
  }

  toggleEdit = () => {
    this.setState({isEditing: !this.state.isEditing});
  }

  changeValue = (e) => {
    this.setState({value: e.target.value});
  }

  handleSave = () => {
    this.toggleEdit();
    this.props.onSave(this.state.value);
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div className={"field"}>
          <div className={"fieldLabel"}>{this.props.label}</div>
          <input className={"fieldInput"} type='text' value={this.state.value} onChange={this.changeValue} />
          <span className={"saveButton"} onClick={this.handleSave}>&#10003;</span>
        </div>
      );
    } else {
      return (
          <div className={"field"} onClick={this.toggleEdit}>
            <div className={"fieldLabel"}>{this.props.label}</div>
            <div className={"fieldText"}>{this.state.value}</div>
          </div>
      );
    }
  }
}

export default EditableInput;
