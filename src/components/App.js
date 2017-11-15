import React, { Component } from "react";
import camelize from "underscore.string/camelize";
import { withRouter } from "react-router";
import { string, object, node } from "prop-types";
import Header from './Header';
import Footer from "../connectors/Footer";
import TextListToChoose from "../connectors/TextListToChoose";

const pageWithSidebar = (location) => {
  const key = camelize(location.replace("/", ""));
  return (["fixations", "bottomHalfText", "topHalfText"].indexOf(key) !== -1);
};

class App extends Component {

  static propTypes = {
    docId: string.isRequired,
    location: object.isRequired,
    children: node.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
    };
    this.getSidebar = this.getSidebar.bind(this);
  }

  getSidebar(docId) {
    if (pageWithSidebar(this.props.location.pathname)) {
      const key = camelize(this.props.location.pathname.replace("/", ""));
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
        <Header
          queryParams={queryParams}
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
