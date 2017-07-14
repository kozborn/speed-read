import React from "react";
import {stringDivider} from "../utils/helpers";
import Api from "../api/Api";
const PREFIX = "<div class='wrapper'>";
const POSTFIX = "<div class='show-bottom-letters'></div></div>";

class BottomHalfText extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textWrapped: "",
    };
  }

  componentWillMount() {
    Api.getText()
    .then((jsonResponse) => {
      this.setState({sampleTexts: jsonResponse});
      const {sampleTexts} = this.state;
      const textWrapped = stringDivider(sampleTexts.reading, 100, PREFIX, POSTFIX);
      this.setState({textWrapped});
    });
  }

  createMarkup(markup) {
    return {__html: markup};
  }

  render() {
    return (
      <div className="bottom-half-text">
        <div
          className="text-container"
          ref={(e) => { this.textContainer = e; }}
          dangerouslySetInnerHTML={this.createMarkup(this.state.textWrapped)}
        />
      </div>
    );
  }
}

export default BottomHalfText;
