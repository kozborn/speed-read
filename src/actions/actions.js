import _ from "underscore";

const ServerUrl = "http://127.0.0.1:5984/speed-read";

export function getDoc(docId = "sample_text") {
  return (dispatch) => {
    dispatch({type: "FETCHING_DOC", docId});

    const documentId = _.isEmpty(docId) ? "sample_text" : docId;

    return fetch(`${ServerUrl}/${documentId}`)
    .then(response => response.json())
    .then((response) => {
      console.log(response);
      dispatch({type: "DOC_FETCHED", response});
    })
    .catch((ex) => {
      console.warn("parsing failed", ex);
    });
  };
}
