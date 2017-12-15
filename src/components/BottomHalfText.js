import React from "react";
import Immutable from "immutable";
import { instanceOf, node } from "prop-types";
import DraftEditor from "./common/Editor";
import { wrapEachWordWithSpanAndAddCoverDraft } from "../utils/editor_helpers";

const BottomHalfWord = (props) => {
  return <span>{props.children}<span className="bottom-half-text" /></span>;
};

BottomHalfWord.propTypes = {
  children: node.isRequired,
};

const prepareText = (text) => {
  return wrapEachWordWithSpanAndAddCoverDraft(text, BottomHalfWord);
};


class BottomHalfText extends React.Component {

  static propTypes = {
    text: instanceOf(Immutable.Map).isRequired,
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
      <div className="bottom-half-text">
        <h1>Bottom Half Text</h1>
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

export default BottomHalfText;
