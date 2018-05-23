import _ from 'underscore'
import PouchDB from 'pouchdb';
import PouchDBAuth from 'pouchdb-authentication'

PouchDB.plugin(PouchDBAuth);

export const DEFAULT_DOC_ID = "default_doc";
export const DbUrl = window.location.hostname === 'localhost' ? 'http://localhost:5984'
  : "http://piotrkozubek.pl:5984";
export const ServerUrl = "http://localhost:3000";

const db = new PouchDB(`${DbUrl}/speed-read`, { skip_setup: true })

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
  fetch(`${DbUrl}/speed-read/${docId}`)
    .then(response => response.json())
    .catch(ex => ex);

export const fetchSession = () =>
  db.getSession()

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
