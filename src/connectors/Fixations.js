import {connect} from "react-redux";
import _ from "underscore";
import FixationsWithSliders from "../components/fixations/FixationsWithSliders";
import {getDoc, saveText} from "../actions/actions";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  const fixationText = _.isEmpty(docId)
    ? state.getIn(["app", "defaultTexts", "fixations"], "")
    : state.getIn(["app", "userTexts", "fixations"], "");

  return {docId, fixationText};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    saveText: (textKey, text) => dispatch(saveText(ownProps.documentId, textKey, text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FixationsWithSliders);
