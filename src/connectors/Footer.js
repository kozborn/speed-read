import {connect} from "react-redux";
import Footer from "../components/Footer";
import {DEFAULT_DOC_ID} from "../actions/actions";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  return {docId: docId || DEFAULT_DOC_ID};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
