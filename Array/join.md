# Array.prototype.join()

`array.join(separator)` combines array elements into one string. The default separator is a comma.

```js
const words = ["hello", "world"];

console.log(words.join());    // "hello,world"
console.log(words.join(" ")); // "hello world"
console.log(words.join("-")); // "hello-world"
console.log(words.join(""));  // "helloworld"
```

## Important points

- Returns a string without changing the array.
- An empty array produces `""`.
- `null`, `undefined`, and empty slots produce empty sections.
- The chosen separator applies only to the outer array. Nested arrays normally use their own comma-based string conversion.

```js
console.log([1, null, undefined, 4].join("-")); // "1---4"
console.log([1, [2, 3], 4].join("-"));         // "1-2,3-4"
```

See also: [toString()](toString.md).
