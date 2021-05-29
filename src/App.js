import './App.css';
import Board from './components/Board';
import DifficultySelector from './components/DifficultySelector';
import EditNotesSwitch from './components/EditNotesSwitch.js';
import React, { Component } from 'react';
import nanobus from 'nanobus';
import ProgressBar from './components/ProgressBar.js';

export const NanoBus = nanobus();

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      level: "easy",
      selectedCell: undefined,
      editNotesMode: false,
    };
  }

  componentDidMount(){

    document.addEventListener("keydown", (e) => {
      if(e.key === "Shift"){
        this.setState({ editNotesMode: !this.state.editNotesMode });
      }
    })

    NanoBus.on("cell-click", data => {
      this.setState({ selectedCell: data });
    });
  }

  handleDifficultyChange = (e) => {
    this.setState({ level: e.target.value });
  }

  handleEditNotes = () => {
    this.setState({ editNotesMode: !this.state.editNotesMode });
  }

  render() { 
    return (
      <div className="App-container">
        <h1 className="App-title">Sudoku Board</h1>
        <div className="App-button-row">
          <DifficultySelector handleChange={this.handleDifficultyChange} />
          <EditNotesSwitch checked={this.state.editNotesMode} handleChange={this.handleEditNotes} />
        </div>
        <Board level={this.state.level} editNotesMode={this.state.editNotesMode} />
        <ProgressBar />
      </div>
    );
  }
}
 
export default App;