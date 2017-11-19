import React from "react";
import { instanceOf } from "prop-types";
import { Map } from "immutable";
import { stringDivider } from "../utils/helpers";

const PREFIX = "<div class='wrapper'>";
const POSTFIX = "<div class='show-top-letters'></div></div>";

const createMarkup = (markup) => { return { __html: markup }; };

class TopHalfText extends React.Component {

  static propTypes = {
    text: instanceOf(Map).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      textWrapped: "",
    };
  }

  componentDidMount() {
    const textWrapped = stringDivider(this.props.text.get("text", ""), 100, PREFIX, POSTFIX);
    this.setState({textWrapped});
  }

  componentWillReceiveProps(nextProps) {
    const textWrapped = stringDivider(nextProps.text.get("text", ""), 100, PREFIX, POSTFIX);
    this.setState({textWrapped});
  }

  render() {
    return (
      <div className="top-half-text">
        <div
          className="text-container"
          ref={(e) => { this.textContainer = e; }}
          dangerouslySetInnerHTML={createMarkup(this.state.textWrapped)}
        />
      </div>
    );
  }
}

export default TopHalfText;
