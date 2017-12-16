import React from "react";
import {number, instanceOf, func} from "prop-types";
import Immutable from "immutable";
import { Editor } from 'draft-js';
import { fixationTextFromDraftJS } from "../../utils/editor_helpers";
import FixationsToolbar from "./FixationsToolbar";

class Fixations extends React.Component {

  static propTypes = {
    text: instanceOf(Immutable.Map).isRequired,
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

    this.startSwitching = this.startSwitching.bind(this);
    this.stopSwitching = this.stopSwitching.bind(this);
    this.pauseSwitching = this.pauseSwitching.bind(this);
    this.setCurrentElIndex = this.setCurrentElIndex.bind(this);
    this.updateCurrentElIndex = this.updateCurrentElIndex.bind(this);
    this.getLineSplittedComponent = this.getLineSplittedComponent.bind(this);
  }

  componentDidMount() {
    this.setCurrentElIndex(this.props.fixationIndex);
  }

  componentWillReceiveProps(nextProps) {
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
    // TODO fix this, it needs to know if user really wants to save this data
    // this.props.savePosition(this.currentElIndex);
  }

  getLineSplittedComponent(props) {
    return (
      <span
        data-element-index={props.offsetKey.split('-')[1]}
        onClick={this.updateCurrentElIndex}
        className="fixation-line"
      >
        {props.children}
        <span className="breaker"> </span>
      </span>
    );
  }

  updateCurrentElIndex(e) {
    const index = parseInt(e.target.closest(".fixation-line").getAttribute("data-element-index"), 10);
    this.setCurrentElIndex(index);
    this.props.savePosition(index);
  }

  setCurrentElIndex(index) {
    this.currentElIndex = index;
    const elements = this.getElements();
    Array.prototype.forEach.call(elements, element => element.classList.remove("highlight"));
    if (elements[this.currentElIndex]) {
      elements[this.currentElIndex].classList.add("highlight");
    }
  }

  getElements() {
    return this.textWithFixations.getElementsByClassName("fixation-line");
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
    Array.prototype.forEach.call(elements, element => element.classList.remove("highlight"));
    this.pauseSwitching();
    this.currentElIndex = 0;
    this.props.savePosition(0);
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
        <Editor
          readOnly
          editorState={fixationTextFromDraftJS(this.getLineSplittedComponent, this.props.text.get("text"))}
        />
        <div className="text-title">{this.props.text.get("title")}</div>
      </div>
    );
  }
}

export default Fixations;
