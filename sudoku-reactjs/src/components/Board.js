import React, { Component } from 'react';
import Cell from "./Cell.js";
import "./Board.css";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    }
  }

  componentDidMount(){
    this.fetchGameBoard();
  }

  componentDidUpdate(prevProps){
    if( prevProps.level !== this.props.level ){
      this.fetchGameBoard();
    }
  }

  fetchGameBoard = () => {
    let gameURL = "https://sugoku.herokuapp.com/board?difficulty=" + this.props.level;
    fetch(gameURL)
      .then((res) => res.json())
      .then((gameboard) => {

        let boardData = gameboard.board;
        let updatedGameboard = boardData.map((row, rowIndex) => {
          return row.map((cellValue, colIndex) => {
            return { row: rowIndex, col: colIndex, value: cellValue, locked: cellValue !== 0}
          });
        });
        this.setState({ board: updatedGameboard });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  handleCellChange = (rowIndex, colIndex, newValue) => {
    let currentBoard = this.state.board;
    let selectedRow = currentBoard[rowIndex];
    let currentCellData = selectedRow[colIndex];
    let updatedCellData = {...currentCellData, value: newValue};
    selectedRow[colIndex] = updatedCellData
    currentBoard[rowIndex] = selectedRow;
    this.setState({ board: currentBoard });
  }

  render() { 
    const loadGrid = () => {
      let gridItems = this.state.board.map((row, rowIdx) => {
        let cellItems = row.map((cellData) => {
          const { row, col, value, locked } = cellData;
          return <Cell 
                    rowIndex={row}
                    colIndex={col}
                    locked={locked}
                    value={value} 
                    key={"cell-" + row + "-" + col} 
                    handleCellChange={this.handleCellChange} 
                    />
        });
        return <div className="Board-row" key={"row-" + rowIdx}>{cellItems}</div>
      });
      return <div className="Board-container">{gridItems}</div>
    }



    let gridBoard = loadGrid();

    return (
      <div>{gridBoard}</div>
    );
  }
}
 
export default Board;