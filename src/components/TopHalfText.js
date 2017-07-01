import React from "react"
import text from "../assets/sample_texts.json"

import {stringDivider} from "../utils/helpers"

const PREFIX = '<div class="wrapper">';
const POSTFIX = '<div class="hide-top-letters"></div></div>'

class TopHalfText extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      textWrapped: ""
    }
  }

  componentDidMount() {
    const textWrapped = stringDivider(text.text2, 100, PREFIX, POSTFIX)
    this.setState({textWrapped})
  }

  createMarkup(markup) {
    return {__html: markup};
  }

  render() {
    return (
      <div className="bottom-half-text">
        <div
          className="text-container"
          ref={(e) => this.textContainer = e }
          dangerouslySetInnerHTML={this.createMarkup(this.state.textWrapped)}
        />
      </div>
    );
  }
}

export default TopHalfText;
