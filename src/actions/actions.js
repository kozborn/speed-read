import _ from "underscore";
import {Map, fromJS} from "immutable";

const ServerUrl = "http://127.0.0.1:5984/speed-read";

export function getDoc(docId = "default_doc") {
  return (dispatch) => {
    dispatch({type: "FETCHING_DOC", docId});

    const documentId = _.isEmpty(docId) ? "default_doc" : docId;
    const userDocument = documentId !== "default_doc";

    return fetch(`${ServerUrl}/${documentId}`)
    .then(response => response.json())
    .then((response) => {
      if (userDocument) {
        dispatch({type: "USER_DOC_FETCHED", response});
      } else {
        dispatch({type: "DOC_FETCHED", response});
      }
    })
    .catch((ex) => {
      console.warn("parsing failed", ex);
    });
  };
}

function fetchDoc(docId) {
  return fetch(`${ServerUrl}/${docId}`)
  .then(response => response.json());
}

function getOptions(method, body) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return {
    method,
    headers,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(body),
  };
}

export function setDocumentId(docId) {
  localStorage.setItem("docId", docId);
  return {type: "SET_USER_DOCID", docId};
}

export function clearLocalStorage() {
  localStorage.removeItem("docId");
  return {type: "SET_USER_DOCID", docId: null};
}

export function save(docId, data) {
  const method = _.isEmpty(docId) ? "POST" : "PUT";
  const url = _.isEmpty(docId) ? ServerUrl : `${ServerUrl}/${docId}`;
  return (dispatch, getState) => {
    const userDoc = Map.isMap(getState().getIn(["app", "userDoc"])) ? getState().getIn(["app", "userDoc"]) : new Map();
    const bodyToSave = userDoc.mergeDeep(fromJS(data));
    const options = getOptions(method, bodyToSave.toJS());
    fetch(url, options)
    .then((response) => {
      if (response.status === 409) {
        return fetchDoc(docId)
        .then((e) => {
          dispatch(save(docId, _.extend(bodyToSave.toJS(), {_rev: e._rev})));
        });
      }
      return response;
    })
    .then(response => response.json())
    .then((response) => {
      dispatch({type: "DOCUMENT_SAVED", response});
      dispatch(setDocumentId(response.id));
      // TODO try to do optymistic update?
      dispatch(getDoc(response.id));
    })
    .catch((e) => {
      console.warn("Exception catched", e);
    });
  };
}

export function saveText(docId, textKey, text) {
  const body = {};
  body[textKey] = text;

  console.log(body);
  return dispatch => dispatch(save(docId, body));
}

export function savePreferences(docId, key, value) {
  return (dispatch) => {
    const preferences = {};
    preferences[key] = value;
    dispatch({type: "SAVING_PREFERENCES", preferences});
    dispatch(save(docId, {preferences}));
  };
}
