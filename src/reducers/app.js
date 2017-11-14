import {Map, fromJS} from "immutable";

const PREFERENCES = {
  fixationsSpeed: 1000,
  schultzTable: {
    rows: 3,
    cols: 3,
  },
};

function app(state = new Map({
  isFetching: false,
  docId: null,
  defaultDoc: new Map(),
  defaultPreferences: fromJS(PREFERENCES),
  userDoc: new Map(),
  userId: null,
}), action) {
  switch (action.type) {
    case "USER_DOC_FETCHED":
      return state.set("userDoc", fromJS(action.response));
    case "DOC_FETCHED":
      return state.set("defaultDoc", fromJS(action.response));
    case "SET_USER_DOCID":
      return state.set("docId", action.userDocId);
    default:
      return state;
  }
}

export default app;
