# Object.defineProperty()

Adds a property directly to an object, or modifies an existing property, and returns the same object.

```js
Object.defineProperty(object, "propertyName", settings);
```

## Two kinds of properties

| Kind | Settings | Behavior |
| --- | --- | --- |
| Data property | `value`, `writable` | Stores a value. |
| Accessor property | `get`, `set` | Runs functions when read or assigned. |

Both kinds can use `enumerable` and `configurable`. You cannot mix `value` or `writable` with `get` or `set` in the same descriptor; doing so throws a `TypeError`.

## Getters and setters

- `get` runs when you read the property. Its return value becomes the value you read.
- `set` runs when you assign to the property. It receives the assigned value as its argument.
- Access the property normally, without parentheses.

```js
const person = {
  firstName: "Ali",
};

Object.defineProperty(person, "name", {
  get() {
    return this.firstName;
  },

  set(newName) {
    this.firstName = newName;
  },

  enumerable: true,
  configurable: true,
});

console.log(person.name); // "Ali" — calls the getter.

person.name = "Sara"; // Calls the setter with "Sara".

console.log(person.name);      // "Sara"
console.log(person.firstName); // "Sara"
```

The setter does not automatically store a value. Its function decides what happens to the assigned value. Here, it stores the value in `firstName`.

## Are get and set present on every object?

No. A normal data property does not automatically have getter and setter functions.

```js
const person = { age: 25 };

console.log(person.age); // Reads the stored value directly.
person.age = 30;         // Changes the stored value directly.
```

An accessor must be explicitly defined, or inherited from a prototype.

## Important points

- For a new property defined with `Object.defineProperty()`, omitted `writable`, `enumerable`, and `configurable` settings default to `false`.
- When modifying an existing property, omitted settings are generally preserved. Changing the property between data and accessor kinds follows additional rules.
- A getter without a setter allows reading, but assignment fails: silently in non-strict code, or with a `TypeError` in strict mode.
- A setter without a getter allows assignment, but reading the property returns `undefined`.
- `writable` applies to data properties. For an accessor, a setter handles assignment instead.
- `Object.defineProperty()` itself defines the property without calling its setter.

See also: [Property descriptor settings](property-descriptors.md).

Source: [MDN — Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
