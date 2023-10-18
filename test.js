const { log } = require('console');

const test = [1, 2, 3, 4, 5];

const newTest = test.reduce((acumulador, atual) => {
  if (atual % 2 !== 0) return acumulador + atual;
  return acumulador;
}, 0);
log(newTest);
