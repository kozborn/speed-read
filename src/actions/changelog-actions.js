import Immutable from 'immutable';
import { fetchDoc, getOptions, saveDoc } from "../utils/db_helpers";

export function getChangelog() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_CHANGELOG" });
    fetchDoc('changelog')
    .then((response) => {
      dispatch({ type: "CHANGELOG_FETCHED", response });
    });
  };
}

export function save() {
  return (dispatch, getState) => {
    dispatch({ type: "SAVING_CHANGELOG" })
    const options = getOptions("PUT"); // this document has to exists
    const docToSave = getState().getIn(['changelog', 'doc'], Immutable.Map()).toJS()
    docToSave.id = 'changelog';
    saveDoc(docToSave, options)
    .then((response) => {
      console.log(response);
    })
  }
}

export function add(entry) {
  return (dispatch) => {
    dispatch({ type: "ADD_CHANGELOG_ENTRY", entry });
    dispatch(save());
  }
}

export function update(entry) {
  return (dispatch) => {
    dispatch({type: "UPDATE_CHANGELOG_ENTRY", entry});
    dispatch(save());
  }
}

