import ReactDOMServer from 'react-dom/server';
import Immutable from 'immutable';
import {
  EditorState,
  ContentState,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js';

export const getInitialState = (initialText, decorator = null) => {
  let initialContentState;
  if (initialText instanceof ContentState) {
    initialContentState = EditorState.createWithContent(initialText, decorator);
  } else if (Immutable.Map.isMap(initialText) && !initialText.isEmpty()) {
    const state = convertFromRaw(initialText.toJS());
    initialContentState = EditorState.createWithContent(state, decorator);
  } else if (typeof initialText === 'string') {
    const state = ContentState.createFromText(initialText);
    initialContentState = EditorState.createWithContent(state, decorator);
  } else {
    initialContentState = EditorState.createEmpty(decorator);
  }
  return initialContentState;
};

export const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr;
  let start;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

const MATCH_WORD = /[\w]+/g;
const MATCH_ANYTHING_BUT_WHITESPACE = /[\S]+/g;
const handleStrategy = (contentBlock, callback, contentState) => {
  findWithRegex(MATCH_ANYTHING_BUT_WHITESPACE, contentBlock, callback);
};


export const wrapEachWordWithSpanAndAddCoverDraft = (text, component) => {
  const decorator = new CompositeDecorator([{
    component,
    strategy: handleStrategy,
  }]);
  return new Promise((resolve) => {
    const contentState = getInitialState(text, decorator);
    resolve(contentState);
  });
};

export const prepareContentStateForHalfText = (contentState) => {
  return contentState;
};
