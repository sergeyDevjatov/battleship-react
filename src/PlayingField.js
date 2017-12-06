import React, { Component } from 'react';

import './PlayingField.css';


class PlayingField extends Component {
  constructor(props) {
    super(props);
    this.state = {closedCells: {}};
  }

  render() {
    let rows = new Array(this.props.height)
        .fill()
        .map((_, index) => this.renderRow(index));

    return (
        <div className="PlayingField">
          <table>
            <tbody>
            {rows}
            </tbody>
          </table>
        </div>
    );
  }

  renderRow (rowIndex) {
    let self = this;
    let cells = new Array(this.props.width)
        .fill()
        .map(function renderCell(_, index){
          return (
              <td key={'cell-' + index} onClick={() => self.check(rowIndex, index)}>
                {self.checked(rowIndex, index)
                    ? 'x'
                    : '\u00A0'}
              </td>
          );
        });
    return (
        <tr key={'row-' + rowIndex}>
          {cells}
        </tr>
    );
  }

  checked(row, column){
    return this.state.closedCells[[row, column]] || false;
  }

  check(row, column){
    this.setState({
      closedCells: {
          ...this.state.closedCells,
        [[row, column]]: !this.state.closedCells[[row, column]]
      }
    });
  }
}

export default PlayingField;
