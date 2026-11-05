# Object.getPrototypeOf questions

## 1. Following the links

What does each statement print? Draw the prototype chain from `child` to `null`.

```js
const parent = { country: "India" };
const child = Object.create(parent);

child.name = "Sara";

console.log(Object.getPrototypeOf(child) === parent);
console.log(Object.getPrototypeOf(parent) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));
```
