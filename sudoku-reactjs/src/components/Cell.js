import React, { Component } from 'react'
import "./Cell.css";
import { NanoBus } from '../App.js';
import NoteInput from './NoteInput.js';
import NumberInput from './NumberInput.js';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      highlightCell: false,
      isFocus: false,
    }
  }

  componentDidMount(){
    NanoBus.on("cell-click", (data) => {
      //1. Set focus of current selected cell
      const { col, row } = data;
      if( col.toString() === this.props.colIndex.toString() && row.toString() === this.props.rowIndex.toString() ){
        this.setState({ isFocus: true });
      } else if ( this.state.isFocus ){
        this.setState({ isFocus: false });
      }

      //2. Highlight all other matching cells
      if( this.props.value > 0 && this.props.value.toString() === data.value.toString()) {
        this.setState({ highlightCell: true });
      } else if( this.state.highlightCell ) {
        this.setState({ highlightCell: false });
      }
    });
  }

  handleCellClick = () => {
    NanoBus.emit("cell-click", {
      value: this.props.value,
      row: this.props.rowIndex,
      col: this.props.colIndex
    });
  }

  handleInputChange = (e) =>  {
    const { rowIndex, colIndex } = this.props;
    let newCellValue = e.target.value;
    this.props.handleCellChange(rowIndex, colIndex, newCellValue);
  }

  render() {

    const { showAllNotes, editNotesMode, locked } = this.props;
    const cellClassnames = "Cell-container " + 
      (locked ? "Cell-container-locked " : "") + 
      (this.state.isFocus ? "Cell-container-focus " : "") + 
      (this.state.highlightCell ? "Cell-container-highlight " : "");

    if( locked ){
      return (
        <div className={cellClassnames} onClick={this.handleCellClick}>
          <div className="Cell-value">{this.props.value}</div>
        </div>
      );
    } else if ( !locked && this.props.value > 0 ){
      return (
        <div className={cellClassnames} onClick={this.handleCellClick}>
          <NumberInput handleInputChange={this.handleInputChange} value={this.props.value} />
        </div>
      );
    }

    return (
      <div className={cellClassnames} onClick={this.handleCellClick}>
        {showAllNotes 
          ? <NoteInput isFocus={this.state.isFocus} row={this.props.rowIndex} col={this.props.colIndex} notes={this.props.notes} editNotesMode={editNotesMode} handleNoteChange={this.props.handleNoteChange} /> 
          : <NumberInput handleInputChange={this.handleInputChange} value={this.props.value} /> }
      </div>
    );
  }
}
 
export default Cell;