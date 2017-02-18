import React, { Component } from 'react';
import './styles.css';

class EditableInput extends Component {

  constructor(props) {
    super();
    this.state = {
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

  handleBlur = () => {
    if (this.props.initialValue === this.state.value && this.state.value !== '') {
      this.closeEdit();
    }
  }

  handleSave = () => {
    this.props.onSave(this.state.value);
  }

  render() {
    let fieldContent;
    if (this.props.selectOptions) {
      fieldContent = <select className={"fieldInput"} value={this.state.value} onChange={this.changeValue} onBlur={this.handleBlur}>
                      <option key={-1} value='' />
                      {this.props.selectOptions.map((opt, i) => <option key={i} value={opt.value}>{opt.text}</option>)}
                    </select>;
    } else {
      fieldContent = <input
                        className={"fieldInput"}
                        type='text'
                        value={this.state.value}
                        onChange={this.changeValue}
                        onBlur={this.handleBlur}
                      />;
    }

    if (this.state.isEditing) {
      return (
        <div className={"field"}>
          {this.props.label ? <div className={"fieldLabel"}>{this.props.label}</div> : ""}
          {fieldContent}
          <span className={"saveButton"} onClick={this.handleSave}>&#10003;</span>
        </div>
      );
    } else {
      return (
          <div className={"field"}>
            {this.props.label ? <div className={"fieldLabel"}>{this.props.label}</div> : ""}
            <div className={"fieldText"} onClick={this.openEdit}>{this.state.value}</div>
          </div>
      );
    }
  }
}

export default EditableInput;
