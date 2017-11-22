import { fetchDoc } from "../utils/db_helpers";

export const getDefaultDoc = () => {
  return (dispatch) => {
    dispatch({type: "FETCHING_DEFAULT_DOC"});
    fetchDoc('default_doc')
    .then((response) => {
      dispatch({ type: "DEFAULT_DOC_FETCHED", response});
    });
  };
};

export const closeNotification = () => {
  return {type: "CLOSE_NOTIFICATION"};
};

