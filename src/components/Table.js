import React from 'react';
import {number} from "prop-types";

class Table extends React.Component {

  static propTypes = {
    cols: number,
    rows: number
  }

  static defaultProps = {
    cols: 5,
    rows: 5
  }

  buildTable() {
    const {cols, rows} = this.props;

    const rowsMiddle = Math.floor(rows / 2);
    const colsMiddle = Math.floor(cols / 2)

    const rowsElements = []
    for(let r = 0; r < rows; r++) {
      let index = r + 1;
      const colsElements = [];
      const rowKey = `row-${r}`;

      for(let c = 0; c < cols; c++){
        index += 1;
        const cellKey = `${rowKey}-cell-${c}`

        const cellContent = r == rowsMiddle && c == colsMiddle ?
          <span className="red">{String.fromCharCode(9679)}</span> : index;

        const cell = <div className="cell" key={cellKey}>{cellContent}</div>;
        colsElements.push(cell);
      }

      const el = <div className="row" key={rowKey}>{colsElements}</div>;
      rowsElements.push(el);
    }
    return rowsElements;
  }

  render() {
    return (<div className="table">
      {this.buildTable()}
    </div>)
  }
}

export default Table;
