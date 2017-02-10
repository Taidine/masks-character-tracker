import React, { Component } from 'react';
import Collapse from 'react-collapse';
import './styles.css';

class Accordion extends Component {

  constructor(props) {
    super();
    this.state = {
      isOpen: false,
    };
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  generateCarat = () => {
    return {__html: this.state.isOpen ? '&#9206' : '&#9207'};
  }

  render() {
    const content = this.props.children;
    return (
      <div className={"accordion"}>
        <div className={"accordionHeader"} onClick={this.toggleOpen}>
          <div className={"headerText"}>{this.props.headerText}</div>
          <div className={"toggleButton"}>
            <div dangerouslySetInnerHTML={this.generateCarat()} /></div>
        </div>
        <Collapse className={"content"} isOpened={this.state.isOpen}>
          {content}
        </Collapse>
      </div>
    )
  }
}

export default Accordion;
