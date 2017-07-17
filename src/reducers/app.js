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
  defaultTexts: null,
  defaultPreferences: fromJS(PREFERENCES),
  userTexts: null,
  userId: null,
}), action) {
  switch (action.type) {
    case "USER_DOC_FETCHED":
      return state.set("userTexts", fromJS(action.response));
    case "DOC_FETCHED":
      return state.set("defaultTexts", fromJS(action.response));
    default:
      return state;
  }
}

export default app;
