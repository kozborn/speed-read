import {connect} from "react-redux";
import _ from "underscore";
import {Map} from "immutable";
import TopHalfText from "../components/TopHalfText";
import {getDoc, saveText, savePreferences} from "../actions/actions";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  let text = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "text"], "")
    : state.getIn(["app", "userDoc", "text"], "");

  if (_.isEmpty(text)) {
    text = state.getIn(["app", "defaultDoc", "text"], "");
  }

  const preferences = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
    : state.getIn(["app", "userDoc", "preferences"], new Map());

  return {docId, text, preferences};
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    saveText: (docId, textKey, text) => dispatch(saveText(docId, textKey, text)),
    savePreferences: (docId, key, preferences) =>
      dispatch(savePreferences(docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHalfText);
