import React, { Component } from 'react';
import Modal from 'react-modal';
import './styles.css';

class PotentialComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
    };
  }

  openAdvancements = () => {this.setState({isOpen: true})}

  closeAdvancements = () => {this.setState({isOpen: false})}

  check = (i, e) => {
    if (i === this.props.potential) {
      this.props.onSave(Number(i) + 1);
    }
    if (i === (Number(this.props.potential) - 1)) {
      this.props.onSave(Number(i));
    }
  }

  render() {
    let checkboxes = [];
      for (let i = 0; i < 5; i++) {
        checkboxes.push(
          <input type='checkbox' checked={this.props.potential > i} onChange={this.check.bind(this, i)} key={i}/>);
      }
    return (
      <div className={"potentialGroup"}>
        <div className={"potentialField"}>
          {'Potential: '}
          {checkboxes}
          <button disabled={this.props.potential !== 5} onClick={this.props.onAdvance}>{'Advance'}</button>
        </div>
        <div className={"potentialField"}>
          <a href={'#'} onClick={this.openAdvancements}>{this.props.advancements.length + ' previous advancements'} </a>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeAdvancements}
          overlayClassName={"modalOverlay"}
          className={"modalContent"}
          contentLabel="advancements_modal">
              <div className={"subheader"} style={{}}>{'Previous advancements'}</div>
              {!this.props.advancements || this.props.advancements.length === 0
                ? <div key={-1} className={"accordionText"}>{'This character has not taken any advancements'}</div>
                : this.props.advancements.map((adv, i) =>
                  <div key={i} className={"accordionText"}>{adv}</div>)}
              <div className={"modalFooter"}>
                <a href={"#"} className={"tinyLink"} onClick={this.closeAdvancements}>[close]</a>
              </div>
        </Modal>
      </div>
      )
    }
  }

export default PotentialComponent;
