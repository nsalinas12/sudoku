import React, { Component } from 'react';
import './ProgressBar.css'

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div className="ProgressBar-container">
        <div className="ProgressBar-item">1</div>
        <div className="ProgressBar-item">2</div>
        <div className="ProgressBar-item">3</div>
        <div className="ProgressBar-item">4</div>
        <div className="ProgressBar-item">5</div>
        <div className="ProgressBar-item">6</div>
        <div className="ProgressBar-item">7</div>
        <div className="ProgressBar-item">8</div>
        <div className="ProgressBar-item">9</div>
      </div>
    );
  }
}
 
export default ProgressBar;