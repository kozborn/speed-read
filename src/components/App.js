import React, { Component } from "react";
import {
  Link,
} from "react-router-dom";
import queryString from "query-string";
import logo from "../assets/logo.svg";
import "../assets/App.css";

class App extends Component {

  render() {
    let queryParams = "";
    const parsed = queryString.parse(window.location.search);
    const documentId = parsed.documentId;
    if (documentId) {
      queryParams = `?documentId=${documentId}`;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav className="navigation-top">
            <li><Link to="/">Home page</Link></li>
            <li><Link to={`/bottom-half-text${queryParams}`}>Bottom half text</Link></li>
            <li><Link to={`/top-half-text${queryParams}`}>Top half text</Link></li>
            <li><Link to={`/schultz-table${queryParams}`}>Schultz table</Link></li>
            <li><Link to={`/fixations${queryParams}`}>Fixations</Link></li>
            <li><Link to={`/create-own-text${queryParams}`}>Add Text</Link></li>
          </nav>
        </div>
        {this.props.children}
        <footer />
      </div>
    );
  }
}
export default App;
