import React from 'react'
import { number, func } from 'prop-types'
import Slider from "rc-slider";
import handle from "../common/SliderHandle";

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

const SpeedSlider = ({
  value,
  onChange,
  onAfterChange,
}) => {
  return (
    <Slider
      min={0}
      max={12}
      step={1}
      handle={handle}
      value={value}
      onChange={onChange}
      onAfterChange={onAfterChange}
      marks={speedMarks}
    />
  )
}

SpeedSlider.propTypes = {
  value: number.isRequired,
  onChange: func.isRequired,
  onAfterChange: func.isRequired,
}


export default SpeedSlider
