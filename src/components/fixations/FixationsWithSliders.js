import React from "react";
import Slider from "rc-slider";
import {string, func} from "prop-types";
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
    saveText: func.isRequired,
    fixationText: string.isRequired,
  }

  static defaultProps = {
    docId: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      speed: 1000,
    };

    this.changeSpeed = this.changeSpeed.bind(this);
    this.saveText = this.saveText.bind(this);
  }

  componentWillMount() {
    this.props.getDoc(this.props.docId);
  }

  saveText(text) {
    this.props.saveText("fixations", text);
  }

  changeSpeed(e) {
    this.setState({speed: (1000 - (e * 75))});
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
            onChange={this.changeSpeed}
            marks={marks}
          />
        </div>
        <FixationsWithCreateBtn
          fixationText={this.props.fixationText}
          speed={this.state.speed}
          saveText={this.saveText}
        />
      </div>
    );
  }
}

export default FixationsWithSliders;
