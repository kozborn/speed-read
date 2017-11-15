import {connect} from "react-redux";
import Immutable from "immutable";
import TextList from "../components/common/TextList";
import { checkText } from "../actions/user-actions";
import { parseDefaultTexts } from '../utils/state_helpers';

function mapStateToProps(state) {
  const defaultTexts = parseDefaultTexts(state.getIn(['app', 'defaultDoc'], Immutable.Map()));
  const userTexts = state.getIn(['user', 'texts'], Immutable.List());
  return {
    texts: userTexts.concat(defaultTexts),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkText: (key, textId) =>
      dispatch(checkText(key, textId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextList);
