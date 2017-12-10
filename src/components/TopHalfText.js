import React from "react";
import { instanceOf } from "prop-types";
import { Map } from "immutable";
import { wrapEachWordWithSpanAndAddCover } from "../utils/helpers";

const prepareText = (text) => {
  return wrapEachWordWithSpanAndAddCover(text, 'top-half-text');
};
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
    const textWrapped = prepareText(this.props.text.get("text", ""));
    this.setState({textWrapped});
  }

  componentWillReceiveProps(nextProps) {
    const textWrapped = prepareText(nextProps.text.get("text", ""));
    this.setState({textWrapped});
  }

  render() {
    return (
      <div className="top-half-text">
        <div
          className="text-container text-with-helpers"
          ref={(e) => { this.textContainer = e; }}
          dangerouslySetInnerHTML={createMarkup(this.state.textWrapped)}
        />
      </div>
    );
  }
}

export default TopHalfText;
