import React, { Component } from 'react';
import './styles.css';

class EditableField extends Component {

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
        <div className={this.props.className}>
          <textarea className={"fieldTextArea"} type='text' value={this.state.value} onChange={this.changeValue} />
          <div className="fieldFooter">
            <span className={"fieldSaveButton"} onClick={this.handleSave}>&#10003;</span>
          </div>
        </div>
      );
    } else {
      return (
          <div className={this.props.className} onClick={this.toggleEdit}>{this.state.value}</div>
      );
    }
  }
}

export default EditableField;
