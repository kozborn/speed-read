import React from "react";
import {number, instanceOf, func} from "prop-types";
import {Map} from "immutable";
import { stringDivider, flattenHTML } from "../../utils/helpers";
import FixationsToolbar from "./FixationsToolbar";

const PREFIX = "<div class='wrapper'>";
const POSTFIX = " </div>||"; // "||" are used for splitting text

class Fixations extends React.Component {

  static propTypes = {
    fixation: instanceOf(Map).isRequired,
    fixationIndex: number,
    speed: number, // ms
    savePosition: func,
  }

  static defaultProps = {
    documentId: "sample_text",
    speed: 0, // ms
    fixationIndex: 0,
    eventType: "",
    savePosition: () => "",
  }

  interval = null;
  currentElIndex = 0;

  constructor(props) {
    super(props);
    this.state = {
      textWrapped: [],
      running: false,
    };

    this.getText = this.getText.bind(this);
    this.prepareText = this.prepareText.bind(this);
    this.startSwitching = this.startSwitching.bind(this);
    this.stopSwitching = this.stopSwitching.bind(this);
    this.pauseSwitching = this.pauseSwitching.bind(this);
    this.setCurrentElIndex = this.setCurrentElIndex.bind(this);
    this.updateCurrentElIndex = this.updateCurrentElIndex.bind(this);
  }

  componentDidMount() {
    this.prepareText(this.props.fixation.get("text", ""));
    this.setCurrentElIndex(this.props.fixationIndex);
  }

  componentWillReceiveProps(nextProps) {
    this.prepareText(nextProps.fixation.get("text", ""));
    if (nextProps.speed !== this.props.speed) {
      clearInterval(this.interval);
      this.interval = null;
      if (this.state.running) this.startSwitching();
    }

    if (nextProps.fixationIndex !== this.props.fixationIndex) {
      this.setCurrentElIndex(nextProps.fixationIndex);
    }
  }

  componentDidUpdate() {
    this.setCurrentElIndex(this.props.fixationIndex);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.savePosition(this.currentElIndex);
  }

  updateCurrentElIndex(e) {
    const index = parseInt(e.target.closest(".wrapper-content").getAttribute("data-element-index"));
    this.setCurrentElIndex(index);
    this.props.savePosition(index);
  }

  setCurrentElIndex(index) {
    this.currentElIndex = index;
    const elements = this.getElements();
    elements.forEach(element => element.classList.remove("highlight"));
    if (elements[this.currentElIndex]) {
      elements[this.currentElIndex].classList.add("highlight");
    }
  }

  getText() {
    const lines = [];
    const {textWrapped} = this.state;

    for (let i = 0; i < textWrapped.length; i += 2) {
      const line = (<div className="line" key={`line_${i}`}>
        <div
          className="left wrapper-content"
          dangerouslySetInnerHTML={this.createMarkup(textWrapped[i])}
          data-element-index={i}
          onClick={this.updateCurrentElIndex}
        />
        <div className="left-space">&nbsp;</div>
        <div
          className="right wrapper-content"
          dangerouslySetInnerHTML={this.createMarkup(textWrapped[i + 1])}
          data-element-index={i + 1}
          onClick={this.updateCurrentElIndex}
        />
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

  prepareText(text) {
    const textWrapped = stringDivider(text, 50, PREFIX, POSTFIX).split("||");
    this.setState({textWrapped});
  }

  startSwitching() {
    const elements = this.getElements();
    this.setState({running: true});
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (!elements[this.currentElIndex]) return;
        elements[this.currentElIndex].classList.add("highlight");
        if (this.currentElIndex > 0) elements[this.currentElIndex - 1].classList.remove("highlight");
        this.currentElIndex += 1;
        if (this.currentElIndex === elements.length) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }, (1000 - (this.props.speed * 75)));
    }
  }

  pauseSwitching() {
    this.setState({running: false});
    clearInterval(this.interval);
    this.interval = null;
    this.props.savePosition(this.currentElIndex);
  }

  stopSwitching() {
    const elements = this.getElements();
    elements.forEach(element => element.classList.remove("highlight"));
    this.pauseSwitching();
    this.currentElIndex = 0;
    this.props.savePosition(0);
  }

  createMarkup(markup) {
    return {__html: markup};
  }

  render() {
    return (
      <div className="text-with-fixations" ref={(e) => { this.textWithFixations = e; }} >
        <FixationsToolbar
          startBtn={{
            cb: this.state.running ? this.pauseSwitching : this.startSwitching,
            label: this.state.running ? "Pause" : "Start",
            disabled: false,
          }}
          stopBtn={{
            cb: this.stopSwitching,
            label: "Stop",
            disabled: !this.state.running,
          }}
        />
        <div className="text-title">{this.props.fixation.get("title")}</div>
        {this.getText()}
      </div>
    );
  }
}

export default Fixations;
