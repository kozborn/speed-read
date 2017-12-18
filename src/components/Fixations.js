import React from "react";
import Slider from "rc-slider";
import Immutable from "immutable";
import { func, instanceOf } from "prop-types";
import FixationsBase from "./fixations/Fixations";
import handle from "./common/SliderHandle";

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

class Fixations extends React.Component {

  static propTypes = {
    preferences: instanceOf(Immutable.Map).isRequired,
    savePreferences: func.isRequired,
    text: instanceOf(Immutable.Map).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      speed: props.preferences.getIn(['fixationsSettings', "fixationsSpeed"], 0),
    };

    this.changeSpeed = this.changeSpeed.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.savePosition = this.savePosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ speed: nextProps.preferences.getIn(['fixationsSettings', "fixationsSpeed"], 0) });
  }

  changeSpeed(speed) {
    this.setState({ speed });
  }

  saveSettings(speed) {
    this.props.savePreferences('fixationsSettings', {"fixationsSpeed": speed});
  }

  savePosition(index) {
    this.props.savePreferences('fixationsSettings', {"fixationsIndex": index});
  }

  render() {
    const fixationsIndex = this.props.preferences.getIn(['fixationsSettings', 'fixationsIndex'], 0);

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
        <FixationsBase
          text={this.props.text}
          fixationIndex={fixationsIndex}
          speed={this.state.speed}
          savePosition={this.savePosition}
        />
      </div>
    );
  }
}

export default Fixations;
