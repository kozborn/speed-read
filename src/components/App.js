import React, { Component } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import camelize from "underscore.string/camelize";
import { string, func, object } from "prop-types";
import { withRouter } from "react-router";
import logo from "../assets/logo.svg";
import Footer from "../connectors/Footer";
import TextListToChoose from "../connectors/TextListToChoose";

class App extends Component {

  static propTypes = {
    docId: string,
    clearLocalStorage: func.isRequired,
    location: object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
    };
    this.getSidebar = this.getSidebar.bind(this);
    this.hasSidebar = this.hasSidebar.bind(this);
  }

  getSidebar(docId) {
    if (this.hasSidebar()) {
      const key = camelize(this.props.location.pathname.replace("/", ""));
      return (<div className="sidebar col-lg-4">
        <TextListToChoose docId={docId} textKey={key} />
      </div>);
    }
    return null;
  }

  hasSidebar() {
    const key = camelize(this.props.location.pathname.replace("/", ""));
    return (["fixations", "bottomHalfText", "topHalfText"].indexOf(key) !== -1);
  }

  render() {
    let queryParams = "";

    const docId = this.props.docId ? this.props.docId : localStorage.getItem("docId");
    if (docId) {
      queryParams = `?documentId=${docId}`;
    }

    const contentClasses = cn("content", {
      "col-lg-12": !this.hasSidebar(),
      "col-lg-8": !this.hasSidebar(),
    });

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
                <li className="pull-right">
                  <button className="btn btn-sm btn-warning" onClick={this.props.clearLocalStorage}>
                    Wyczyść dane
                  </button>
                </li>
                : null
            }
          </nav>
          <div className="clearfix" />
        </div>
        <div className="App-body">
          <div className="row">
            <div className={contentClasses}>
              {this.props.children}
            </div>
            {this.getSidebar(docId)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
