import React, { Component } from "react";
import {
  Link,
} from "react-router-dom";
import {string, func} from "prop-types";
import logo from "../assets/logo.svg";

class App extends Component {

  static propTypes = {
    docId: string,
    clearLocalStorage: func.isRequired,
  }

  render() {
    let queryParams = "";

    const docId = this.props.docId ? this.props.docId : localStorage.getItem("docId");
    if (docId) {
      queryParams = `?documentId=${docId}`;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav className="navigation-top">
            <li><Link to="/">Home page</Link></li>
            <li><Link to={`/bottom-half-text${queryParams}`}>Dolna połowa tekstu</Link></li>
            <li><Link to={`/top-half-text${queryParams}`}>Górna połowa tekstu</Link></li>
            <li><Link to={`/schultz-table${queryParams}`}>Tabela Schultz'a</Link></li>
            <li><Link to={`/fixations${queryParams}`}>Fiksacja</Link></li>
            <li><Link to={`/user-texts${queryParams}`}>Twoje teksty</Link></li>
            {
              localStorage.getItem("docId") ?
                <li className="pull-right"><button onClick={this.props.clearLocalStorage}>Wyczyść dane</button></li>
              : null
            }
          </nav>
          <div className="clearfix" />
        </div>
        {this.props.children}
        <footer />
      </div>
    );
  }
}
export default App;
