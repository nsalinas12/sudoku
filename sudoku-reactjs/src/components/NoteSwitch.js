import React, { Component } from 'react';
import Switch from 'react-switch';
import "./NoteSwitch.css";

class NoteSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }
  }

  render() { 
    return (
      <label className="NoteSwitch-row">
        <span className="NoteSwitch-text">Insert Notes:</span>
        <Switch onChange={this.props.handleSwitchChange} checked={this.props.noteMode} />
      </label>
    );
  }
}
 
export default NoteSwitch;