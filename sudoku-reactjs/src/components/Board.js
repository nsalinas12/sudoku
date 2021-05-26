import React, { Component } from 'react';
import Cell from "./Cell.js";
import "./Board.css";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[]],
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
        this.setState({ board: gameboard.board });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  handleCellChange = (rowIndex, colIndex, newValue) => {
    let currentBoard = this.state.board;
    let selectedRow = currentBoard[rowIndex];
    selectedRow[colIndex] = newValue
    currentBoard[rowIndex] = selectedRow;
    this.setState({ board: currentBoard });
  }

  render() { 


    const loadGrid = () => {

      let gridItems = this.state.board.map((row, rowIdx) => {
        let cellItems = row.map((cellValue, colIdx) => {
          return <Cell 
                    rowIndex={rowIdx}
                    colIndex={colIdx}
                    value={cellValue} 
                    key={"cell-" + rowIdx + "-" + colIdx} 
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