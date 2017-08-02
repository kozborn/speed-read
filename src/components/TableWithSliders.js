import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {instanceOf, func, string} from "prop-types";
import {Map} from "immutable";
import Table from "./Table";
import handle from "./common/SliderHandle";

const marks = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
};

class TableWithSliders extends React.Component {

  static propTypes = {
    docId: string.isRequired,
    getDoc: func.isRequired,
    preferences: instanceOf(Map).isRequired,
    savePreferences: func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      cols: this.props.preferences.getIn(["schultzTable", "cols"], 2),
      rows: this.props.preferences.getIn(["schultzTable", "rows"], 2),
    };
    this.onChangeRows = this.onChangeRows.bind(this);
    this.onChangeCols = this.onChangeCols.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  componentWillMount() {
    this.props.getDoc(this.props.docId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cols: nextProps.preferences.getIn(["schultzTable", "cols"]),
      rows: nextProps.preferences.getIn(["schultzTable", "rows"]),
    });
  }

  componentWillUnmount() {
    console.log("Unmount");
  }

  onChangeRows(e) {
    this.setState({rows: e});
  }

  onChangeCols(e) {
    this.setState({cols: e});
    // this.props.savePreferences(this.props.docId, "schultzTable", {cols: e});
  }

  saveSettings() {
    console.log('saving');
    this.props.savePreferences(this.props.docId, "schultzTable", {
      rows: this.state.rows,
      cols: this.state.cols,
    });
  }

  render() {
    return (
      <div className="table-with-sliders">
        <h2>Schulz Tables</h2>
        <div className="sliders">
          <div className="slider">
            <div className="slider-title">Liczba kolumn</div>
            <Slider
              min={2}
              max={10}
              step={1}
              handle={handle}
              value={this.state.cols}
              marks={marks}
              onChange={this.onChangeCols}
              onAfterChange={this.saveSettings}
            />
          </div>
          <div className="slider">
            <div className="slider-title">Liczba wierszy</div>
            <Slider
              min={2}
              max={10}
              step={1}
              handle={handle}
              marks={marks}
              value={this.state.rows}
              onChange={this.onChangeRows}
              onAfterChange={this.saveSettings}
            />
          </div>
        </div>
        <Table cols={this.state.cols} rows={this.state.rows} />
      </div>
    );
  }
}

export default TableWithSliders;
