# Array.prototype.toString()

`array.toString()` converts an array to a string. For ordinary arrays, it uses `join()` with a comma separator.

```js
console.log([1, 2, 3].toString()); // "1,2,3"
console.log(["Ali", "Sara"].toString()); // "Ali,Sara"
console.log([].toString()); // ""
```

## Important points

- Returns a string without changing the array.
- Does not accept a custom separator; use `join(separator)` instead.
- `null`, `undefined`, and empty slots produce empty sections.
- Nested arrays become comma-separated strings; this does not actually flatten the array.

```js
console.log([1, null, undefined, 4].toString()); // "1,,,4"
console.log([1, [2, [3, 4]]].toString()); // "1,2,3,4"
console.log([{ name: "Ali" }].toString()); // "[object Object]"
```

## Related methods

| Method | Purpose |
| --- | --- |
| `toString()` | Convert an array to a comma-separated string |
| [`join(separator)`](join.md) | Convert to a string with a chosen separator |
| [`toLocaleString(locales, options)`](toLocaleString.md) | Convert elements using locale-aware formatting |

For structured text that preserves nested arrays and object properties, use JSON:

```js
console.log(JSON.stringify([1, { name: "Ali" }]));
// '[1,{"name":"Ali"}]'
```
