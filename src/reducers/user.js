import Immutable from "immutable";

const user = (state = Immutable.fromJS({
  id: null,
  isFetching: false,
  doc: Immutable.Map(),
}), action) => {
  switch (action.type) {
    case "SET_USER_DOCID":
      return state.set("id", action.userDocId);
    case "USER_DOC_FETCHED":
      return state.set("userDoc", Immutable.fromJS(action.response));
    default:
      return state;
  }
};

export default user;
