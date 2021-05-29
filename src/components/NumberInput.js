import React, { Component } from 'react'
import './Cell.css';

class NumberInput extends Component {
  render() { 
    return (
      <input 
        autoFocus
        className="Cell-input" 
        minLength={0}
        maxLength={1}
        onChange={this.props.handleInputChange}
        type="text" 
        value={this.props.value === 0 ? "" : this.props.value} 
      ></input>
    );
  }
}
 
export default NumberInput;