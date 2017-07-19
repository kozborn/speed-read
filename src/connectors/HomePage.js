import {connect} from "react-redux";
import HomePage from "../components/HomePage";
import {getDoc} from "../actions/actions";

function mapStateToProps(state) {
  return {
    reading: state.getIn(["app", "defaultDoc", "reading"], ""),
    understanding: state.getIn(["app", "defaultDoc", "understanding"], ""),
    anticipating: state.getIn(["app", "defaultDoc", "anticipating"], ""),
    thinking: state.getIn(["app", "defaultDoc", "thinking"], ""),
    memorizing: state.getIn(["app", "defaultDoc", "memorizing"], ""),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: () => dispatch(getDoc()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
