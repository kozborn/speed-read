import _ from 'underscore';
import Immutable from 'immutable';
import { fetchDoc, getOptions, saveDoc } from '../utils/db_helpers';

export function setUserDocumentId(docId) {
  const userDocId = docId;
  localStorage.setItem("docId", userDocId);
  return { type: "SET_USER_DOCID", userDocId };
}

export function clearLocalStorage() {
  localStorage.removeItem("docId");
  return { type: "SET_USER_DOCID", userDocId: null };
}

export const checkText = (key, textId) => {
  return {type: 'SWITCH_TEXT_FOR_KEY', key, textId};
};

export const getUserDoc = (docId) => {
  return (dispatch) => {
    dispatch({type: "FETCHING_USER_DOC"});
    fetchDoc(docId)
    .then((response) => {
      if (response.error) {
        dispatch({ type: "FETCHING_ERROR", response});
      } else {
        dispatch({type: "USER_DOC_FETCHED", response});
        dispatch(setUserDocumentId(docId));
      }
    });
  };
};

export const save = () => {
  return (dispatch, getState) => {
    const userState = getState().get('user', Immutable.Map());
    const docId = userState.get('id', null);
    const method = _.isEmpty(docId) ? "POST" : "PUT";
    const docToSave = userState.get('doc', Immutable.Map());
    const options = getOptions(method);

    saveDoc(docToSave.set('id', docId).toJS(), options)
    .then((response) => {
      dispatch({type: "USER_DOC_SAVED", response});
      return response;
    })
    .then((response) => {
      dispatch(setUserDocumentId(response.id));
    })
    .catch((err) => {
      dispatch({type: "USER_DOC_SAVING_ERROR", err});
    });
  };
};

export const savePreferences = (key, preferences) => {
  return (dispatch) => {
    dispatch({ type: "SAVE_USER_PREFERENCES", key, preferences });
    dispatch(save());
  };
};

export const addText = (text) => {
  return (dispatch) => {
    dispatch({type: "ADD_NEW_TEXT", text});
    dispatch(save());
  };
};

export const clearStatus = () => {
  return {type: "CLEAR_STATUS"};
};

export const removeText = (textId) => {
  return (dispatch) => {
    dispatch({type: 'REMOVE_TEXT', textId});
    dispatch(save());
    dispatch({ type: "SHOW_NOTIFICATION", notification: {title: "Tekst usunięty", 'message': ""}});
  };
};
