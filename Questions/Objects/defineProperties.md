# Object.defineProperties questions

## 1. Existing and new properties

Predict the values and keys printed below. What are the `enumerable` and `configurable` settings for each property after the call?

```js
const obj = { property1: false };

Object.defineProperties(obj, {
  property1: {
    value: true,
    writable: true,
  },
  property2: {
    value: "Hello",
    writable: false,
  },
});

console.log(obj.property1);
console.log(obj.property2);
console.log(Object.keys(obj));
```

What might `console.log(obj)` show in a console preview? Can the preview alone tell you every property that exists?

## 2. Changing a property

Run this as a standalone script without strict mode. What does it print? What changes if strict mode is enabled?

```js
const obj = {};

Object.defineProperties(obj, {
  property2: {
    value: "Hello",
    writable: false,
  },
});

obj.property2 = "Changed";

console.log(obj.property2);
```
