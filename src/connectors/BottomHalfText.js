import {connect} from "react-redux";
import _ from "underscore";
import {Map} from "immutable";
import BottomHalfText from "../components/BottomHalfText";
import {DEFAULT_DOC_ID, getDoc, saveText, savePreferences} from "../actions/actions";
import {getTextsFromDocument} from "../utils/helpers";

function mapStateToProps(state) {

  const docId = state.getIn(["app", "docId"], null);
  let text = state.getIn(["app", "defaultDoc", "bottomHalfText"], new Map());

  const userDoc = state.getIn(["app", "userDoc"], new Map())

  const userTexts = getTextsFromDocument(userDoc);
  const textKey = userDoc.getIn(["preferences", "bottomHalfText"], "");

  if (!userTexts.isEmpty() && textKey !== "") {
    text = userDoc.get(textKey, "");
  }

  const preferences = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
    : userDoc.get("preferences", new Map());

  return {docId: docId || DEFAULT_DOC_ID, text, preferences};
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    saveText: (docId, textKey, text) => dispatch(saveText(docId, textKey, text)),
    savePreferences: (docId, key, preferences) =>
      dispatch(savePreferences(docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomHalfText);
