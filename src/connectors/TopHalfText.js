import { connect } from "react-redux";
import TopHalfText from "../components/TopHalfText";
import { getDoc, saveText, savePreferences, DEFAULT_DOC_ID } from "../actions/actions";
import { docIdCurrentTextPreferences } from '../utils/state_helpers';

function mapStateToProps(state) {
  return docIdCurrentTextPreferences(state, "topHalfText");
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    saveText: (docId, textKey, text) => dispatch(saveText(docId, textKey, text)),
    savePreferences: (docId, key, preferences) =>
      dispatch(savePreferences(docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHalfText);
