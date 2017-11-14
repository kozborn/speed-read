import {connect} from "react-redux";
import BottomHalfText from "../components/BottomHalfText";
import {DEFAULT_DOC_ID, getDoc, saveText, savePreferences} from "../actions/actions";
import { docIdCurrentTextPreferences } from '../utils/state_helpers';

function mapStateToProps(state) {
  return docIdCurrentTextPreferences(state, "bottomHalfText");
}

function mapDispatchToProps(dispatch) {
  return {
    getDoc: docId => dispatch(getDoc(docId)),
    saveText: (docId, textKey, text) => dispatch(saveText(docId, textKey, text)),
    savePreferences: (docId, key, preferences) =>
      dispatch(savePreferences(docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomHalfText);
