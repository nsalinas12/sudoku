import React, { Component } from 'react'

class DifficultySelector extends Component {
  
  render() { 
    return (
      <select onChange={this.props.handleChange}>
        <option value={"easy"}>Easy</option>
        <option value={"medium"}>Medium</option>
        <option value={"hard"}>Hard</option>
      </select>
    );
  }
}
 
export default DifficultySelector;