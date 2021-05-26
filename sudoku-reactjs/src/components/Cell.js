import React, { Component } from 'react'
import "./Cell.css";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
    }
  }

  handleCellClick = () => {
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
    return (
      <div className={"Cell-container " + (this.props.locked ? "Cell-container-locked" : "")} onClick={this.handleCellClick}>
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