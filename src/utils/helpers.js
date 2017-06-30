export function generateTable (count) {
  const table = [];
  for (let i = 0; i < count; i++){
    table.push(i + 1);
  }
  return shuffle(table);
}

// Fisher–Yates shuffle https://bost.ocks.org/mike/shuffle/

function shuffle(array) {
  var m = array.length, t, i;

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
