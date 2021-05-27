import './App.css';
import Board from './components/Board';
import DifficultySelector from './components/DifficultySelector';
import NoteSwitch from './components/NoteSwitch.js';
import React, { Component } from 'react';
import nanobus from 'nanobus';

export const NanoBus = nanobus();

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      level: "easy",
      selectedCell: undefined,
      noteMode: false,
    };
  }

  componentDidMount(){
    NanoBus.on("cell-click", data => {
      this.setState({ selectedCell: data });
    })
  }

  handleDifficultyChange = (e) => {
    console.log('e', e.target.value);
    this.setState({ level: e.target.value });
  }

  handleSwitchChange = () => {
    this.setState({ noteMode: !this.state.noteMode });
  }

  render() { 
    return (
      <div className="App-container">
        <h1 className="App-title">Sudoku Board</h1>
        <div className="App-button-row">
          <DifficultySelector handleChange={this.handleDifficultyChange} />
          <NoteSwitch noteMode={this.state.noteMode} handleSwitchChange={this.handleSwitchChange}/>
        </div>
        <Board level={this.state.level} noteMode={this.state.noteMode} />
        {JSON.stringify(this.state.selectedCell)}
      </div>
    );
  }
}
 
export default App;