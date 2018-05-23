import Immutable from 'immutable';
import { fetchDoc, getOptions, saveDoc, fetchSession } from "../utils/db_helpers";

export const getDefaultDoc = () => {
  return (dispatch) => {
    dispatch({type: "FETCHING_DEFAULT_DOC"});
    fetchDoc('default_doc')
    .then((response) => {
      dispatch({ type: "DEFAULT_DOC_FETCHED", response});
    });
  };
};

export const checkIfUserLogged = () => {
  return (dispatch) => {
    fetchSession()
    .then((response) => {
      if (response.userCtx.name !== null && response.userCtx.name === 'admin') {
        dispatch({ type: "USER_LOGGED" })
      } else {
        dispatch({ type: "USER_NOT_LOGGED"})
      }
    })
  }
}

export const save = (key, text) => {
  const path = ['defaultDoc', key, 'text'];

  return (dispatch, getState) => {
    dispatch({ type: "UPDATE_TEXT", path, text})
    const options = getOptions("PUT"); // this document has to exists
    const docToSave = getState().getIn(['app', 'defaultDoc'], Immutable.Map()).toJS()
    docToSave.id = 'default_doc';
    saveDoc(docToSave, options)
    .then((response) => {
      console.log(response);
    })
  }
}

export const toggleSidebar = () => {
  return {
    "type": "TOGGLE_SIDEBAR",
  }
}
