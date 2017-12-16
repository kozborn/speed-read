import React from 'react';
import { instanceOf, string, func } from 'prop-types';
import Immutable from 'immutable';
import { wrapEachWordWithSpanAndAddCoverDraft, renderEditorToString } from "../utils/editor_helpers";

class HalfText extends React.Component {
  static propTypes = {
    handlerComponent: func.isRequired,
    text: instanceOf(Immutable.Map).isRequired,
    pageTitle: string,
    className: string,
  }

  static defaultProps = {
    pageTitle: "",
    className: "",
  }

  constructor(props) {
    super(props);
    this.state = {
      textWrapped: Immutable.Map(),
    };

    this.prepareText = this.prepareText.bind(this);
  }

  componentDidMount() {
    this.setState({textWrapped: "Loading ... "});
    this.prepareText(this.props.text.get('text'))
    .then((html) => {
      this.setState({textWrapped: html});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text.get('title') !== this.props.text.get('title')) {
      this.setState({ textWrapped: "Loading ... " });
      this.prepareText(nextProps.text.get('text'))
      .then((html) => {
        this.setState({ textWrapped: html });
      });
    }
  }

  prepareText(text) {
    return wrapEachWordWithSpanAndAddCoverDraft(text, this.props.handlerComponent)
    .then((state) => {
      return renderEditorToString(state);
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        <h1>{this.props.pageTitle}</h1>
        <div className="text-with-helpers">
          <div dangerouslySetInnerHTML={{__html: this.state.textWrapped}} />
        </div>
      </div>
    );
  }
}

export default HalfText;
