import React from 'react';
import Immutable from 'immutable';
import cn from 'classnames';
import { instanceOf, string, array, bool, oneOfType } from "prop-types";
import { Editor,
  ContentState,
  EditorState,
  convertToRaw,
  RichUtils,
} from 'draft-js';
import { getInitialState } from '../../utils/editor_helpers';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'editor__blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'editor__styleButton';
    if (this.props.active) {
      className += ' editor__activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="editor__controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];
const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="editor__controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

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
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
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

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled'
    }
    return 'not-handled'
  }

  _onTab(e) {
    const maxDepth = 2;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      )
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      )
    );
  }

  render() {
    return (
      <div className={cn("editor", {'readonly': this.props.readOnly})}>
        {!this.props.readOnly && <div className="editor__toolbar">
          <BlockStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
        }
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          onTab={this.onTab}
          readOnly={this.props.readOnly}
          placeholder={this.props.placeholder}
          ref={(e) => { this.editor = e; }}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          stripPastedStyles={false}
        />
      </div>
    );
  }
}

export default DraftEditor;
