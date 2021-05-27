import './App.css';
import Board from './components/Board';
import DifficultySelector from './components/DifficultySelector';
import EditNotesSwitch from './components/EditNotesSwitch.js';
import React, { Component } from 'react';
import nanobus from 'nanobus';
import ShowAllNotesSwitch from './components/ShowAllNotesSwitch';

export const NanoBus = nanobus();

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      level: "easy",
      selectedCell: undefined,
      editNotesMode: false,
      showAllNotes: false,
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

  handleEditNotes = () => {
    this.setState({ editNotesMode: !this.state.editNotesMode });
  }

  handleShowAllNotes = () => {
    this.setState({ showAllNotes: !this.state.showAllNotes });
  }

  render() { 
    return (
      <div className="App-container">
        <h1 className="App-title">Sudoku Board</h1>
        <div className="App-button-row">
          <DifficultySelector handleChange={this.handleDifficultyChange} />
        </div>
        <Board level={this.state.level} editNotesMode={this.state.editNotesMode} showAllNotes={this.state.showAllNotes} />
        <div className="App-footer">
          <EditNotesSwitch checked={this.state.editNotesMode} handleChange={this.handleEditNotes} />
          <ShowAllNotesSwitch checked={this.state.showAllNotes} handleChange={this.handleShowAllNotes} />
        </div>
      </div>
    );
  }
}
 
export default App;