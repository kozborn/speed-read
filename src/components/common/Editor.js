import React from 'react';
import Immutable from 'immutable';
import { instanceOf, string, bool, oneOfType } from "prop-types";
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
    initialText: oneOfType([
      instanceOf(Immutable.Map),
      string,
    ]).isRequired,
  }

  static defaultProps = {
    placeholder: "",
    readonly: false,
  }

  constructor(props) {
    super(props);
    const initialContentState = this.setInitialText(props.initialText);
    

    this.state = {
      editorState: initialContentState,
    };
    this.onChange = this.onChange.bind(this);
    this.getContent = this.getContent.bind(this);
    this.setInitialText = this.setInitialText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({editorState: this.setInitialText(nextProps.initialText)})
  }

  setInitialText(initialText) {
    let initialContentState;
    if (Immutable.Map.isMap(initialText) && !initialText.isEmpty()) {
      const state = convertFromRaw(initialText.toJS());
      initialContentState = EditorState.createWithContent(state);
    } else if (typeof initialText === 'string') {
      const state = ContentState.createFromText(initialText);
      initialContentState = EditorState.createWithContent(state);
    } else {
      initialContentState = EditorState.createEmpty();
    }
    return initialContentState;
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
