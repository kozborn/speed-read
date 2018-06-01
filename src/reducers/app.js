import Immutable from "immutable";

const PREFERENCES = {
  fixationsSettings: {
    speed: 1000,
    blockSize: 8,
    index: 0,
  },
  schultzTable: {
    rows: 3,
    cols: 3,
  },
};

function app(state = Immutable.Map({
  isFetching: false,
  isLogged: false,
  currentlyLogged: Immutable.Map(),
  sidebarExpanded: true,
  defaultDoc: Immutable.Map({}),
  defaultPreferences: Immutable.fromJS(PREFERENCES),
}), action) {
  switch (action.type) {
    case "FETCHING_DEFAULT_DOC":
      return state.set("isFetching", true);
    case "DEFAULT_DOC_FETCHED":
      return state.withMutations((s) => {
        s.set("defaultDoc", Immutable.fromJS(action.response));
        s.set("isFetching", false);
      });
    case "FETCHING_ERROR":
      return state.set("isFetching", true);
    case "UPDATE_TEXT": {
      const { path, text } = action;
      return state.setIn(path, Immutable.fromJS(text));
    }
    case "USER_LOGGED":
      return state.withMutations((s) => {
        s.set('isLogged', true)
        s.set('currentlyLogged', Immutable.fromJS(action.userData))
      })
    case "USER_NOT_LOGGED":
      return state.withMutations((s) => {
        s.set('isLogged', false)
        s.set('currentlyLogged', Immutable.Map())
      })
    case "TOGGLE_SIDEBAR":
      return state.set('sidebarExpanded', !state.get('sidebarExpanded', true));
    default:
      return state;
  }
}

export default app;
