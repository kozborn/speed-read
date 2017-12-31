import Immutable from 'immutable'

const help = (state = Immutable.Map({
  isFetching: false,
  doc: Immutable.Map(),
}), action) => {
  switch (action.type) {
    case "FETCHING_HELP":
      return state.set('isFetching', true);
    case "HELP_FETCHED":
      return state.withMutations((s) => {
        s.set('isFetching', false)
        s.set('doc', Immutable.fromJS(action.response))
      })
    case "ADD_HELP_ENTRY": {
      action.entry.createdTimestamp = Date.now();
      return state.setIn(['doc', action.key], Immutable.fromJS(action.entry));
    }
    case "UPDATE_CHANGELOG_ENTRY": {
      action.entry.updatedTimestamp = Date.now();
      return state.setIn(['doc', action.key], Immutable.fromJS(action.entry));
    }
    default:
      return state;
  }
}

export default help;
