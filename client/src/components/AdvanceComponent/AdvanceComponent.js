import React, { Component } from 'react';
import Modal from 'react-modal';
import './styles.css';

const ADVANCE_TYPES = [
  {type: 'INCREASE_LABEL', label: "Increase any label by one"},
  {type: 'INCREASE_TWO_LABELS', label: "Increase any two labels by one"},
  {type: 'NEW_MOVE_OWN', label: "Take another move from your playbook"},
  {type: 'NEW_MOVE_OTHER', label: "Take a new move from another playbook"},
  {type: 'OTHER', label: "Other"},
]

class AdvanceComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      notes: {label: '', text: ''},
      type: null
    };
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  handleChangeType = (e) => {
    let notes = Object.assign({}, this.state.notes, {label: e.target.value});
    this.setState({type: e.target.name, notes});
  }

  handleChangeNotes = (e) => {
    let notes = Object.assign({}, this.state.notes, {text: e.target.value});
    this.setState({notes});
  }

  handleSave = () => {
    this.props.advance(this.state.type, this.state.notes);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.handleCancel}
        overlayClassName={"modalOverlay"}
        className={"modalContent"}
        contentLabel="Advancements">
            <div className={"subheader"} style={{marginLeft:'2px'}}>{`Mark an advancement for ${this.props.name}`}</div>
            <div className={"radioGroup"}>{ADVANCE_TYPES.map((at, i) =>
              <div>
                <input key={i} type={"radio"} name={at.type} value={at.label} checked={at.type === this.state.type} onChange={this.handleChangeType} />
                {at.label}
              </div>)}
            </div>
            <textarea className={"fieldTextArea"} type='text' value={this.state.notes.text} onChange={this.handleChangeNotes} />
            <div className={"modalFooter"}>
              <a href={"#"} className={"tinyLink"} onClick={this.handleCancel}>[cancel]</a>
              <a href={"#"} className={"tinyLink"} onClick={this.handleSave}>[advance]</a>
            </div>
      </Modal>
      )
    }
  }

export default AdvanceComponent;
