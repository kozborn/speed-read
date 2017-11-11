import {connect} from "react-redux";
import Immutable from "immutable";
import HomePage from "../components/HomePage";
import {getDoc} from "../actions/actions";

function mapStateToProps(state) {
  const defaultDoc = state.getIn(["app", "defaultDoc"], Immutable.Map())
  return {
    reading: defaultDoc.get("reading", Immutable.Map()),
    understanding: defaultDoc.get("understanding", Immutable.Map()),
    anticipating: defaultDoc.get("anticipating", Immutable.Map()),
    thinking: defaultDoc.get("thinking", Immutable.Map()),
    memorizing: defaultDoc.get("memorizing", Immutable.Map()),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: () => dispatch(getDoc()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
