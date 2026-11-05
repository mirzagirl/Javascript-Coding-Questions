const array = [1, 2, 3, 4, 5, 6];

// 1. reduce(): the returned value becomes the next iteration's accumulator.
// This intentionally returns a NEW [2] each time instead of returning acc.
const newArr = array.reduce((acc, el) => {
  acc.push(el * 2);
  return [2];
}, []);

console.log(newArr);
// [2]
// The final callback also returns a new [2], which becomes the reduce result.

// To collect all doubled values, return the array you pushed into.
const doubled = array.reduce((acc, el) => {
  acc.push(el * 2);
  return acc;
}, []);

console.log(doubled);
// [2, 4, 6, 8, 10, 12]

// 2. some(): returns true if at least one element passes the condition.
// Stops when it finds the first even number: 2.
const new2 = array.some((el) => el % 2 === 0);

console.log(new2);
// true

// 3. map(): creates a new array by transforming every element.
// ({ el }) returns an object. The parentheses distinguish it from a function body.
// { el } is shorthand for { el: el }.
const new3 = array.map((el) => ({ el }));

console.log(new3);
// [{ el: 1 }, { el: 2 }, { el: 3 }, { el: 4 }, { el: 5 }, { el: 6 }]

console.log(array);
// [1, 2, 3, 4, 5, 6] — these examples leave the original array unchanged.
