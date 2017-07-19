import {connect} from "react-redux";
import App from "../components/App";
import {getDoc} from "../actions/actions";

function mapStateToProps(state) {
  return {
    docId: state.getIn(["app", "docId"], null),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: () => dispatch(getDoc()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
