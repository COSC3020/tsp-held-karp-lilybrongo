const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

dm = [[]];
assert(tsp_hk(dm) == 0);
console.log(`Test:`, dm); console.log(`Expected: 0, Got:`, tsp_hk(dm));

dm = [[0]];
assert(tsp_hk(dm) == 0);
console.log(`Test:`, dm); console.log(`Expected: 0, Got:`, tsp_hk(dm));

dm = [[0,0,0],
      [0,0,0],
      [0,0,0]];
assert(tsp_hk(dm) == 0);
console.log(`Test:`, dm); console.log(`Expected: 0, Got:`, tsp_hk(dm));

dm = [[0,1,2],
      [1,0,2],
      [2,2,0]];
assert(tsp_hk(dm) == 3);
console.log(`Test:`, dm); console.log(`Expected: 3, Got:`, tsp_hk(dm));
//keep getting 5, error within my current cost modification = many consol logs and debugging errors

// https://people.sc.fsu.edu/~jburkardt/datasets/tsp/tsp.html
dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];
assert(tsp_hk(dm) == 13);
console.log(`Test:`, dm); console.log(`Expected: 13, Got:`, tsp_hk(dm));
//keep getting 17
//then got 14
//working on debugging 