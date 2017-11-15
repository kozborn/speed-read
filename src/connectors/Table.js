import {connect} from "react-redux";
import Immutable from "immutable";
import TableWithSliders from "../components/TableWithSliders";
import { savePreferences } from "../actions/user-actions";

function mapStateToProps(state) {
  // const docId = state.getIn(["app", "docId"], DEFAULT_DOC_ID);
  // const preferences = _.isEmpty(docId)
  //   ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
  //   : state.getIn(["app", "userDoc", "preferences"], new Map());
  // return {docId: docId || DEFAULT_DOC_ID, preferences};

  const defaultPreferences = state.getIn(['app', 'preferences'], Immutable.Map());
  const userPreferences = state.getIn(['user', 'doc', 'preferences'], Immutable.Map());
  const preferences = userPreferences.merge(defaultPreferences);

  return {
    preferences,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getDoc: docId => dispatch(getDoc(docId)),
    savePreferences: (key, preferences) =>
      dispatch(savePreferences(key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWithSliders);
