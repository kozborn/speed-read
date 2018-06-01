import _ from 'underscore'
import PouchDb from 'pouchdb'
import PouchAuthentication from 'pouchdb-authentication'
import { checkIfUserLogged } from '../actions/app-actions';
export const DEFAULT_DOC_ID = "default_doc";
export const DbUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5984'
: "http://piotrkozubek.pl:5984";
export const ServerUrl = "http://localhost:3000";

PouchDb.plugin(PouchAuthentication);
const db = new PouchDb('http://localhost:5984/speed-read', { skip_setup: true });
const dbName = `${DbUrl}/speed-read`

export const getOptions = (method) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return {
    method,
    headers,
    credentials: true,
    mode: "cors",
    cache: "default",
  };
};

export const fetchDoc = docId =>
  fetch(`${dbName}/${docId}`)
    .then(response => response.json())
    .catch(ex => ex);

export const fetchSession = () => {
  return db.getSession()
  .catch(ex => ex);
}

export const logUser = (user, pass) => {
  return db.logIn(user, pass)
  .catch(ex => ex);
}

export const getUserFromDb = (username) => {
  return db.getUser(username)
  .catch(ex => ex)
}

export const saveDoc = (data, options = {}) => {
  const url = _(data.id).isEmpty() ? DbUrl : `${DbUrl}/${data.id}`;
  return fetch(url, _.extend(options, {body: JSON.stringify(data)}))
  .then((response) => {
    if (response.status === 409) {
      return fetchDoc(data.id)
        .then((e) => {
          return saveDoc(_.extend(data, { _rev: e._rev }), options);
        });
    }
    return response.json();
  })
  .catch(ex => ex);
};
