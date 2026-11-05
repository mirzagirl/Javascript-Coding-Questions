# Object.preventExtensions()

`Object.preventExtensions(obj)` stops new own properties from being added to an object. It changes the object and returns the same object.

```js
const person = { name: "Ali" };

Object.preventExtensions(person);

// Run without strict mode:
person.age = 25; // Fails silently; throws a TypeError in strict mode.
console.log(person.age); // undefined

person.name = "Sara"; // Existing writable properties can still change.
console.log(person.name); // "Sara"

delete person.name; // Existing configurable properties can still be deleted.
console.log(person); // {}
```

## Check whether new properties are allowed

```js
const obj = {};

console.log(Object.isExtensible(obj)); // true
Object.preventExtensions(obj);
console.log(Object.isExtensible(obj)); // false
```

## Important points

- Does not automatically make existing properties non-writable or non-configurable.
- Cannot be undone: the object cannot become extensible again.
- Adding a property with `Object.defineProperty()` throws a `TypeError`, even without strict mode.
- A deleted property cannot be added back while the object is non-extensible.
- Does not make nested objects non-extensible.
