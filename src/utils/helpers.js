export function generateTable (count) {
  const table = [];
  for (let i = 0; i < count; i++){
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
    for (;p > 0 && !/\s/.test(str[p]); p--) {
    }
    if (p > 0) {
      const left = str.substring(0, p);
      const right = str.substring(p+1);
      return prefix + left + postfix + stringDivider(right, width, prefix, postfix);
    }
  }
  return prefix + str + postfix;
}
