import {connect} from "react-redux";
import Immutable from "immutable";
import TableWithSliders from "../components/TableWithSliders";
import { savePreferences, getUserDoc } from "../actions/user-actions";

function mapStateToProps(state) {
  const defaultPreferences = state.getIn(['app', 'preferences'], Immutable.Map());
  const userPreferences = state.getIn(['user', 'doc', 'preferences'], Immutable.Map());
  const preferences = userPreferences.merge(defaultPreferences);
  return {
    preferences,
    userDoc: state.get('user'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserDoc: userId => dispatch(getUserDoc(userId)),
    savePreferences: (key, preferences) =>
      dispatch(savePreferences(key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWithSliders);
