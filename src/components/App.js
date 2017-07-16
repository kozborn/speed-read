import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import queryString from "query-string";

import logo from "../assets/logo.svg";
import "../assets/App.css";
import HomePage from "./HomePage";
import BottomHalfText from "./BottomHalfText";
import TopHalfText from "./TopHalfText";
import TableWithSliders from "./TableWithSliders";
import FixationsWithSliders from "./FixationsWithSliders";
import UserText from "./forms/UserText";
import UrlParamsProvider from "../hoc/UrlProvider";

class App extends Component {

  render() {
    let queryParams = "";
    const parsed = queryString.parse(window.location.search);
    const documentId = parsed.documentId;
    if (documentId) {
      queryParams = `?documentId=${documentId}`;
    }

    return (
      <Router>
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
          <Route exact path="/" component={UrlParamsProvider(HomePage)} />
          <Route path="/fixations" component={UrlParamsProvider(FixationsWithSliders)} />
          <Route path="/top-half-text" component={UrlParamsProvider(TopHalfText)} />
          <Route path="/bottom-half-text" component={UrlParamsProvider(BottomHalfText)} />
          <Route path="/schultz-table" component={UrlParamsProvider(TableWithSliders)} />
          <Route path="/create-own-text" component={UrlParamsProvider(UserText)} />
          <footer />
        </div>
      </Router>
    );
  }
}

export default App;

