import React from 'react';
import {number} from "prop-types";
import {generateTable} from "../utils/helpers"

class Table extends React.Component {

  static propTypes = {
    cols: number,
    rows: number
  }

  static defaultProps = {
    cols: 3,
    rows: 3
  }

  timeInterval = null
  elapsedTime = 0

  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      elapsedTime: null,
      timerRunning: false,
      selected: [0],
      currentTable: [],
      nextExpected: 1,
      correct: null,
      finished: false,
    }
    this.onClick = this.onClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
    this.handleNextElement = this.handleNextElement.bind(this);
  }

  componentDidMount() {
    this.resetComponent(this.props.rows, this.props.cols)
  }

  resetComponent(rows, cols) {
    this.elapsedTime = null
    this.setState({
      timerRunning: false,
      finished: false,
      startTime: null,
      elapsedTime: null,
      selected: [0],
      nextExpected: 1,
      currentTable: this.buildTable(rows, cols)
    });
    clearInterval(this.timeInterval);
  }

  componentWillReceiveProps(nextProps) {
    const {cols, rows} = this.props;
    if (cols !== nextProps.cols || rows !== nextProps.rows){
      this.resetComponent(nextProps.rows, nextProps.cols)
    }
  }

  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  }

  onClick(e) {
    if (this.state.timerRunning === false){
      this.setState({startTime: Date.now() - this.elapsedTime})
      this.startTimer()
    }

    const currentNumber = e.target.getAttribute('data-number')
    const {cols, rows} = this.props;
    const selected = this.state.selected;
    if (parseInt(currentNumber, 10) === parseInt(this.state.nextExpected, 10)) {
      if(parseInt(currentNumber, 10) === (cols * rows) - 1) {
        this.stopTimer(e);
        this.setState({finished: true})
        alert("All done!!!")
      }
      selected.push(currentNumber)
      this.setState({selected, nextExpected: this.state.nextExpected + 1})
      this.handleNextElement(e.target, true)
    } else {
      this.handleNextElement(e.target, false)
    }
  }

  handleNextElement(el, correct) {
    this.setState({correct})
    el.classList.add(correct ? 'correct' : 'incorrect')
    setTimeout(() => {
      this.setState({correct: null})
      el.classList.remove(correct ? "correct" : "incorrect")
    }, 1000);
  }

  buildTable(rows, cols) {
    const rowsMiddle = Math.floor(rows / 2);
    const colsMiddle = Math.floor(cols / 2)
    const table = generateTable((cols * rows) - 1) // -1 because center is red dot
    const rowsElements = []
    let index = 0;
    let cellContent = null;
    for(let r = 0; r < rows; r++) {
      const colsElements = [];
      const rowKey = `row-${r}`;

      for(let c = 0; c < cols; c++){
        const cellKey = `${rowKey}-cell-${c}`
        const number = table[index]

        if (r === rowsMiddle && c === colsMiddle){
          cellContent = <span className="red" onClick={this.stopTimer}>{String.fromCharCode(9679)}</span>
        } else {
          cellContent = number;
          index++;
        }

        const cell = (<div
          className="cell"
          key={cellKey}
          data-number={number}
          onClick={this.onClick}
          >
            {cellContent}
          </div>);
        colsElements.push(cell);
      }

      const el = <div className="row" key={rowKey}>{colsElements}</div>;
      rowsElements.push(el);
    }
    return rowsElements;
  }

  startTimer() {
    this.setState({timerRunning: true})
    this.timeInterval = setInterval(() => {
      this.elapsedTime = Date.now() - this.state.startTime;
      document.getElementById("timer").innerHTML = (this.elapsedTime / 1000).toFixed(1);
    }, 100);
  }

  stopTimer(e) {
    e.stopPropagation()
    clearInterval(this.timeInterval);
    this.setState({timerRunning: false, elapsedTime: this.elapsedTime})
  }

  informationElement() {
    let text = "";
    if (this.state.correct === true)
      text = "correct"
    else if (this.state.correct === false)
      text = "incorrect"
    else
      text = " "
    return text;
  }

  render() {
    return (<div>
      <h1 id="timer" />
      {this.state.finished === false ?
        <h3>Next expected: {this.state.nextExpected} <span>{this.informationElement()}</span></h3>
      : null }
      <div className="table">
        {this.state.currentTable}
      </div>
    </div>)
  }
}

export default Table;
