import React from "react";
import {func, string, shape, bool} from "prop-types";

const buttonShapeProp = shape({
  cb: func.isRequired,
  label: string.isRequired,
  disabled: bool.isRequired,
});

export default class extends React.Component {

  static propTypes = {
    startBtn: buttonShapeProp.isRequired,
    stopBtn: buttonShapeProp.isRequired,
  }

  render() {
    const {startBtn, stopBtn} = this.props;

    return (
      <div className="fixations-toolbar">
        <div className="pull-left">
          <button className="btn btn-sm btn-default" onClick={startBtn.cb} disabled={startBtn.disabled}>
            {startBtn.label}
          </button>
          <button className="btn btn-sm btn-warning" onClick={stopBtn.cb} disabled={stopBtn.disabled}>
            {stopBtn.label}
          </button>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
