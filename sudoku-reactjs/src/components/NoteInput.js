import React, { Component } from 'react';
import "./NoteInput.css";

class NoteInput extends Component {

  constructor(props){
    super(props);
  }

  // componentWillMount deprecated in React 16.3
  componentDidMount(){
    document.addEventListener("keydown", this.handleNoteChange);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleNoteChange);
  }

  handleNoteChange = (e) => {
    let toggledValue = e.key;
    let isNumber = !isNaN(parseInt(e.key));
    const {row, col} = this.props;
    if( isNumber ){
      this.props.handleNoteChange(row, col, toggledValue)
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