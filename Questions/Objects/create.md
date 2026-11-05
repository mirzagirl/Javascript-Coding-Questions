# Object.create questions

## 1. Reading inherited properties

What does each statement print? Which properties belong directly to `child`?

```js
const parent = { country: "India" };
const child = Object.create(parent);

child.name = "Sara";

console.log(child.name);
console.log(child.country);
console.log(child.age);
console.log(Object.keys(child));
```

## 2. Writable and non-enumerable

What does each statement print? Why can `p` be changed even though it does not appear in `Object.keys()`?

```js
const o2 = Object.create({}, {
  p: {
    value: 42,
    writable: true,
    enumerable: false,
    configurable: true,
  },
});

o2.p = 10;

console.log(o2.p);
console.log(Object.keys(o2));
```

## 3. A property on the prototype

What does each statement print? How is this different from question 2?

```js
const parent = { p: 42 };
const o2 = Object.create(parent);

console.log(o2.p);
console.log(Object.keys(o2));

o2.p = 10;

console.log(o2.p);
console.log(parent.p);
console.log(Object.keys(o2));
```
