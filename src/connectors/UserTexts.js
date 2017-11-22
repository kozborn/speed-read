import {connect} from "react-redux";
import Immutable from "immutable";
import Texts from "../components/user-texts/Texts";

function mapStateToProps(state) {
  const texts = state.getIn(["user", "doc", 'texts'], Immutable.List());
  return { texts };
}

function mapDispatchToProps(dispatch) {
  return {
    // saveText: (docId, textKey, text) => dispatch(saveText(docId, textKey, text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Texts);
