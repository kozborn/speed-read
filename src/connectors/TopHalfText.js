import {connect} from "react-redux";
import _ from "underscore";
import {Map} from "immutable";
import BottomHalfText from "../components/BottomHalfText";
import {getDoc, saveText, savePreferences, DEFAULT_DOC_ID} from "../actions/actions";
import {getTextsFromDocument} from "../utils/helpers";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  let text = state.getIn(["app", "defaultDoc", "topHalfText"], new Map());
  const userTexts = getTextsFromDocument(state.getIn(["app", "userDoc"], new Map()));
  const textKey = state.getIn(["app", "userDoc", "preferences", "topHalfText"], "");
  if (!userTexts.isEmpty() && textKey !== "") {
    text = state.getIn(["app", "userDoc", textKey], "");
  }

  const preferences = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
    : state.getIn(["app", "userDoc", "preferences"], new Map());

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
