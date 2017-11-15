import {connect} from "react-redux";
import FixationsWithSliders from "../components/fixations/FixationsWithSliders";
import { saveText, savePreferences } from "../actions/actions";
import { docIdCurrentTextPreferences } from '../utils/state_helpers';

function mapStateToProps(state) {
  return docIdCurrentTextPreferences(state, "fixations");
}

function mapDispatchToProps(dispatch) {
  return {
    // getDoc: docId => dispatch(getDoc(docId)),
    saveText: (docId, textKey, data) => dispatch(saveText(docId, textKey, data)),
    savePreferences: (docId, key, preferences) =>
      dispatch(savePreferences(docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FixationsWithSliders);
