import React from "react";
import {string} from "prop-types";
import Api from "../api/Api";
import {stringDivider} from "../utils/helpers";

const PREFIX = "<div class='wrapper'>";
const POSTFIX = "<div class='show-top-letters'></div></div>";

class TopHalfText extends React.Component {

  static propTypes = {
    documentId: string,
  }

  static defaultProps = {
    documentId: "sample_text",
  }

  constructor(props) {
    super(props);
    this.state = {
      textWrapped: "",
    };
  }

  componentWillMount() {
    const {documentId} = this.props;

    Api.getText(documentId)
    .then((jsonResponse) => {
      const textWrapped = stringDivider(jsonResponse.topHalfText ? jsonResponse.topHalfText : "", 100, PREFIX, POSTFIX);
      this.setState({textWrapped});
    });
  }

  createMarkup(markup) {
    return {__html: markup};
  }

  render() {
    return (
      <div className="top-half-text">
        <div
          className="text-container"
          ref={(e) => { this.textContainer = e; }}
          dangerouslySetInnerHTML={this.createMarkup(this.state.textWrapped)}
        />
      </div>
    );
  }
}

export default TopHalfText;
