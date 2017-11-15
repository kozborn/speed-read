import { fetchDoc } from '../utils/db_helpers';

export function setUserDocumentId(docId) {
  const userDocId = docId;
  localStorage.setItem("docId", userDocId);
  return { type: "SET_USER_DOCID", userDocId };
}

export function clearLocalStorage() {
  localStorage.removeItem("docId");
  return { type: "SET_USER_DOCID", userDocId: null };
}

export const getUserDoc = (docId) => {
  return (dispatch) => {
    dispatch({type: "FETCHING_USER_DOC"});
    fetchDoc(docId)
    .then((response) => {
      dispatch({type: "USER_DOC_FETCHED", response});
    })
    .then(() => dispatch(setUserDocumentId(docId)));
  };
};
