import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../assets/App.css';
import Table from './Table'
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      cols: 3,
      rows: 3
    }
    this.onChangeRows = this.onChangeRows.bind(this)
    this.onChangeCols = this.onChangeCols.bind(this)
  }

  onChangeRows(e) {
    this.setState({rows: e})
  }

  onChangeCols(e) {
    this.setState({cols: e})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Schulz Tables</h2>
        </div>
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
        <footer />
      </div>
    );
  }
}

export default App;
