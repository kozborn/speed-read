import {connect} from "react-redux";
import _ from "underscore";
import Immutable from "immutable";
import TableWithSliders from "../components/TableWithSliders";
import { savePreferences} from "../actions/actions";

function mapStateToProps(state) {
  // const docId = state.getIn(["app", "docId"], DEFAULT_DOC_ID);
  // const preferences = _.isEmpty(docId)
  //   ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
  //   : state.getIn(["app", "userDoc", "preferences"], new Map());
  // return {docId: docId || DEFAULT_DOC_ID, preferences};
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    // getDoc: docId => dispatch(getDoc(docId)),
    savePreferences: (docId, tableName, preferences) =>
      dispatch(savePreferences(docId, tableName, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWithSliders);
