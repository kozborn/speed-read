import {connect} from "react-redux";
import FixationsWithSliders from "../components/fixations/FixationsWithSliders";
import { saveText, savePreferences } from "../actions/actions";
import { getText } from '../utils/state_helpers';

function mapStateToProps(state) {
  return {
    text: getText(state, 'fixations'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveText: (docId, textKey, data) => dispatch(saveText(docId, textKey, data)),
    savePreferences: (docId, key, preferences) =>
      dispatch(savePreferences(docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FixationsWithSliders);
