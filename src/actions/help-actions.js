import Immutable from 'immutable';
import _ from 'underscore'
import { fetchDoc, getOptions, saveDoc } from "../utils/db_helpers";

export function getHelp() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_HELP" });
    fetchDoc('help')
    .then((response) => {
      dispatch({ type: "HELP_FETCHED", response });
    });
  };
}

export function save() {
  return (dispatch, getState) => {
    dispatch({ type: "SAVING_HELP" })
    const options = getOptions("PUT"); // this document has to exists
    const docToSave = getState().getIn(['help', 'doc'], Immutable.Map()).toJS()
    docToSave.id = 'help';
    return saveDoc(docToSave, options)
    .then((response) => {
      // console.log(response);
    })
  }
}

export function add(entry) {
  return (dispatch) => {
    dispatch({ type: "ADD_HELP_ENTRY", entry });
    dispatch(save());
  }
}

export function update(entry) {
  return (dispatch) => {
    dispatch({type: "UPDATE_HELP_ENTRY", entry});
    dispatch(save());
  }
}

