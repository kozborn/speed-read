import Immutable from "immutable";

const user = (state = Immutable.fromJS({
  id: null,
  status: '',
  isFetching: false,
  doc: {
    preferences: {
      schultzTable: {},
      fixations: {},
    },
    texts: [],
  },
}), action) => {
  switch (action.type) {

    case "CLEAR_STATUS":
      return state.set('status', '');

    case "SET_USER_DOCID":
      return state.set("id", action.userDocId);

    case "FETCHING_USER_DOC":
      return state.set("isFetching", true);

    case "FETCHING_ERROR":
      return state.set('isFetching', false);

    case "USER_DOC_FETCHED":
      return state.withMutations((s) => {
        s.set("doc", Immutable.fromJS(action.response));
        s.set('isFetching', false);
      });

    case "USER_DOC_SAVED":
      return state.set('status', 'saved');

    case "SWITCH_TEXT_FOR_KEY":
      return state.withMutations((s) => {
        s.setIn(['doc', 'preferences', action.key], action.textId);
      });

    case "ADD_NEW_TEXT": {
      const texts = state.getIn(['doc', 'texts'], Immutable.List());
      const newText = Immutable.fromJS(action.text);
      return state.setIn(['doc', 'texts'], texts.push(newText.set('timestamp', Date.now())));
    }

    case "UPDATE_TEXT": {
      const texts = state.getIn(['doc', 'texts']);
      const indexOfCurrentText = texts.findIndex((text) => {
        return text.get('id') === action.text.id;
      });

      const updatedTexts = texts.update(indexOfCurrentText, (text) => {
        return text.set('title', action.text.title)
        .set('text', Immutable.fromJS(action.text.text));
      });

      return state.setIn(['doc', 'texts'], updatedTexts);
    }

    case "REMOVE_TEXT": {
      const texts = state.getIn(["doc", "texts"], Immutable.List())
      .filter(text => text.get('id') !== action.textId);
      return state.setIn(["doc", 'texts'], texts);
    }

    case "SAVE_USER_PREFERENCES": {
      console.log(action.preferences)
      return state.setIn(['doc', 'preferences', action.key], Immutable.fromJS(action.preferences));
    }
    default:
      return state;
  }
};

export default user;
