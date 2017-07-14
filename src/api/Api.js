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

  text: "",

  getText() {
    return fetch(`${ServerUrl}/sample_text`)
    .then(response => response.json())
    .catch((ex) => {
      console.warn("parsing failed", ex);
    });
  },

  saveText(text) {
    console.log(text);
  },
};
