import React, { Component } from "react";
import camelize from "underscore.string/camelize";
import { withRouter } from "react-router";
import { string, func, object } from "prop-types";
import Header from './Header';
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

    return (
      <div className="App">
        <Header
          queryParams={queryParams}
          clearLocalStorage={this.props.clearLocalStorage}
        />
        <div className="App-body">
          <div className="page-content">
            {this.props.children}
          </div>
          {this.getSidebar(docId)}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
