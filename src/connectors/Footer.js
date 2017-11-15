import { connect } from "react-redux";
import Footer from "../components/Footer";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  return {docId};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
