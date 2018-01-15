import React from "react";
import Immutable from "immutable";
import { func, instanceOf } from "prop-types";
import FixationsBase from "./fixations/Fixations";
import HelpPortal from './common/HelpPortal';

import SpeedSlider from "./fixations/SpeedSlider"
import BlockSizeSlider from "./fixations/BlockSizeSlider"

class Fixations extends React.Component {

  static propTypes = {
    fixationsSettings: instanceOf(Immutable.Map).isRequired,
    savePreferences: func.isRequired,
    text: instanceOf(Immutable.Map).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      speed: props.fixationsSettings.get("speed", 0),
      blockSize: props.fixationsSettings.get('blockSize', 8),
      position: props.fixationsSettings.get('position', 0),
    };
    this.changeBlockSize = this.changeBlockSize.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.savePosition = this.savePosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ speed: nextProps.fixationsSettings.get("speed", 0) });
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
    const fixationsIndex = this.props.fixationsSettings.get('position', 0);
    return (
      <div className="fixations-with-slider">
        <h1 className="with-help">Fiksacje <HelpPortal helpKey="fixations" /></h1>
        <FixationsBase
          text={this.props.text}
          fixationIndex={fixationsIndex}
          speed={this.state.speed}
          blockSize={this.state.blockSize}
          savePosition={this.savePosition}
          changeSpeed={this.changeSpeed}
          afterChangeSpeed={this.saveSettings}
          changeBlockSize={this.changeBlockSize}
          afterChangeBlockSize={this.saveSettings}
        />
      </div>
    );
  }
}

export default Fixations;
