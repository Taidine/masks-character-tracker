import React, { Component } from 'react';
import EditableField from '../EditableField/EditableField';
import './styles.css';

class MovesComponent extends Component {

  constructor(props) {
    super();
    this.state = {
    };
  }

  addMove = () => {
    let newMove = {name: '', text: ''}
    let oldMove = this.props.moves.slice().pop();
    if (oldMove.text != '' && oldMove.name != ''){
      this.props.onSave(this.props.moves.concat(newMove));
    }
  }

  editMove = (index, value) => {
    let moves = this.props.moves.slice();
    moves.splice(index, 1, {name: value.label, text: value.value});
    this.props.onSave(moves);
  }

  deleteMove = (index) => {
    let moves = this.props.moves.slice();
    moves.splice(index, 1);
    this.props.onSave(moves);
  }

  render() {
    const moves = this.props.moves.map(
      (move, index) =>
        <div key={index}>
          <EditableField
            className={"accordionText"}
            hasLabel={true}
            initialLabel={move.name}
            initialValue={move.text}
            onSave={this.editMove.bind(this, index)}
            onRemove={this.deleteMove.bind(this, index)}/>
        </div>
      );
    return (
      <div>
        {moves}
        <div className={"tinyLink"} onClick={this.addMove}>[Add Move]</div>
      </div>
    )
  }
}

export default MovesComponent;
