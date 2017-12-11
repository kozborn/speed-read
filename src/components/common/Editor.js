import React from 'react';
import Immutable from 'immutable';
import { instanceOf, string, bool } from "prop-types";
import { Editor,
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';

class DraftEditor extends React.Component {

  static propTypes = {
    placeholder: string,
    readonly: bool,
    initialText: instanceOf(Immutable.Map).isRequired,
  }

  static defaultProps = {
    placeholder: "",
    readonly: false,
  }

  constructor(props) {
    super(props);
    let initialContentState;
    if (Immutable.Map.isMap(props.initialText) && !props.initialText.isEmpty()) {
      const state = convertFromRaw(props.initialText.toJS());
      initialContentState = EditorState.createWithContent(state);
    } else if (typeof props.initialText === 'string') {
      const state = ContentState.createFromText(props.initialText);
      initialContentState = EditorState.createWithContent(state);
    } else {
      initialContentState = EditorState.createEmpty();
    }

    this.state = {
      editorState: initialContentState,
    };
    this.onChange = this.onChange.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  getContent() {
    return convertToRaw(this.state.editorState.getCurrentContent());
  }

  render() {
    return (
      <Editor
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
