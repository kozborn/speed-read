import Immutable from 'immutable';
import _ from 'underscore';

export const getText = (state, textKey) => {
  const defaultText = state.getIn(['app', 'defaultDoc', textKey], Immutable.Map());
  if (defaultText.isEmpty()) {
    throw new Error(`There is no default text for this key: "${textKey}"`);
  }
  const userDoc = state.getIn(['user', 'doc']);
  if (userDoc.isEmpty()) return defaultText;

  // get text id from user preferences
  const userTextKey = state.getIn(['user', 'doc', 'preferences', textKey], "");

  if (_(userTextKey).isEmpty()) return defaultText;

  // check if key exist in user doc
  const userText = state.getIn(['user', 'doc', 'texts'], Immutable.List())
  .find((text) => { return text.get('id') === userTextKey; }, null, Immutable.Map());

  // if is not empty then return
  if (!userText.isEmpty()) return userText;

  // if userText is empty then try to find it in defaultDoc
  const defaultTextForKey = state.getIn(['app', 'defaultDoc', userTextKey], Immutable.Map());
  if (!defaultTextForKey.isEmpty()) return defaultTextForKey;

  // if everything fails then return default text
  return defaultText;
};


export const parseDefaultTexts = (defaultDoc) => {
  return defaultDoc.filter(entry => Immutable.Map.isMap(entry))
  .reduce((acc, entry, key) => {
    if (entry.has('title') && entry.has('text')) {
      return acc.push(entry.set('id', key));
    }
    return acc;
  }, Immutable.List());
};
