import {connect} from "react-redux";
import Immutable from "immutable";
import Texts from "../components/texts/Texts";
import { saveText } from "../actions/actions";

function mapStateToProps(state) {
  // const docId = state.getIn(["app", "docId"], null);
  // const document = state.getIn(["app", "userDoc"], new Map());
  // return {docId: docId || DEFAULT_DOC_ID, document};
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    // getDoc: docId => dispatch(getDoc(docId)),
    saveText: (docId, textKey, text) => dispatch(saveText(docId, textKey, text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Texts);
