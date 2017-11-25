const fs = require('fs');
const axios = require('axios');
const querystring = require('querystring');

let txt = fs.readFileSync('text.txt',  "utf8");
txt = txt.replace(/(\r\n|\n|\r)/gm, " ");
const a = '["'+ txt + '"]'

const url = 'http://clarin.pelcra.pl/apt_pl/?sentences=' + querystring.escape(a);


axios.post(url).then(response => {
  const data = response.data.sentences[0];
  fs.writeFileSync('data.json', JSON.stringify(response.data.sentences[0]), 'utf8');
}).catch(error => console.log(error))