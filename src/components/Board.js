import React, { Component } from 'react';
import Cell from "./Cell.js";
import "./Board.css";
import { NanoBus } from '../App.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      focus: undefined,
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

  updateFocus = (cellID) => {
    this.setState({ focus: cellID });
  }

  fetchGameBoard = () => {
    let gameURL = "https://sugoku.herokuapp.com/board?difficulty=" + this.props.level;
    fetch(gameURL)
      .then((res) => res.json())
      .then((gameboard) => {
        let boardData = gameboard.board;
        let updatedGameboard = boardData.map((row, rowIndex) => {
          return row.map((cellValue, colIndex) => {
            return { row: rowIndex, col: colIndex, value: cellValue, locked: cellValue !== 0, notes: new Set()}
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
    let updatedValue = 0;
    if( currentCellData["value"] === 0 ){
      updatedValue = newValue;
    } else {
      updatedValue = newValue.toString().slice(-1);
    }

    NanoBus.emit("cell-click", {
      value: updatedValue,
      row: rowIndex,
      col: colIndex
    });

    let updatedCellData = {...currentCellData, value: updatedValue };
    selectedRow[colIndex] = updatedCellData
    currentBoard[rowIndex] = selectedRow;
    this.setState({ board: currentBoard });
  }

  handleNoteChange = (rowIndex, colIndex, newValue ) => {
    let currentBoard = this.state.board;
    let selectedRow = currentBoard[rowIndex];
    let currentCellData = selectedRow[colIndex];
    let currentNoteData = currentCellData["notes"];
    if( currentNoteData.has(newValue.toString()) ){
      currentNoteData.delete(newValue.toString())
    } else {
      currentNoteData.add(newValue.toString());
    }

    currentCellData["notes"] = currentNoteData;
    selectedRow[colIndex] = currentCellData;
    currentBoard[rowIndex] = selectedRow;
    this.setState({ board: currentBoard });
  }

  render() { 

    const loadGrid = () => {
      let gridItems = this.state.board.map((row, rowIdx) => {
        let cellItems = row.map((cellData) => {
          const { row, col, value, locked, notes } = cellData;
          return <Cell 
                    notes={notes}
                    rowIndex={row}
                    colIndex={col}
                    locked={locked}
                    value={value} 
                    key={"cell-" + row + "-" + col} 
                    id={"cell-" + row + "-" + col} 
                    focus={this.state.focus}
                    onCellClick={this.updateFocus}
                    handleCellChange={this.handleCellChange} 
                    handleNoteChange={this.handleNoteChange}
                    editNotesMode={this.props.editNotesMode}
                    showAllNotes={this.props.showAllNotes}
                    />
        });
        return <div className="Board-row" key={"row-" + rowIdx}>{cellItems}</div>
      });
      return <div className="Board-container">{gridItems}</div>
    }
    let gridBoard = loadGrid();
    return (
      <>
        <div className="Board-grid">{gridBoard}</div>
      </>
    );
  }
}
 
export default Board;