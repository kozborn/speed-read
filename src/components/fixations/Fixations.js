import React from "react";
import {number, instanceOf, func} from "prop-types";
import Immutable from "immutable";
import { fixationTextFromDraftJS } from "../../utils/editor_helpers";
import FixationsControls from "./FixationsControls";
import DraftEditor from '../common/Editor';

const getBlockSize = blockSize => (blockSize * 5) + 10

class Fixations extends React.Component {

  static propTypes = {
    text: instanceOf(Immutable.Map).isRequired,
    fixationIndex: number,
    speed: number, // ms
    blockSize: number,
    savePosition: func,
  }

  static defaultProps = {
    documentId: "sample_text",
    speed: 0, // ms
    blockSize: 50, // letters
    fixationIndex: 0,
    eventType: "",
    savePosition: () => "",
  }

  interval = null;
  currentElIndex = 0;
  keyList = [];

  constructor(props) {
    super(props);

    this.startSwitching = this.startSwitching.bind(this);
    this.stopSwitching = this.stopSwitching.bind(this);
    this.pauseSwitching = this.pauseSwitching.bind(this);
    this.setCurrentElIndex = this.setCurrentElIndex.bind(this);
    this.updateCurrentElIndex = this.updateCurrentElIndex.bind(this);
    this.getLineSplittedComponent = this.getLineSplittedComponent.bind(this);
    this.prepareText = this.prepareText.bind(this);
    this.state = {
      text: Immutable.Map(),
      running: false,
    };
  }

  componentDidMount() {
    this.prepareText();
  }

  prepareText() {
    this.setState({
      'text': fixationTextFromDraftJS(this.getLineSplittedComponent, this.props.text.get("text"), getBlockSize(this.props.blockSize)),
    });
    this.setCurrentElIndex(this.props.fixationIndex);
  }

  componentWillReceiveProps(nextProps) {
    if (
        nextProps.text.get('title') !== this.props.text.get('title') ||
        nextProps.blockSize !== this.props.blockSize
      ) {
      this.setState({
        'text': fixationTextFromDraftJS(this.getLineSplittedComponent, nextProps.text.get("text"), getBlockSize(nextProps.blockSize)),
      });
    }

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
    this.keyList.push(props.offsetKey);
    return (
      <span
        data-element-offsetkey={props.offsetKey}
        onClick={this.updateCurrentElIndex}
        className="fixation-line"
      >
        {props.children}
        <span className="breaker"> </span> {/* empty span is required for breaking line */}
      </span>
    );
  }

  updateCurrentElIndex(e) {
    const key = e.target.closest(".fixation-line").getAttribute("data-element-offsetkey");
    const index = this.keyList.indexOf(key) !== -1 ? this.keyList.indexOf(key) : 0;
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
        <FixationsControls
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
          speed={this.props.speed}
          blockSize={this.props.blockSize}
          changeSpeed={this.props.changeSpeed}
          afterChangeSpeed={this.props.afterChangeSpeed}
          changeBlockSize={this.props.changeBlockSize}
          afterChangeBlockSize={this.props.afterChangeBlockSize}
        />
        <DraftEditor
          readOnly
          initialText={this.state.text}
        />
        <div className="text-title">{this.props.text.get("title")}</div>
      </div>
    );
  }
}

export default Fixations;
