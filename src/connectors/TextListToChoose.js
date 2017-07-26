import {connect} from "react-redux";
import {List} from "immutable";
import TextList from "../components/common/TextList";
import {switchText} from "../actions/actions";
import {getTextsFromDocument} from "../utils/helpers";

function mapStateToProps(state) {
  const docId = state.getIn(["app", "docId"], null);
  const texts = getTextsFromDocument(state.getIn(["app", "userDoc"], new List()));
  return {docId, texts};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    switchText: (key, preferences) =>
      dispatch(switchText(ownProps.docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextList);
