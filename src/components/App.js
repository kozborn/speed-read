import React, { Component } from "react";
import {
  Link,
} from "react-router-dom";
import camelize from "underscore.string/camelize";
import {string, func, object} from "prop-types";
import logo from "../assets/logo.svg";
import TextListToChoose from "../connectors/TextListToChoose";
import {withRouter} from "react-router";

class App extends Component {

  static propTypes = {
    docId: string,
    clearLocalStorage: func.isRequired,
    location: object.isRequired,
  }

  constructor(props) {
    super(props);
    this.getSidebar = this.getSidebar.bind(this);
  }

  getSidebar(docId) {
    const key = camelize(this.props.location.pathname.replace("/", ""));
    if (["fixations", "bottomHalfText", "topHalfText"].indexOf(key) !== -1) {
      return (<div className="sidebar">
        <TextListToChoose docId={docId} textKey={key} />
      </div>);
    }
    return null;
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
        <div className="App-body">
          <div className="content">
            {this.props.children}
          </div>
          {this.getSidebar(docId)}
        </div>
        <div className="App-footer">
          <footer />
        </div>
      </div>
    );
  }
}

// <div id="container">
//    <div id="header"></div>
//    <div id="body"></div>
//    <div id="footer"></div>
// </div>
export default withRouter(App);
