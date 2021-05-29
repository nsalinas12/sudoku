import React, { Component } from 'react';

class CellInput extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    return (
        <input 
          className="Cell-input" 
          onChange={this.props.handleInputChange}
          type="text" 
          value={this.props.value === 0 ? "" : this.props.value} 
        ></input>
    );
  }
}
 
export default CellInput;