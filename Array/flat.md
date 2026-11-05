# Array.prototype.flat()

`array.flat(depth)` creates a new array by flattening nested arrays up to the specified depth. The default depth is `1`.

```js
const arr = [0, 1, [2, [3, [4, 5]]]];

console.log(arr.flat());
// [0, 1, 2, [3, [4, 5]]]

console.log(arr.flat(2));
// [0, 1, 2, 3, [4, 5]]

console.log(arr.flat(3));
// [0, 1, 2, 3, 4, 5]

console.log(arr.flat(Infinity));
// [0, 1, 2, 3, 4, 5]
```

## Important points

- Depth counts nested array levels; the outer array is not counted.
- Does not change the original array.
- Makes a shallow copy; object references remain shared.
- Removes empty slots in the array levels it processes. Empty slots are different from explicit `undefined` values.

```js
console.log([1, , 3, [4, , 6]].flat());
// [1, 3, 4, 6]

console.log([1, undefined, [2]].flat());
// [1, undefined, 2]
```

See also: [flatMap()](flatMap.md).
