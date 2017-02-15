import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import { labelLabels } from '../../data/constants';
import './styles.css';

class LabelComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      labels: props.initialLabels,
      totalLabels: props.initialLabels.reduce((total, label) => Number(total) + Number(label)),
      error: false,
    };
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (newProps.initialLabels !== oldProps.initialLabels) {
      this.toggleOpen(false);
    }
  }

  toggleOpen = (isOpen) => {
    isOpen = typeof isOpen === 'boolean' ? isOpen : !this.state.isOpen; 
    this.setState({isOpen});
  }

  changeLabel = (index, e) => {
    if (Number(e.target.value) > -3 && Number(e.target.value) < 4) {
      let labels = this.state.labels.slice();
      labels.splice(index, 1, e.target.value);
      let totalLabels = labels.reduce((total, label) => Number(total) + Number(label));
      this.setState({labels, totalLabels});
    }
  }

  handleCancel = () => {
    this.setState({ labels: this.props.initialLabels, isOpen: false});
  }

  handleSave = () => {
    if (this.props.maxLabels  === this.state.totalLabels){
      this.props.onSave(this.state.labels);
    }
  }

  render() {
    const formatLabel = (label) => {return (label > 0) ? '+' + label : label };
    const errorText = `Your labels are too ${this.props.maxLabels > this.state.totalLabels ? 'low' : 'high'}.
      Shift them ${this.props.maxLabels > this.state.totalLabels ? 'up' : 'down, or take an appropriate advancement'}`;
    let saveButton;
    if (Number(this.props.maxLabels) === Number(this.state.totalLabels)) {
      saveButton = <a href={"#"} className={"tinyLink"} onClick={this.handleSave}>[save labels]</a>
    } else {
      saveButton = <a href={"#"} className={"tinyLink error"} data-tip={errorText}>[save labels]</a>
    }
    return (
      <div className={"labelBox"}>
        <div className={"subheader"} style={{marginLeft:'2px'}}>{'Labels'}</div>
        <table className={"labelTable"} onClick={this.toggleOpen}>
          <tbody>
            {this.state.labels.map((label, i) =>
              <tr className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>
                <td className={"labelLabel"}>{labelLabels[i]}</td>
                <td className={"labelValue"}>{formatLabel(label)}</td>
              </tr>)}
          </tbody>
        </table>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.toggleOpen}
          overlayClassName={"modalOverlay"}
          className={"modalContent"}
          contentLabel="Modal">
              <div className={"subheader"} style={{marginLeft:'2px'}}>{`Edit labels for ${this.props.name}`}</div>
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
                <ReactTooltip place={"top"}/>
                <a href={"#"} className={"tinyLink"} onClick={this.handleCancel}>[cancel]</a>
                {saveButton}
              </div>
        </Modal>
      </div>
      )
    }
  }

export default LabelComponent;
