import React, { Component } from 'react';
import Modal from 'react-modal';
import { labelLabels } from '../../data/constants';
import './styles.css';

class LabelComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      labels: props.initialLabels,
      maxLabels: props.maxLabels,
    };
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  changeLabel = (index, e) => {
    let labels = this.state.labels.slice();
    labels.splice(index, 1, e.target.value);
    this.setState({labels});
  }

  generateCarat = () => {
    return {__html: this.state.isOpen ? '&#9206' : '&#9207'};
  }

  handleCancel = () => {
    this.setState({ labels: this.props.initialLabels, isOpen: false});
  }

  handleSave = () => {
    this.props.onSave(this.state.labels);
  }

  render() {
    const getLabelValue = (label) => {return (label > 0) ? '+' + label : label };
    return (
      <div className={"labelBox"}>
        <div className={"subheader"} style={{marginLeft:'2px'}}>{'Labels'}</div>
        <table className={"labelTable"} onClick={this.toggleOpen}>
          <tbody>
            {this.state.labels.map((label, i) =>
              <tr className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>
                <td className={"labelLabel"}>{labelLabels[i]}</td>
                <td className={"labelValue"}>{getLabelValue(label)}</td>
              </tr>)}
          </tbody>
        </table>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.toggleOpen}
          overlayClassName={"modalOverlay"}
          className={"modalContent"}
          contentLabel="Modal">
              <div className={"subheader"} style={{marginLeft:'2px'}}>{`Edit ${this.props.name}'s labels`}</div>
              <table className={"labelTable"}>
                <tbody>
                  {this.state.labels.map((label, i) =>
                    <tr className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>
                      <td className={"labelLabel"}>{labelLabels[i]}</td>
                      <td className={"labelValue"}><input type={"number"} value={label} onChange={this.changeLabel.bind(this, i)}/></td>
                    </tr>)}
                </tbody>
              </table>
              <div className={"modalFooter"}>
                <a href={"#"} className={"tinyLink"} onClick={this.handleCancel}>[cancel]</a>
                <a href={"#"} className={"tinyLink"} onClick={this.handleSave}>[save labels]</a>
              </div>
        </Modal>
      </div>
      )
    }
  }

export default LabelComponent;
