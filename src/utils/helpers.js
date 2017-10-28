import {Map, List, fromJS} from "immutable";

export function generateTable(count) {
  const table = [];
  for (let i = 0; i < count; i++) {
    table.push(i + 1);
  }
  return shuffle(table);
}

// Fisher–Yates shuffle https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export function stringDivider(str, width, prefix, postfix) {
  if (str.length > width) {
    let p = width;
    for (;p > 0 && !/\s/.test(str[p]); p--) {}
    if (p > 0) {
      const left = str.substring(0, p);
      const right = str.substring(p + 1);
      return prefix + left + postfix + stringDivider(right, width, prefix, postfix);
    }
  }
  return prefix + str + postfix;
}

export function getTextsFromDocument(document) {
  if (document.isEmpty()) return new List();

  const tmpTexts = document.reduce((acc, currentKey) => {
    if (Map.isMap(currentKey) && currentKey.keySeq().last() === "text") {
      acc.push(currentKey);
    }
    return acc;
  }, []);
  return fromJS(tmpTexts);
}

export function guid() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
    s4() + "-" + s4() + s4() + s4();
}

export function getNextId(document) {
  const texts = getTextsFromDocument(document);
  if (texts.isEmpty()) {
    return "text-1";
  }
  const [key, id] = (texts.last().get("id")).split("-");

  return `text-${parseInt(id) + 1}`;
}

const ALLOWED_TAGS = ["H3", "H2", "H1", "DIV", "P"];

function usurp(p) {
  // "Replace parent 'p' with its children.";
  let last = p;
  for (let i = p.childNodes.length - 1; i >= 0; i--) {
    const e = p.removeChild(p.childNodes[i]);
    p.parentNode.insertBefore(e, last);
    last = e;
  }
  p.parentNode.removeChild(p);
}

function sanitize(el) {
    // "Remove all tags from element `el' that aren't in the ALLOWED_TAGS list."
  const tags = Array.prototype.slice.apply(el.getElementsByTagName("*"), [0]);
  for (let i = 0; i < tags.length; i++) {
    while (tags[i].attributes.length > 0) {
      tags[i].removeAttribute(tags[i].attributes[0].name);
    }
    if (ALLOWED_TAGS.indexOf(tags[i].nodeName) === -1) {
      usurp(tags[i]);
    }
  }
}

export function sanitizeString(string) {
  const div = document.createElement("div");
  div.innerHTML = string;
  sanitize(div);
  return div.innerHTML;
}

export const sliceHTMLText = (text, desiredContentLength = 200) => {
  const el = document.createElement("div");
  el.innerHTML = text;
  return el.textContent.slice(0, desiredContentLength);
};

export const flattenHTML = (html) => {
  // TODO this needs to be more bulletproof and usefull for fixations switcher
  const el = document.createElement("div");
  const flattenEl = document.createElement("div");
  el.innerHTML = html;
  const elements = el.getElementsByTagName("*");

  if (elements.length === 0) {
    const wrapper = document.createElement("div");
    wrapper.appendChild(el);
    return flattenEl.appendChild(wrapper);
  }

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].firstChild && elements[i].firstChild.nodeType === Node.TEXT_NODE) {
      const wrapper = document.createElement("div");
      wrapper.innerText = elements[i].textContent;
      flattenEl.appendChild(wrapper);
    }
  }
  return flattenEl;
};
