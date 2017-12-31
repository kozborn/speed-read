import Immutable from 'immutable'

const changelog = (state = Immutable.Map({
  isFetching: false,
  doc: Immutable.Map(),
}), action) => {
  switch (action.type) {
    case "FETCHING_CHANGELOG":
      return state.set('isFetching', true);
    case "CHANGELOG_FETCHED":
      return state.withMutations((s) => {
        s.set('isFetching', false)
        s.set('doc', Immutable.fromJS(action.response))
      })
    case "ADD_CHANGELOG_ENTRY": {
      const c = state.getIn(['doc', 'changelog'], Immutable.List());
      action.entry.timestamp = Date.now();
      return state.setIn(['doc', 'changelog'], c.push(Immutable.fromJS(action.entry)));
    }
    case "UPDATE_CHANGELOG_ENTRY": {
      const entryIndex = state.getIn(['doc', 'changelog'])
      .findIndex(c => c.get('id') === action.entry.id);
      return state.setIn(['doc', 'changelog', entryIndex], Immutable.fromJS(action.entry));
    }
    default:
      return state;
  }
}

export default changelog;
