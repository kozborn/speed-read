import {connect} from "react-redux";
import Immutable from "immutable";
import HomePage from "../components/HomePage";

function mapStateToProps(state) {
  const defaultDoc = state.getIn(["app", "defaultDoc"], Immutable.Map());
  return {
    reading: defaultDoc.get("reading", Immutable.Map()),
    understanding: defaultDoc.get("understanding", Immutable.Map()),
    anticipating: defaultDoc.get("anticipating", Immutable.Map()),
    thinking: defaultDoc.get("thinking", Immutable.Map()),
    memorizing: defaultDoc.get("memorizing", Immutable.Map()),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
