import {connect} from "react-redux";
import Immutable from "immutable";
import TableWithSliders from "../components/TableWithSliders";
import { savePreferences } from "../actions/user-actions";

function mapStateToProps(state) {
  const defaultPreferences = state.getIn(['app', 'preferences'], Immutable.Map());
  const userPreferences = state.getIn(['user', 'doc', 'preferences'], Immutable.Map());
  const preferences = userPreferences.merge(defaultPreferences);
  return {
    preferences,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    savePreferences: (key, preferences) =>
      dispatch(savePreferences(key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWithSliders);
