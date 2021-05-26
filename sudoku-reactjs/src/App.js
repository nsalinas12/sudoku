import './App.css';
import Board from './components/Board';
import DifficultySelector from './components/DifficultySelector';
import React, { Component } from 'react';
import nanobus from 'nanobus';

export const NanoBus = nanobus();

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      level: "easy"
    };
  }

  handleDifficultyChange = (e) => {
    console.log('e', e.target.value);
    this.setState({ level: e.target.value });
  }

  render() { 
    return (
      <div className="App-container">
        <h1 className="App-title">Sudoku Board</h1>
        <DifficultySelector handleChange={this.handleDifficultyChange} />
        <Board level={this.state.level} />
      </div>
    );
  }
}
 
export default App;