import React, { Component } from 'react'
import "./Cell.css";
import { NanoBus } from '../App.js';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      highlightCell: false,
    }
  }

  componentDidMount(){
    NanoBus.on("cell-click", (data) => {
      if( this.props.value > 0 && this.props.value === data.value) {
        this.setState({ highlightCell: true });
      } else if( this.state.highlightCell ) {
        this.setState({ highlightCell: false });
      }
    });
  }

  handleCellClick = () => {

    NanoBus.emit("cell-click", {
      value: this.props.value
    });

    if( this.props.value === 0 ){
      this.setState({ isEditable: true });
    }
  }

  handleInputChange = (e) =>  {
    const { rowIndex, colIndex } = this.props;
    let newCellValue = e.target.value;
    this.props.handleCellChange(rowIndex, colIndex, newCellValue);
  }

  render() {

    const cellClassnames = "Cell-container " + 
      (this.props.locked ? "Cell-container-locked " : "") + 
      (this.state.highlightCell ? "Cell-container-highlight " : "");

    return (
      <div className={cellClassnames} onClick={this.handleCellClick}>
        {this.state.isEditable
          ? <input 
              autoFocus
              className="Cell-input" 
              minLength={0}
              maxLength={1}
              onChange={this.handleInputChange}
              type="text" 
              value={this.props.value === 0 ? "" : this.props.value} 
            ></input>
          : <div className="Cell-value">{this.props.value === 0 ? "" : this.props.value}</div>
        }
      </div>
    );
  }
}
 
export default Cell;