import React from "react";
import Slider from "rc-slider";
import Immutable from "immutable";
import { func, instanceOf } from "prop-types";
import FixationsBase from "./fixations/Fixations";
import handle from "./common/SliderHandle";

const speedMarks = {
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

const sizeMarks = {
  0: 10,
  1: 15,
  2: 20,
  3: 25,
  4: 30,
  5: 35,
  6: 40,
  7: 45,
  8: 50,
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
      speed: props.preferences.getIn(['fixationsSettings', "speed"], 0),
      blockSize: props.preferences.getIn(['fixationsSettings', 'blockSize'], 8),
      position: props.preferences.getIn(['fixationsSettings', 'position'], 0),
    };
    this.changeBlockSize = this.changeBlockSize.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.savePosition = this.savePosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ speed: nextProps.preferences.getIn(['fixationsSettings', "speed"], 0) });
  }

  changeSpeed(speed) {
    this.setState({ speed });
  }

  changeBlockSize(blockSize) {
    this.setState({ blockSize });
  }

  saveSettings() {
    this.props.savePreferences('fixationsSettings', {
      "speed": this.state.speed,
      "blockSize": this.state.blockSize,
      "position": this.state.position,
    });
  }

  savePosition(position) {
    this.setState({ position }, this.saveSettings);
  }

  render() {
    const fixationsIndex = this.props.preferences.getIn(['fixationsSettings', 'position'], 0);
    const blockSize = (this.state.blockSize * 5) + 10;
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
            marks={speedMarks}
          />
        </div>
        <div className="sliders">
          <div className="slider-title">Maksymalny rozmiar bloku</div>
          <Slider
            min={0}
            max={8}
            step={1}
            handle={handle}
            value={this.state.blockSize}
            onChange={this.changeBlockSize}
            onAfterChange={this.saveSettings}
            marks={sizeMarks}
          />
        </div>
        <FixationsBase
          text={this.props.text}
          fixationIndex={fixationsIndex}
          speed={this.state.speed}
          blockSize={blockSize}
          savePosition={this.savePosition}
        />
      </div>
    );
  }
}

export default Fixations;
