import React from 'react'
import { number, func } from 'prop-types'
import Slider from "rc-slider";
import handle from "../common/SliderHandle";

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

const BlockSizeSlider = ({
  value,
  onChange,
  onAfterChange,
}) => {
  return (
    <Slider
      min={0}
      max={8}
      step={1}
      handle={handle}
      value={value}
      onChange={onChange}
      onAfterChange={onAfterChange}
      marks={sizeMarks}
    />
  )
}

BlockSizeSlider.propTypes = {
  value: number.isRequired,
  onChange: func.isRequired,
  onAfterChange: func.isRequired,
}

export default BlockSizeSlider
