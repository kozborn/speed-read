import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../assets/App.css';

import BottomHalfText from "./BottomHalfText"
import TopHalfText from "./TopHalfText"
import TableWithSliders from "./TableWithSliders"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <TopHalfText />
        <BottomHalfText />
        <TableWithSliders />

        <footer />
      </div>
    );
  }
}

export default App;
