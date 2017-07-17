import {connect} from "react-redux";
import HomePage from "../components/HomePage";
import {getDoc} from "../actions/actions";

function mapStateToProps(state) {
  return {
    reading: state.getIn(["app", "texts", "reading"], ""),
    understanding: state.getIn(["app", "texts", "understanding"], ""),
    anticipating: state.getIn(["app", "texts", "anticipating"], ""),
    thinking: state.getIn(["app", "texts", "thinking"], ""),
    memorizing: state.getIn(["app", "texts", "memorizing"], ""),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: () => dispatch(getDoc()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
