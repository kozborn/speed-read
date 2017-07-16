// let instance = null;
// export default class Api {
//   constructor() {
//     if (!instance) {
//       instance = this;
//     }
//     return instance;
//   }
// }

const ServerUrl = "http://127.0.0.1:5984/speed-read";

export default {

  getText(docId = "sample_text") {
    return fetch(`${ServerUrl}/${docId}`)
    .then(response => response.json())
    .catch((ex) => {
      console.warn("parsing failed", ex);
    });
  },

  saveText(docId, text) {
    let url = "";
    let method = "";
    if (docId) {
      url = `${ServerUrl}/${docId}`;
      method = "PUT";
    } else {
      url = `${ServerUrl}`;
      method = "POST";
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const initOptions = {
      method,
      headers,
      mode: "cors",
      cache: "default",
      body: JSON.stringify({text}),
    };

    fetch(url, initOptions)
    .then(response => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((ex) => {
      console.warn("Exception catched", ex);
    });

    console.log(text);
  },
};
