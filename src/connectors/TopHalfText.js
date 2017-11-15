import { connect } from "react-redux";
import TopHalfText from "../components/TopHalfText";
import { saveText, savePreferences } from "../actions/actions";
import { getText } from '../utils/state_helpers';

function mapStateToProps(state) {
  return {
    text: getText(state, "topHalfText"),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveText: (docId, textKey, text) => dispatch(saveText(docId, textKey, text)),
    savePreferences: (docId, key, preferences) =>
      dispatch(savePreferences(docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHalfText);
