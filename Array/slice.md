# Array.prototype.slice()

`array.slice(start, end)` returns a new array containing elements from `start` up to, but not including, `end`. It does not change the original array.

```js
const numbers = [10, 20, 30, 40, 50];
const result = numbers.slice(1, 4);

console.log(result);  // [20, 30, 40]
console.log(numbers); // [10, 20, 30, 40, 50]
```

## Common uses

```js
const numbers = [10, 20, 30, 40, 50];

console.log(numbers.slice(2));     // [30, 40, 50] — omitted end means array length.
console.log(numbers.slice(-2));    // [40, 50] — last two elements.
console.log(numbers.slice(1, -1));  // [20, 30, 40] — excludes the final element.
console.log(numbers.slice());      // [10, 20, 30, 40, 50] — shallow copy.
console.log(numbers.slice(3, 1));   // [] — end comes before start.
```

## A shallow copy shares object references

```js
const original = [{ name: "Ali" }];
const copy = original.slice();

copy[0].name = "Sara";
console.log(original[0].name); // "Sara"
```

## slice versus splice

| Method | Changes original array? | Second argument | Returns |
| --- | --- | --- | --- |
| `slice(start, end)` | No | End index, excluded | Selected elements in a new array |
| `splice(start, deleteCount, ...items)` | Yes | Number of elements to remove | Removed elements in a new array |

See also: [splice()](splice.md).
