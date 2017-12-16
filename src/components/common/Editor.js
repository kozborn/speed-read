import React from 'react';
import Immutable from 'immutable';
import { instanceOf, string, array, bool, oneOfType } from "prop-types";
import { Editor,
  ContentState,
  EditorState,
  convertToRaw,
} from 'draft-js';
import { getInitialState } from '../../utils/editor_helpers';

class DraftEditor extends React.Component {

  static propTypes = {
    placeholder: string,
    readOnly: bool,
    decorators: array,
    initialText: oneOfType([
      instanceOf(ContentState),
      instanceOf(EditorState),
      instanceOf(Immutable.Map),
      string,
    ]).isRequired,
  }

  static defaultProps = {
    placeholder: "",
    readOnly: false,
    decorators: null,
  }

  constructor(props) {
    super(props);
    const initialContentState = getInitialState(props.initialText, props.decorators);

    this.state = {
      editorState: initialContentState,
    };
    this.onChange = this.onChange.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialText instanceof EditorState) {
      this.setState({ editorState: nextProps.initialText});
    } else {
      this.setState({ editorState: getInitialState(nextProps.initialText, nextProps.decorators)});
    }
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  getContent() {
    return convertToRaw(this.state.editorState.getCurrentContent());
  }

  render() {
    return (
      <Editor
        readOnly={this.props.readOnly}
        placeholder={this.props.placeholder}
        ref={(e) => { this.editor = e; }}
        editorState={this.state.editorState}
        onChange={this.onChange}
        stripPastedStyles
      />
    );
  }
}

export default DraftEditor;
