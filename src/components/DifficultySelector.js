import React, { Component } from 'react'
import "./DifficultySelector.css";

class DifficultySelector extends Component {
  
  render() { 
    return (
      <div className="DifficultySelector-container">
        <p className="DifficultySelector-title">Select Game Difficulty: </p>
        <select onChange={this.props.handleChange}>
          <option value={"easy"}>Easy</option>
          <option value={"medium"}>Medium</option>
          <option value={"hard"}>Hard</option>
        </select>
      </div>
    );
  }
}
 
export default DifficultySelector;