import React from "react";
import {Map} from "immutable";
import { instanceOf } from "prop-types";
import { wrapEachWordWithSpanAndAddCover } from "../utils/helpers";

const createMarkup = (markup) => { return { __html: markup}; };
const prepareText = (text) => {
  return wrapEachWordWithSpanAndAddCover(text, 'bottom-half-text');
};

class BottomHalfText extends React.Component {

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
    const textWrapped = prepareText(this.props.text.get('text'));
    this.setState({textWrapped});
  }

  componentWillReceiveProps(nextProps) {
    const textWrapped = prepareText(nextProps.text.get("text"));
    this.setState({textWrapped});
  }

  render() {
    return (
      <div className="bottom-half-text">
        <div
          className="text-container text-with-helpers"
          dangerouslySetInnerHTML={createMarkup(this.state.textWrapped)}
        />
      </div>
    );
  }
}

export default BottomHalfText;
