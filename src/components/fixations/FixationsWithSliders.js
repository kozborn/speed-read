import React from "react";
import Slider from "rc-slider";
import {Map} from "immutable";
import {string, func, instanceOf} from "prop-types";
import FixationsWithCreateBtn from "./FixationsWithCreateBtn";
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
    getDoc: func.isRequired,
    docId: string,
    preferences: instanceOf(Map).isRequired,
    saveText: func.isRequired,
    savePreferences: func.isRequired,
    fixation: instanceOf(Map).isRequired,
  }

  static defaultProps = {
    docId: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      speed: this.props.preferences.get("fixationsSpeed", 0),
    };

    this.changeSpeed = this.changeSpeed.bind(this);
    this.saveText = this.saveText.bind(this);
  }

  componentWillMount() {
    this.props.getDoc(this.props.docId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({speed: nextProps.preferences.get("fixationsSpeed")});
  }

  saveText(data) {
    this.props.saveText(this.props.docId, "fixations", data);
  }

  changeSpeed(e) {
    this.setState({speed: e});
    this.props.savePreferences(this.props.docId, "fixationsSpeed", e);
  }

  render() {
    return (
      <div className="fixations-with-slider">
        <div className="sliders">
          <h3>Prędkość przełączania</h3>
          <Slider
            min={0}
            max={12}
            step={1}
            handle={handle}
            value={this.state.speed}
            onChange={this.changeSpeed}
            marks={marks}
          />
        </div>
        <FixationsWithCreateBtn
          fixation={this.props.fixation}
          speed={this.state.speed}
          saveText={this.saveText}
        />
      </div>
    );
  }
}

export default FixationsWithSliders;
