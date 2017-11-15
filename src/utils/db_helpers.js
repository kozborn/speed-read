export const DEFAULT_DOC_ID = "default_doc";
export const DbUrl = "http://piotrkozubek.pl:5984/speed-read";
export const ServerUrl = "http://localhost:3000";

export const getOptions = (method, body) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return {
    method,
    headers,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(body),
  };
};

export const fetchDoc = docId =>
  fetch(`${DbUrl}/${docId}`)
    .then(response => response.json())
    .catch((ex) => {
      console.warn("parsing failed", ex);
    });
