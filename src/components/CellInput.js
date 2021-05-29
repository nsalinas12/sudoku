import React, { Component } from 'react';
import NoteInput from './NoteInput.js';

class CellInput extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    const { id, focus, editNotesMode } = this.props;

    if( (id === focus && editNotesMode) || (this.props.value === 0 && editNotesMode) || (this.props.notes.size !== 0) ){
      return <NoteInput id={id} focus={focus} {...this.props} />;
    }

    return (
      <input 
        className="Cell-input" 
        onChange={this.props.handleInputChange}
        type="text" 
        value={this.props.value === 0 ? "" : this.props.value} 
      ></input>
    );
  }
}
 
export default CellInput;