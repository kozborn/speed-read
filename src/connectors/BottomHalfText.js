import {connect} from "react-redux";
import BottomHalfText from "../components/BottomHalfText";
import { getText } from '../utils/state_helpers';
import { getUserDoc } from '../actions/user-actions';

function mapStateToProps(state) {
  return {
    userDoc: state.get('user'),
    text: getText(state, "bottomHalfText"),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserDoc: userId => dispatch(getUserDoc(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomHalfText);
