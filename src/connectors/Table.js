import {connect} from "react-redux";
import _ from "underscore";
import {Map} from "immutable";
import TableWithSliders from "../components/TableWithSliders";
import {getDoc, savePreferences} from "../actions/actions";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  const preferences = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
    : state.getIn(["app", "userDoc", "preferences"], new Map());

  return {docId, preferences};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    savePreferences: (tableName, preferences) =>
      dispatch(savePreferences(ownProps.documentId, tableName, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWithSliders);
