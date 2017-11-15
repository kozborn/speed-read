import {connect} from "react-redux";
import Immutable from "immutable";
import TextList from "../components/common/TextList";
import { switchText } from "../actions/actions";
import { getTextsFromDocument } from "../utils/helpers";

function mapStateToProps(state) {
  // const docId = state.getIn(["app", "docId"], null);
  // const userTexts = getTextsFromDocument(state.getIn(["app", "userDoc"], new Map()));
  // const defaultTexts = state.getIn(["app", "defaultDoc"], new Map());
  // let texts = new Map();
  // if (defaultTexts && !defaultTexts.isEmpty()) {
  //   texts = texts.merge(defaultTexts.delete('_rev').delete('_id'));
  // }

  // texts = texts.concat(userTexts);
  // return {docId, texts};
  return {
    texts: Immutable.Map(),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    switchText: (key, preferences) =>
      dispatch(switchText(ownProps.docId, key, preferences)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextList);
