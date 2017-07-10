import React from "react";
import {number} from "prop-types";
import sampleText from "../assets/sample_texts.json";
import {stringDivider} from "../utils/helpers";

const PREFIX = "<div class='wrapper'>";
const POSTFIX = " </div>||"; // "||" are used for splitting text

class Fixations extends React.Component {

  static propTypes = {
    speed: number, // ms
  }

  static defaultProps = {
    speed: 1000, //ms
  }

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textSplitted: [],
    };

    this.getText = this.getText.bind(this);
    this.startSwitching = this.startSwitching.bind(this);
  }

  componentDidMount() {
    const text = stringDivider(sampleText.text1, 40, PREFIX, POSTFIX);
    this.setState({text, textSplitted: text.split("||")});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getText() {
    const lines = [];
    const {textSplitted} = this.state;

    for (let i = 0; i < textSplitted.length; i += 2) {
      const line = (<div className="line" key={`line_${i}`}>
        <div dangerouslySetInnerHTML={this.createMarkup(textSplitted[i])} className="left" />
        <div className="left-space">&nbsp;</div>
        <div dangerouslySetInnerHTML={this.createMarkup(textSplitted[i + 1])} className="right" />
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
    let index = 0;
    if (!this.interval) {
      this.interval = setInterval(() => {
        elements[index].classList.add("highlight");
        if (index > 0) elements[index - 1].classList.remove("highlight");
        index += 1;
        if (index === elements.length) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }, this.props.speed);
    }
  }

  interval = null;

  createMarkup(markup) {
    return {__html: markup};
  }

  render() {
    return (
      <div className="text-with-fixations" ref={(e) => { this.textWithFixations = e; }} >
        <div className="toolbar">
          <button onClick={this.startSwitching}>Start</button>
        </div>
        {this.getText()}
      </div>
    )
  }
}

export default Fixations;
