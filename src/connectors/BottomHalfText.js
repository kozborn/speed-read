import {connect} from "react-redux";
import BottomHalfText from "../components/BottomHalfText";
import { getText } from '../utils/state_helpers';

function mapStateToProps(state) {
  return {
    userDoc: state.get('user'),
    text: getText(state, "bottomHalfText"),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomHalfText);
