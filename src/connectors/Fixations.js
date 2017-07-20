import {connect} from "react-redux";
import _ from "underscore";
import FixationsWithSliders from "../components/fixations/FixationsWithSliders";
import {getDoc, saveText} from "../actions/actions";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  const fixationText = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "fixations"], "")
    : state.getIn(["app", "userDoc", "fixations"], "");

  return {docId, fixationText};
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    saveText: (docId, textKey, text) => dispatch(saveText(docId, textKey, text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FixationsWithSliders);
