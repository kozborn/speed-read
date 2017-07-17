import React from "react";
import {number, func, string} from "prop-types";
import Api from "../api/Api";
import {stringDivider} from "../utils/helpers";

const PREFIX = "<div class='wrapper'>";
const POSTFIX = " </div>||"; // "||" are used for splitting text

class Fixations extends React.Component {

  static propTypes = {
    documentId: string,
    speed: number, // ms
    eventType: string,
    handleExternalEvent: func,
  }

  static defaultProps = {
    documentId: "sample_text",
    speed: 1000, //ms
    eventType: "",
    handleExternalEvent: () => "",
  }

  constructor(props) {
    super(props);
    this.state = {
      textWrapped: [],
      running: false,
    };

    this.getText = this.getText.bind(this);
    this.startSwitching = this.startSwitching.bind(this);
    this.stopSwitching = this.stopSwitching.bind(this);
    this.pauseSwitching = this.pauseSwitching.bind(this);
  }

  componentWillMount() {
    const {documentId} = this.props;
    Api.getText(documentId)
    .then((jsonResponse) => {
      const textWrapped = stringDivider(jsonResponse.fixationsText, 50, PREFIX, POSTFIX).split("||");
      this.setState({textWrapped});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.speed !== this.props.speed) {
      clearInterval(this.interval);
      this.interval = null;
      this.startSwitching();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getText() {
    const lines = [];
    const {textWrapped} = this.state;

    for (let i = 0; i < textWrapped.length; i += 2) {
      const line = (<div className="line" key={`line_${i}`}>
        <div dangerouslySetInnerHTML={this.createMarkup(textWrapped[i])} className="left" />
        <div className="left-space">&nbsp;</div>
        <div dangerouslySetInnerHTML={this.createMarkup(textWrapped[i + 1])} className="right" />
        <div className="clearfix" />
      </div>);
      lines.push(line);
    }
    return lines;
  }

  getElements() {
    const leftElements = this.textWithFixations.getElementsByClassName("left");
    const rightElements = this.textWithFixations.getElementsByClassName("right");
    const elements = [];
    for (let i = 0; i < leftElements.length; i += 1) {
      elements.push(leftElements[i]);
      elements.push(rightElements[i]);
    }
    return elements;
  }

  startSwitching() {
    const elements = this.getElements();
    this.setState({running: true});
    if (!this.interval) {
      this.interval = setInterval(() => {
        elements[this.currentElIndex].classList.add("highlight");
        if (this.currentElIndex > 0) elements[this.currentElIndex - 1].classList.remove("highlight");
        this.currentElIndex += 1;
        if (this.currentElIndex === elements.length) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }, this.props.speed);
    }
  }

  pauseSwitching() {
    this.setState({running: false});
    clearInterval(this.interval);
    this.interval = null;
  }

  stopSwitching() {
    const elements = this.getElements();
    elements.forEach(element => element.classList.remove("highlight"));
    this.pauseSwitching();
    this.currentElIndex = 0;
  }

  interval = null;
  currentElIndex = 0;

  createMarkup(markup) {
    return {__html: markup};
  }

  render() {
    return (
      <div className="text-with-fixations" ref={(e) => { this.textWithFixations = e; }} >
        <div className="toolbar">
          <button onClick={this.state.running ? this.pauseSwitching : this.startSwitching}>
            {this.state.running ? "Pause" : "Start"}
          </button>
          {this.state.running ? <button onClick={this.stopSwitching} >Stop</button> : null}
        </div>
        {this.getText()}
      </div>
    );
  }
}

export default Fixations;
