import {connect} from "react-redux";
import _ from "underscore";
import Fixations from "../components/FixationsWithCreateBtn";
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
    save: (textKey, text) => dispatch(saveText(ownProps.documentId, textKey, text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fixations);
