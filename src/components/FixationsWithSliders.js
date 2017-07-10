import React from "react";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import Fixations from "./Fixations";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class FixationsWithSliders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: 1000,
    };

    this.changeSpeed = this.changeSpeed.bind(this);
  }

  changeSpeed(e) {
    this.setState({speed: e});
  }

  render() {
    return (
      <div>
        <div>
          <h3>Speed</h3>
          <Slider
            min={100}
            max={1000}
            step={50}
            invert={true}
            handle={handle}
            onChange={this.changeSpeed}
          />
        </div>
        <Fixations speed={this.state.speed} />
      </div>
    );
  }
}

export default FixationsWithSliders;
