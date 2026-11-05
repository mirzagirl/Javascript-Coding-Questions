# Array.prototype.splice()

`array.splice(start, deleteCount, ...items)` removes, inserts, or replaces elements. It changes the original array and returns an array of removed elements.

## Remove

```js
const numbers = [10, 20, 30, 40];
const removed = numbers.splice(1, 2);

console.log(numbers); // [10, 40]
console.log(removed); // [20, 30]
```

## Insert without removing

```js
const letters = ["a", "d"];
const removed = letters.splice(1, 0, "b", "c");

console.log(letters); // ["a", "b", "c", "d"]
console.log(removed); // []
```

## Replace

```js
const colors = ["red", "blue", "green"];
const removed = colors.splice(1, 1, "yellow");

console.log(colors);  // ["red", "yellow", "green"]
console.log(removed); // ["blue"]
```

## Important points

- `start` is an index, not a value to search for.
- A negative `start` counts backward from the end.
- Omitting `deleteCount` removes everything from `start` onward.
- `deleteCount: 0` removes nothing; additional arguments are inserted.
- The return value contains removed elements, not the updated array.

```js
const numbers = [1, 2, 3, 4];
console.log(numbers.splice(-2)); // [3, 4]
console.log(numbers);            // [1, 2]
```

See also: [slice()](slice.md).
