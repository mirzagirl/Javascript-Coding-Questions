# Object.assign questions

## 1. Multiple sources

What does each statement print? Which source determines the final value of `b`?

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const source2 = { b: 5, d: 5 };

const returnedTarget = Object.assign(target, source, source2);

console.log(target);
console.log(returnedTarget === target);
```

## 2. Nested objects

What does the final statement print? Explain why.

```js
const original = { address: { city: "Mumbai" } };
const copy = Object.assign({}, original);

copy.address.city = "Delhi";

console.log(original.address.city);
```
