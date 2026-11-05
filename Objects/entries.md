# Object.entries()

`Object.entries(obj)` returns an array of `[key, value]` pairs for the object's own enumerable string-keyed properties.

```js
const person = { name: "Ali", age: 25 };

console.log(Object.entries(person));
// [["name", "Ali"], ["age", 25]]

for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}
// name Ali
// age 25
```

- Returns a new array without changing the object.
- Skips inherited, non-enumerable, and symbol-keyed properties.
- Keys are strings, even when originally written as numbers.

## Object.fromEntries()

`Object.fromEntries(pairs)` creates an object from key–value pairs: the reverse direction of `Object.entries()`.

```js
const pairs = [["name", "Ali"], ["age", 25]];

console.log(Object.fromEntries(pairs));
// { name: "Ali", age: 25 }
```

If a key appears more than once, the last value wins.
