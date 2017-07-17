import _ from "underscore";

const ServerUrl = "http://127.0.0.1:5984/speed-read";

export default {

  getText(documentId) {
    const docId = _.isEmpty(documentId) ? "sample_text" : documentId;

    return fetch(`${ServerUrl}/${docId}`)
    .then(response => response.json())
    .catch((ex) => {
      console.warn("parsing failed", ex);
    });
  },

  saveText(docId, text, key) {
    let url = "";
    let method = "";
    if (docId) {
      url = `${ServerUrl}/${docId}`;
      method = "PUT";
    } else {
      url = `${ServerUrl}`;
      method = "POST";
    }

    const body = {};
    body[key] = text;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const saveOptions = {
      method,
      headers,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(body),
    };

    return fetch(url)
    .then(response => response.status === 404 ? this.save(url, saveOptions) : response.json())
    .then((response) => {
      const newBody = JSON.parse(saveOptions.body);
      newBody._rev = response._rev;
      console.log(newBody, response);
      saveOptions.body = JSON.stringify(newBody);
      console.log(saveOptions);
      return this.save(url, saveOptions);
    })
    .catch((ex) => {
      console.warn("Exception catched", ex);
    });
  },

  save(url, saveOptions) {
    return fetch(url, saveOptions);
  },
};
