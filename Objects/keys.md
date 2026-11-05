# Object.keys()

`Object.keys(obj)` returns an array of the object's own enumerable string property names.

```js
const person = { name: "Ali", age: 25 };

console.log(Object.keys(person));
// ["name", "age"]
```

- Returns keys, not values.
- Skips inherited, non-enumerable, and symbol-keyed properties.
- Does not change the object.
- Number keys are returned as strings.

```js
console.log(Object.keys({ 2: "two", 1: "one" }));
// ["1", "2"] — array-index keys appear in ascending numeric order.
```
