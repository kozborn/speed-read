import {connect} from "react-redux";
import _ from "underscore";
import {Map} from "immutable";
import TableWithSliders from "../components/TableWithSliders";
import {getDoc, savePreferences} from "../actions/actions";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], "default_doc");
  const preferences = _.isEmpty(docId)
    ? state.getIn(["app", "defaultDoc", "preferences"], new Map())
    : state.getIn(["app", "userDoc", "preferences"], new Map());

  return {docId: docId || "default_doc", preferences};
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    savePreferences: (docId, tableName, preferences) =>
      dispatch(savePreferences(docId, tableName, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWithSliders);
