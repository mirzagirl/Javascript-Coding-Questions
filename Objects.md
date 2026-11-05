# Objects

## Object.assign()

`Object.assign(target, ...sources)` copies own enumerable properties from source objects into the target.

- Changes the target and returns the same object.
- Later sources overwrite earlier values for matching keys.
- Makes a shallow copy: nested objects and arrays remain shared references.

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const source2 = { b: 5, d: 5 };

const returnedTarget = Object.assign(target, source, source2);

console.log(target);
// { a: 1, b: 5, c: 5, d: 5 }

console.log(returnedTarget === target);
// true
```

`b` ends as `5` because `source2` is applied last.
