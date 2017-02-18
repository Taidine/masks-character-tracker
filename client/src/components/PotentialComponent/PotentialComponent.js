import React, { Component } from 'react';
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
          <button disabled={this.props.potential !== 5}>{'Advance'}</button>
        </div>
        <div className={"potentialField"}>
          <a href={'#'} onClick={this.openAdvancements}> {this.props.advancements.number + ' previous advancements'} </a>
        </div>
      </div>
      )
    }
  }

export default PotentialComponent;
