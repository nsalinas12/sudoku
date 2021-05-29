import React, { Component } from 'react'
import "./Cell.css";
import { NanoBus } from '../App.js';
import CellInput from './CellInput.js';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      highlightCell: false,
    }
  }

  componentDidMount(){
    NanoBus.on("cell-click", (data) => {
      //Highlight all other matching cells
      if( this.props.value > 0 && this.props.value.toString() === data.value.toString()) {
        this.setState({ highlightCell: true });
      } else if( this.state.highlightCell ) {
        this.setState({ highlightCell: false });
      }
    });
  }

  handleCellClick = () => {
    this.props.onCellClick(this.props.id)
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

    const { editNotesMode, locked, focus, id } = this.props;
    const cellClassnames = "Cell-container " + 
      (locked ? "Cell-container-locked " : "") + 
      (focus === id ? "Cell-container-focus " : "") + 
      (this.state.highlightCell ? "Cell-container-highlight " : "");

    if( locked ){
      return (
        <div className={cellClassnames} onClick={this.handleCellClick}>
          <div className="Cell-value">{this.props.value}</div>
        </div>
      );
    } 

    return (
      <div className={cellClassnames} onClick={this.handleCellClick}>
        <CellInput 
          id={this.props.id}
          row={this.props.rowIndex} 
          col={this.props.colIndex} 
          focus={this.props.focus} 
          notes={this.props.notes} 
          editNotesMode={editNotesMode} 
          handleNoteChange={this.props.handleNoteChange} 
          value={this.props.value}
          handleInputChange={this.handleInputChange}  />
      </div>
    );
  }
}
 
export default Cell;