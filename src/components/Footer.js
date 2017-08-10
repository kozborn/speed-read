import React from "react";
import { Link } from "react-router-dom";
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
    let queryParams = "";

    const docId = this.props.docId ? this.props.docId : localStorage.getItem("docId");
    if (docId) {
      queryParams = `?documentId=${docId}`;
    }

    return (
      <div className="App-footer">
        <footer>
          <nav className="navigation-footer">
            <li><Link to="/">Home page</Link></li>
            <li><Link to={`/bottom-half-text${queryParams}`}>Dolna połowa tekstu</Link></li>
            <li><Link to={`/top-half-text${queryParams}`}>Górna połowa tekstu</Link></li>
            <li><Link to={`/schultz-table${queryParams}`}>Tabela Schultz'a</Link></li>
            <li><Link to={`/fixations${queryParams}`}>Fiksacja</Link></li>
            <li><Link to={`/user-texts${queryParams}`}>Twoje teksty</Link></li>
          </nav>
          <div className="clearfix" />
          {this.props.docId !== DEFAULT_DOC_ID ?
            <div className="user-private-link">
              Twój prywatny link <a href={this.getUrl()}>{this.getUrl()}</a>
            </div>
          : null}
        </footer>
      </div>
    );
  }

}
