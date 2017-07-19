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
    createBtn: buttonShapeProp.isRequired,
  }

  render() {
    const {startBtn, stopBtn, createBtn} = this.props;

    return (
      <div className="fixations-toolbar">
        <div className="pull-left">
          <button onClick={startBtn.cb} disabled={startBtn.disabled}>{startBtn.label}</button>
          <button onClick={stopBtn.cb} disabled={stopBtn.disabled}>{stopBtn.label}</button>
        </div>
        <div className="pull-right">
          <button onClick={createBtn.cb} disabled={createBtn.disabled}>{createBtn.label}</button>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}
