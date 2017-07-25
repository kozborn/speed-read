import {connect} from "react-redux";
import _ from "underscore";
import {Map} from "immutable";
import FixationsWithSliders from "../components/fixations/FixationsWithSliders";
import {getDoc, saveText, savePreferences} from "../actions/actions";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  let fixation = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "fixations"], new Map())
    : state.getIn(["app", "userDoc", "fixations"], new Map());

  if (_.isEmpty(fixation)) {
    fixation = state.getIn(["app", "defaultDoc", "fixations"], new Map());
  }

  const preferences = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
    : state.getIn(["app", "userDoc", "preferences"], new Map());

  return {docId, fixation, preferences};
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    saveText: (docId, textKey, data) => dispatch(saveText(docId, textKey, data)),
    savePreferences: (docId, key, preferences) =>
      dispatch(savePreferences(docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FixationsWithSliders);
