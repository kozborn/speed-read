import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import logo from "../assets/logo.svg";
import "../assets/App.css";
import HomePage from "./HomePage";
import BottomHalfText from "./BottomHalfText";
import TopHalfText from "./TopHalfText";
import TableWithSliders from "./TableWithSliders";
import FixationsWithSliders from "./FixationsWithSliders";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <nav className="navigation-top">
              <li><Link to="/">Home page</Link></li>
              <li><Link to="/bottom-half-text">Bottom half text</Link></li>
              <li><Link to="/top-half-text">Top half text</Link></li>
              <li><Link to="/schultz-table">Schultz table</Link></li>
              <li><Link to="/fixations">Fixations</Link></li>
            </nav>
          </div>
          <Route exact path="/" component={HomePage} />
          <Route path="/fixations" component={FixationsWithSliders} />
          <Route path="/top-half-text" component={TopHalfText} />
          <Route path="/bottom-half-text" component={BottomHalfText} />
          <Route path="/schultz-table" component={TableWithSliders} />
          <footer />
        </div>
      </Router>
    );
  }
}

export default App;

