import {connect} from "react-redux";
import Immutable from 'immutable';
import FixationsWithSliders from "../components/fixations/FixationsWithSliders";
import { savePreferences, getUserDoc } from "../actions/user-actions";
import { getText } from '../utils/state_helpers';

function mapStateToProps(state) {
  return {
    userDoc: state.get('user'),
    text: getText(state, "fixations"),
    preferences: state.getIn(['user', 'doc', 'preferences'], Immutable.Map()),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getUserDoc: userId => dispatch(getUserDoc(userId)),
    savePreferences: (key, preferences) => dispatch(savePreferences(key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FixationsWithSliders);
