import React from "react";
import Slider from "rc-slider";
import {Map} from "immutable";
import {string, func, instanceOf, oneOfType} from "prop-types";
import Fixations from "./Fixations";
import handle from "../common/SliderHandle";

const marks = {
  0: "low",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "11",
  12: "high",
};

class FixationsWithSliders extends React.Component {

  static propTypes = {
    preferences: instanceOf(Map).isRequired,
    savePreferences: func.isRequired,
    text: oneOfType([
      instanceOf(Map),
    ]).isRequired,
  }

  static defaultProps = {
    docId: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      speed: props.preferences.get("fixationsSpeed", 0),
    };

    this.changeSpeed = this.changeSpeed.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.savePosition = this.savePosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({speed: nextProps.preferences.get("fixationsSpeed", 0)});
  }

  changeSpeed(e) {
    this.setState({speed: e});
  }

  saveSettings(e) {
    this.props.savePreferences("fixationsSpeed", e);
  }

  savePosition(index) {
    this.props.savePreferences("fixationIndex", index);
  }

  render() {
    return (
      <div className="fixations-with-slider">
        <div className="sliders">
          <div className="slider-title">Prędkość przełączania</div>
          <Slider
            min={0}
            max={12}
            step={1}
            handle={handle}
            value={this.state.speed}
            onChange={this.changeSpeed}
            onAfterChange={this.saveSettings}
            marks={marks}
          />
        </div>
        <Fixations
          text={this.props.text}
          fixationIndex={this.props.preferences.get("fixationIndex", 0)}
          speed={this.state.speed}
          savePosition={this.savePosition}
        />
      </div>
    );
  }
}

export default FixationsWithSliders;
