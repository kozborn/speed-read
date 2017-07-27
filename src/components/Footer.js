import React from "react";
import {string} from "prop-types";
import {DEFAULT_DOC_ID, ServerUrl} from "../actions/actions";

export default class Footer extends React.Component {

  static propTypes = {
    docId: string.isRequired,
  }

  constructor(props) {
    super(props);
    this.getUrl = this.getUrl.bind(this);
  }

  getUrl() {
    return `${ServerUrl}?documentId=${this.props.docId}`;
  }

  render() {
    return (
      <div className="App-footer">
        <footer>
          {this.props.docId !== DEFAULT_DOC_ID ? this.getUrl() : null}
        </footer>
      </div>
    );
  }

}
