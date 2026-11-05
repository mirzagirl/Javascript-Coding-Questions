# Object.hasOwn()

Checks whether a property belongs directly to an object. Returns `true` for an own property and `false` for an inherited or missing property.

```js
Object.hasOwn(object, propertyName);
```

## Own versus inherited

```js
const parent = { country: "India" };
const child = Object.create(parent);
child.name = "Sara";

console.log(Object.hasOwn(child, "name"));    // true
console.log(Object.hasOwn(child, "country")); // false
console.log(Object.hasOwn(child, "age"));     // false

console.log("country" in child); // true — in also checks prototypes.
```

## Existence is different from truthiness

```js
const obj = { active: false, empty: null, missing: undefined };

console.log(Object.hasOwn(obj, "active"));  // true
console.log(Object.hasOwn(obj, "empty"));   // true
console.log(Object.hasOwn(obj, "missing")); // true

delete obj.missing;
console.log(Object.hasOwn(obj, "missing")); // false
```

## Why prefer it over hasOwnProperty()?

It also works when an object has no prototype or defines its own property named `hasOwnProperty`.

```js
const dictionary = Object.create(null);
dictionary.name = "Ali";

console.log(Object.hasOwn(dictionary, "name")); // true
// dictionary.hasOwnProperty("name") would throw: the method is absent.
```

## Important points

- Use `Object.hasOwn(obj, key)`, not `obj.hasOwn(key)`.
- Accepts string or symbol property keys; array indices work too.
- It checks ownership, not the property's value or enumerability.

Source: [MDN — Object.hasOwn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn).
