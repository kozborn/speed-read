import React from "react";
import { instanceOf, node } from "prop-types";
import { Map } from "immutable";
import DraftEditor from "./common/Editor";
import {
  wrapEachWordWithSpanAndAddCoverDraft,
} from "../utils/editor_helpers";

const TopHalfWord = (props) => {
  return <span>{props.children}<span className="top-half-text" /></span>;
};

TopHalfWord.propTypes = {
  children: node.isRequired,
};

const prepareText = (text) => {
  return wrapEachWordWithSpanAndAddCoverDraft(text, TopHalfWord);
};

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
    prepareText(this.props.text.get('text')).then((textWrapped) => {
      this.setState({ textWrapped });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text.get('title') !== this.props.text.get('title')) {
      prepareText(nextProps.text.get('text')).then((textWrapped) => {
        this.setState({ textWrapped });
      });
    }
  }

  render() {
    return (
      <div className="top-half-text">
        <h1>Top Half Text</h1>
        <div className="text-with-helpers">
          <DraftEditor
            readOnly
            ref={(e) => { this.editor = e; }}
            initialText={this.state.textWrapped}
          />
        </div>
      </div>
    );
  }
}

export default TopHalfText;
