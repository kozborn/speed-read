import _ from "underscore";

const ServerUrl = "http://127.0.0.1:5984/speed-read";

export function getDoc(docId = "default_doc") {
  return (dispatch) => {
    dispatch({type: "FETCHING_DOC", docId});

    const documentId = _.isEmpty(docId) ? "default_doc" : docId;
    const userDocument = documentId !== "default_doc";

    return fetch(`${ServerUrl}/${documentId}`)
    .then((response) => {
      return response.json();
    })
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

function save(url, saveOptions) {
  return fetch(url, saveOptions);
}

function create(url, saveOptions) {
  return save(url, saveOptions);
}

function update(response, url, saveOptions) {
  return response.then((res) => {
    const newBody = JSON.parse(saveOptions.body);
    newBody._rev = res._rev;
    const newOptions = _.extend(saveOptions, {body: JSON.stringify(newBody)});
    return save(url, newOptions);
  });
}

export function setDocumentId(docId) {
  return {type: "SET_USER_DOCID", docId};
}

export function saveText(docId, textKey, text) {
  const method = _.isEmpty(docId) ? "POST" : "PUT";
  const url = _.isEmpty(docId) ? ServerUrl : `${ServerUrl}/${docId}`;
  const body = {};
  body[textKey] = text;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const saveOptions = {
    method,
    headers,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(body),
  };

  return (dispatch) => {
    fetch(url)
    .then((response) => {
      let next = null;
      if (response.status === 404) {
        next = create(url, saveOptions);
      } else {
        next = update(response.json(), url, saveOptions);
      }
      return next;
    })
    .then(response => response.json())
    .then((response) => {
      if (response.ok) {
        dispatch({type: "DOCUMENT_SAVED", response});
        dispatch(setDocumentId(response.id));
        // TODO Maybe try to do optymistic update?
        dispatch(getDoc(response.id));
      } else {
        dispatch({type: "DOCUMENT_SAVE_FAILED", response});
      }
    })
    .catch((ex) => {
      console.warn("Exception catched", ex);
    });
  };
}
