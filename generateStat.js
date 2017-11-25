const fs = require('fs');
const pug = require('pug');
const compiledFunction = pug.compileFile('template.pug');

const txt = fs.readFileSync('data.json',  "utf8");
const json = JSON.parse(txt);

const c = new Set();

json.forEach(word => {
  c.add(word.udt);
})


const categories = [...c].reduce((p,c) => {
  p[c] = new Map();
  return p;
}, {});

json.forEach(obj => {
  const map = categories[obj.udt];
  const word = obj.o.toLowerCase();

  if (map.has(word)) {
    map.set(word, map.get(word) + 1);
  } else {
   map.set(word, 1);
  }
});

const len = {};

Object.keys(categories).forEach(k => {
  categories[k] = [...categories[k]].sort((a,b) => b[1] - a[1]);
  len[k] = categories[k].reduce((p,c) => p +c[1], 0);
});

const html = compiledFunction({
  sum: Object.values(len).reduce((p,c) => p+c, 0),
  categories: Object.keys(categories),
  elements: categories,
  len: len
});

fs.writeFileSync('result.html', html, 'utf8');