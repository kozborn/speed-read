import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../assets/App.css';
import Table from './Table'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Schulz Tables</h2>
        </div>
        <Table />
      </div>
    );
  }
}

export default App;
