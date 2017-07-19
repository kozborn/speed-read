import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {instanceOf, func} from "prop-types";
import {Map} from "immutable";
import Table from "./Table";
import handle from "./common/SliderHandle";

class TableWithSliders extends React.Component {

  static propTypes = {
    preferences: instanceOf(Map).isRequired,
    savePreferences: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      cols: this.props.preferences.get("cols", 3),
      rows: this.props.preferences.get("rows", 3),
    };
    this.onChangeRows = this.onChangeRows.bind(this);
    this.onChangeCols = this.onChangeCols.bind(this);
  }

  onChangeRows(e) {
    this.setState({rows: e});
    this.props.savePreferences("shultzTable", {rows: e});
  }

  onChangeCols(e) {
    this.setState({cols: e});
    this.props.savePreferences("shultzTable", {cols: e});
  }

  render() {
    return (
      <div className="table-with-sliders">
        <h2>Schulz Tables</h2>
        <div className="sliders">
          Columns count
          <Slider
            min={3}
            max={15}
            step={2}
            handle={handle}
            onChange={this.onChangeCols}
          />
          Rows count
          <Slider
            min={3}
            max={15}
            step={2}
            handle={handle}
            onChange={this.onChangeRows}
          />
        </div>
        <Table cols={this.state.cols} rows={this.state.rows} />
      </div>
    )
  }
}

export default TableWithSliders;