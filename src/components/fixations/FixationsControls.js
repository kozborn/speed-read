import React from 'react'
import { func, shape, string, bool } from 'prop-types'
import SpeedSlider from './SpeedSlider'
import BlockSizeSlider from './BlockSizeSlider'

const buttonShapeProp = shape({
  cb: func.isRequired,
  label: string.isRequired,
  disabled: bool.isRequired,
});

const FixationsControls = ({
  startBtn,
  stopBtn,
  speed,
  changeSpeed,
  afterChangeSpeed,
  blockSize,
  changeBlockSize,
  afterChangeBlockSize,
 }) => {
  return (
    <div className="fixations-controls">
      <div className="fixations-controls__butons">
        <button className="btn btn-sm btn-default" onClick={startBtn.cb} disabled={startBtn.disabled}>
          {startBtn.label}
        </button>
        <button className="btn btn-sm btn-warning" onClick={stopBtn.cb} disabled={stopBtn.disabled}>
          {stopBtn.label}
        </button>
      </div>
      <div className="sliders">
        <div className="sliders__slider">
          <div className="sliders__slider-title">Prędkość przełączania</div>
          <SpeedSlider
            value={speed}
            onChange={changeSpeed}
            onAfterChange={afterChangeSpeed}
          />
        </div>
        <div className="sliders__slider">
          <div className="sliders__slider-title">Maksymalny rozmiar bloku</div>
          <BlockSizeSlider
            value={blockSize}
            onChange={changeBlockSize}
            onAfterChange={afterChangeBlockSize}
          />
        </div>
      </div>
    </div>
  )
}

FixationsControls.propTypes = {
  startBtn: buttonShapeProp.isRequired,
  stopBtn: buttonShapeProp.isRequired,
}

export default FixationsControls;
