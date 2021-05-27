import React, { Component } from 'react'
import "./Cell.css";
import { NanoBus } from '../App.js';
import NoteInput from './NoteInput.js';

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

    console.log('here clicked cell', this.props);

    NanoBus.emit("cell-click", {
      value: this.props.value,
      row: this.props.rowIndex,
      col: this.props.colIndex
    });

    // if( !this.props.locked ){
      this.setState({ showInput: !this.state.showInput });
    // }
  }

  handleInputChange = (e) =>  {
    const { rowIndex, colIndex } = this.props;
    let newCellValue = e.target.value;
    this.props.handleCellChange(rowIndex, colIndex, newCellValue);
  }

  render() {

    const cellClassnames = "Cell-container " + 
      (this.props.locked ? "Cell-container-locked " : "") + 
      (this.state.highlightCell ? "Cell-container-highlight " : "");

    return (
      <div className={cellClassnames} onClick={this.handleCellClick}>
        {this.state.showInput
          ? ( !this.props.noteMode 
              ? <input 
                  autoFocus
                  className="Cell-input" 
                  minLength={0}
                  maxLength={1}
                  onChange={this.handleInputChange}
                  type="text" 
                  value={this.props.value === 0 ? "" : this.props.value} 
                ></input>
              : <NoteInput row={this.props.rowIndex} col={this.props.colIndex} notes={this.props.notes} handleNoteChange={this.props.handleNoteChange} /> )
          : <div className="Cell-value">{this.props.value === 0 ? "" : this.props.value}</div>
        }
      </div>
    );
  }
}
 
export default Cell;