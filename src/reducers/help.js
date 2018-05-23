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
      return state.setIn(['doc', action.key], Immutable.fromJS(action.entry));
    }
    case "UPDATE_HELP_ENTRY": {
      let docToUpdate = state.get('doc');
      if (action.entry.id !== action.entry.oldId) {
        docToUpdate = docToUpdate.mapKeys((k) => {
          if (k === action.entry.oldId) {
            return action.entry.id;
          }
          return k;
        })
      }

      const updatedDoc = docToUpdate.update(action.entry.id, (entry) => {
        return entry.withMutations((e) => {
          e.set('id', action.entry.id)
          e.set('updatedTimestamp', Date.now())
          e.set('title', action.entry.title)
          e.set('text', Immutable.fromJS(action.entry.text))
        })
      })

      return state.set('doc', updatedDoc);
    }
    default:
      return state;
  }
}

export default help;
