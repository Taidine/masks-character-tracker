import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { conditionLabels,
  conditionPenalty,
  conditionClear,
} from '../../data/constants';
import './styles.css';

class ConditionComponent extends Component {

    changeCondition = (index) => {
        let conditions = this.props.initialConditions.slice();
        let newValue = !conditions[index];
        conditions.splice(index, 1, newValue);
        this.props.onSave(conditions);
      };

  render() {
    const conditionsTableContent = this.props.initialConditions.map((condition, i) =>
      <tr className={i%2 ? "rowHighlight": "rowLowlight"} key={i}>
        <td className={(condition ? "bold " : "") + "conditionLabel"}>
            <div style={{display:"inline-block"}}>{conditionLabels[i]}</div>
            <div className={"conditionPenalty"}>
              {' (' + conditionPenalty[i] + ') '}
            </div>
          </td>
          <td className={"markCondition"} data-tip={condition ? conditionClear[i] : ''}>
            {condition
            ? <div className={"markClear bold"} onClick={this.changeCondition.bind(this, i)} >
              {'[clear]'}
              </div>
            : <div className={"markClear"} onClick={this.changeCondition.bind(this, i)} >
              {'[mark]'}
              </div>}
          </td>
      </tr>
    );
    return (
      <div className={"conditionsBox"}>
        <ReactTooltip place={"top"}/>
        <div className={"subheader"} style={{marginLeft:'2px'}}>{'Conditions'}</div>
        <table className={"conditionsTable"}>
          <tbody>
          {conditionsTableContent}
          </tbody>
        </table>
      </div>
      )
    }
  }

export default ConditionComponent;
