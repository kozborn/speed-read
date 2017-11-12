import { Map } from 'immutable'
import _ from 'underscore';
import { getTextsFromDocument } from "./helpers";
import { DEFAULT_DOC_ID } from "../actions/actions"

// returns docId, currentText and preferences
export const docIdCurrentTextPreferences = (state, textKey) => {
  const docId = state.getIn(["app", "docId"], null);
  let text = state.getIn(["app", "defaultDoc", textKey], new Map());

  const userDoc = state.getIn(["app", "userDoc"], new Map());

  const userTexts = getTextsFromDocument(userDoc);
  const key = userDoc.getIn(["preferences", textKey], "");

  // First check if there is text with `key` in userTexts
  // if not then take text from defaultDoc

  if (key!== '') {
    if (!userTexts.isEmpty()) {
      // Saving user texts needs to be fixed first
      // searchForTextWithKey(key);
    } else {
      text = state.getIn(["app", "defaultDoc", key], new Map());
    }
  }

  const preferences = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
    : userDoc.get("preferences", new Map());

  return { docId: docId || DEFAULT_DOC_ID, text, preferences };
}
