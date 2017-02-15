import React, { Component } from 'react';
import './styles.css';

class Header extends Component {

  constructor(props) {
    super();
    this.state = {
      value: props.initialValue,
      isEditing: props.initialValue === '' ? true : false,
      confirmDelete: false,
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

  handleDelete = () => {
    this.props.onDelete();
  }

  toggleConfirmDelete = () => {
    this.setState({confirmDelete: !this.state.confirmDelete});
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <select className={"fieldInput"} value={this.state.value} onChange={this.changeValue} onBlur={this.handleBlur}>
              <option key={-1} value=''/>
              {this.props.selectOptions.map((opt, i) => <option key={i} value={opt.value}>{opt.text}</option>)}
          </select>
          <span className={"saveButton"} onClick={this.handleSave}>&#10003;</span>
        </div>
      )
    } else {
      return (<div>
                <span onClick={this.openEdit}>{this.props.initialValue}</span>
                { this.state.confirmDelete
                  ? <a className={"tinyLink"}> {'Delete this character?'}
                      <a className={"tinyLink"} href={'#'} onClick={this.toggleConfirmDelete}>{'[no, don\'t do it!]'}</a>
                      <a className={"tinyLink"} href={'#'} onClick={this.handleDelete}>{'[yes]'}</a>
                    </a>
                  : <a href={'#'} className={"tinyLink"} onClick={this.toggleConfirmDelete}>{'[x]'}</a>
                }
              </div>);
    }
  }

}

export default Header;
