# Array.prototype.flatMap()

`array.flatMap(callback)` transforms each element, then flattens the callback results by one level.

For ordinary arrays, it gives the same result as `array.map(callback).flat(1)`.

## Return multiple values per element

```js
console.log([1, 2, 3].flatMap(number => [number, number * 2]));
// [1, 2, 2, 4, 3, 6]
```

## Split strings into words

```js
console.log(["hello world", "learn JavaScript"].flatMap(text => text.split(" ")));
// ["hello", "world", "learn", "JavaScript"]
```

## Remove elements while mapping

Return `[]` to contribute no elements.

```js
console.log([1, 2, 3, 4].flatMap(number =>
  number % 2 === 0 ? [number * 2] : []
));
// [4, 8]
```

## Only flattens one level

```js
console.log([1, 2].flatMap(number => [[number, number * 2]]));
// [[1, 2], [2, 4]]
```

- Has no depth argument. Use `flat(depth)` when you need a chosen depth.
- Non-array callback results are added directly.
- Returns a new array; the method itself does not mutate the original array. Your callback can still cause mutations.

See also: [flat()](flat.md).
