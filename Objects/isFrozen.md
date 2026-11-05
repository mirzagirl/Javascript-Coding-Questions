# Object.isFrozen()

`Object.isFrozen(obj)` returns `true` if an object is frozen; otherwise, it returns `false`. It checks the object without changing it.

An object is frozen when:

- New own properties cannot be added.
- Every own property is non-configurable: it cannot be deleted or freely redefined.
- Every own data property is non-writable: its stored value cannot be reassigned.

## Basic example

```js
const person = { name: "Ali" };

console.log(Object.isFrozen(person)); // false

Object.freeze(person);

console.log(Object.isFrozen(person)); // true
```

`Object.freeze()` freezes an object. `Object.isFrozen()` only checks its state.

## Freezing is shallow

```js
const settings = {
  theme: { dark: true },
};

Object.freeze(settings);

console.log(Object.isFrozen(settings));       // true
console.log(Object.isFrozen(settings.theme)); // false

settings.theme.dark = false; // Allowed: the nested object is not frozen.
console.log(settings.theme.dark); // false
```

## Important points

- A new empty object is not frozen: `Object.isFrozen({})` returns `false`.
- Preventing new properties alone does not normally freeze existing properties.
- Frozen objects can still have getters and setters; an existing setter may still run.
- Attempts to add, reassign, or delete restricted properties fail; in strict mode, these attempts throw a `TypeError`.
- In modern JavaScript, primitive arguments such as `42` or `null` return `true`.

Source: [MDN — Object.isFrozen()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen).
