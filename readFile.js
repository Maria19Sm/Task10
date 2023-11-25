const fs = require('fs');

const readFile = JSON.parse(fs.readFileSync('persons.txt', 'utf8'));

console.log(readFile);