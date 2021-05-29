import React, { Component } from 'react';
import "./NoteInput.css";

class NoteInput extends Component {

  componentDidMount(){
    if( this.props.focus ){
      document.addEventListener("keydown", this.handleNoteChange);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleNoteChange);
  }

  handleNoteChange = (e) => {

    if(this.props.cellID === this.props.focus){
      let toggledValue = e.key;
      let isNumber = !isNaN(parseInt(e.key));
      const {row, col} = this.props;
      if( isNumber ){
        this.props.handleNoteChange(row, col, toggledValue)
      }
    }
  }

  render() { 

    let noteElements = Array.apply(null, Array(9)).map((_, idx) => {
      let val = idx + 1;
      if( this.props.notes.has(val.toString()) ){
        return <div key={val} className="NoteInput-circle NoteInput-circle-filled">{val.toString()}</div>
      } else {
        return <div key={val} className="NoteInput-circle">{val.toString()}</div>
      }
    });

    return (
      <div className="NoteInput-container" onKeyDown={this.handleNoteChange}>
        {noteElements}
      </div>
    );
  }
}
 
export default NoteInput;