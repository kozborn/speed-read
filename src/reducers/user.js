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
        s.set("userDoc", Immutable.fromJS(action.response));
        s.set('isFetching', false);
      });
    case "USER_DOC_FETCHING_ERROR":
      return state.withMutations((s) => {
        s.set("isFetching", false);
        s.set("error", "Ten document nie może zostać pobrany. Upewnij się że podałeś prawidłowy documentId");
      });
    default:
      return state;
  }
};

export default user;
