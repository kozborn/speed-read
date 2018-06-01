import Immutable from 'immutable';
import { fetchDoc, getOptions, saveDoc, fetchSession, logUser, getUserFromDb } from "../utils/db_helpers";

export const getDefaultDoc = () => {
  return (dispatch) => {
    dispatch({type: "FETCHING_DEFAULT_DOC"});
    fetchDoc('default_doc')
    .then((response) => {
      dispatch({ type: "DEFAULT_DOC_FETCHED", response});
    });
  };
};

export const logIn = (username, password) => {
  return (dispatch) => {
    logUser(username, password)
    .then((response) => {
      if (response.ok && response.name) {
        // dispatch({ type: 'USER_LOGGED', userData: { name: response.name, roles: response.roles }});

      }
    })
  }
}

export const getUser = (username) => {
  return getUserFromDb(username);
}

export const checkIfUserLogged = () => {
  return (dispatch) => {
    fetchSession()
    .then((response) => {
      if (response.userCtx.name !== null && response.userCtx.name === 'admin') {
        dispatch({ type: "ADMIN_LOGGED"})
      } else if (response.userCtx.name !== null) {
        dispatch({ type: "USER_LOGGED", userData: response.userCtx })
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
