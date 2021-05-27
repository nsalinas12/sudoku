import React, { Component } from 'react';
import Switch from 'react-switch';
import "./Switch.css";

class EditNotesSwitch extends Component {

  render() { 
    return (
      <label className="Switch-row">
        <span className="Switch-text">Edit Cell Notes:</span>
        <Switch onChange={this.props.handleChange} checked={this.props.checked} />
      </label>
    );
  }
}
 
export default EditNotesSwitch;