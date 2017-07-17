import {connect} from "react-redux";
import _ from "underscore";
import Fixations from "../components/Fixations";
import {getDoc} from "../actions/actions";

function mapStateToProps(state, ownProps) {
  const fixationText = _.isEmpty(ownProps.documentId)
    ? state.getIn(["app", "defaultTexts", "fixations"], "")
    : state.getIn(["app", "userTexts", "fixations"], "");

  return {fixationText};
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fixations);
