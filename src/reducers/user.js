import Immutable from "immutable";

const user = (state = Immutable.fromJS({
  id: null,
  isFetching: false,
  doc: Immutable.Map(),
}), action) => {
  switch (action.type) {
    case "SET_USER_DOCID":
      return state.set("id", action.userDocId);
    case "FETCHING_USER_DOC":
      return state.set("isFetching", true);
    case "USER_DOC_FETCHED":
      return state.withMutations((s) => {
        s.set("doc", Immutable.fromJS(action.response));
        s.set('isFetching', false);
      });
    case "USER_DOC_FETCHING_ERROR":
      return state.withMutations((s) => {
        s.set("isFetching", false);
        s.set("error", "Ten dokument nie może zostać pobrany. Upewnij się że podałeś prawidłowy documentId");
      });
    case "SWITCH_TEXT_FOR_KEY":
      return state.withMutations((s) => {
        s.setIn(['doc', 'preferences', action.key], action.textId);
      });
    case "ADD_NEW_TEXT": {
      const texts = state.getIn(['doc', 'texts'], Immutable.List());
      return state.setIn(['doc', 'texts'], texts.concat(action.text));
    }
    case "SAVE_USER_PREFERENCES": {
      return state.setIn(['doc', 'preferences', action.key], Immutable.fromJS(action.preferences));
    }
    default:
      return state;
  }
};

export default user;
