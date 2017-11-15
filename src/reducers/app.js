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
  defaultDoc: new Map(),
  defaultPreferences: fromJS(PREFERENCES),
}), action) {
  switch (action.type) {
    case "FETCHING_DEFAULT_DOC":
      return state.set("isFetching", true);
    case "DEFAULT_DOC_FETCHED":
      return state.withMutations((s) => {
        s.set("defaultDoc", fromJS(action.response));
        s.set("isFetching", false);
      });
    default:
      return state;
  }
}

export default app;
