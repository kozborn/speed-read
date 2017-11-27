import { connect } from "react-redux";
import TopHalfText from "../components/TopHalfText";
import { getText } from '../utils/state_helpers';
import withUserDoc from '../hoc/WithUserDoc';
import { getUserDoc } from '../actions/user-actions';

function mapStateToProps(state) {
  return {
    userDoc: state.get('user'),
    text: getText(state, "topHalfText"),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserDoc: userId => dispatch(getUserDoc(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withUserDoc(TopHalfText));
