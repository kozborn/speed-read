import {Map, fromJS} from "immutable";

function app(state = new Map({
  isFetching: false,
}), action) {
  switch (action.type) {
    case "DOC_FETCHED":
      return state.set("texts", fromJS(action.response));
    default:
      return state;
  }
}

export default app;
