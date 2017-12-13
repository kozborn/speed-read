import React from 'react';
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

const HandleSpan = (props) => {
  return <span className="dupa" >{props.children}</span>;
};

const HANDLE_REGEX = /\@[\w]+/g;
const handleStrategy = (contentBlock, callback, contentState) => {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
};


export const wrapEachWordWithSpanAndAddCoverDraft = (text, className) => {
  const decorator = new CompositeDecorator([{
    strategy: handleStrategy,
    component: HandleSpan,
  }]);
  const contentState = getInitialState(text, decorator);
  return contentState;
};

export const prepareContentStateForHalfText = (contentState) => {
  return contentState;
};
