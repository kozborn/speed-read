import {connect} from "react-redux";
import Immutable from "immutable";
import HomePage from "../components/HomePage";
import {getDoc} from "../actions/actions";

function mapStateToProps(state) {
  return {
    reading: state.getIn(["app", "defaultDoc", "reading"], Immutable.Map()),
    understanding: state.getIn(["app", "defaultDoc", "understanding"], Immutable.Map()),
    anticipating: state.getIn(["app", "defaultDoc", "anticipating"], Immutable.Map()),
    thinking: state.getIn(["app", "defaultDoc", "thinking"], Immutable.Map()),
    memorizing: state.getIn(["app", "defaultDoc", "memorizing"], Immutable.Map()),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: () => dispatch(getDoc()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
