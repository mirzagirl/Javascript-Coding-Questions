# Property descriptors

A property descriptor contains settings that describe how one object's property behaves.

```js
constructor: {
  value: Rectangle,
  enumerable: false,
  writable: true,
  configurable: true,
}
```

Here, `constructor` is the property name. The settings apply to that property, not the entire object.

| Setting | Meaning |
| --- | --- |
| `value: Rectangle` | Stores the `Rectangle` function as the property's value. It does not call the function. |
| `enumerable: false` | Excludes the property from `Object.keys()` and `for...in` enumeration. Direct access still works. |
| `writable: true` | Allows changing the property's value later. |
| `configurable: true` | Allows deleting the property or changing its settings later. |

## Example

```js
function Shape() {}
function Rectangle() {}

Rectangle.prototype = Object.create(Shape.prototype, {
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

// Direct access works even though enumerable is false.
console.log(Rectangle.prototype.constructor === Rectangle); // true
console.log(Object.keys(Rectangle.prototype)); // []

// Allowed because writable is true.
Rectangle.prototype.constructor = Shape;
console.log(Rectangle.prototype.constructor === Shape); // true

// Allowed because configurable is true.
console.log(delete Rectangle.prototype.constructor); // true
```

When using property descriptors with `Object.create()` or `Object.defineProperty()`, omitted `writable`, `enumerable`, and `configurable` settings default to `false`. Ordinary properties written directly in an object literal have these settings set to `true`.

## Does Object.create() restrict every property?

No. Creating an object with `Object.create()` does not automatically restrict all its properties. The defaults depend on how you add each property.

### Only passing a prototype

```js
const parent = { country: "India" };
const child = Object.create(parent);

child.name = "Sara";
```

Because `name` is a new own property added through ordinary assignment, its settings are:

```js
// value: "Sara"
// writable: true
// enumerable: true
// configurable: true
```

You can change it, list it with `Object.keys(child)`, or delete it.

### Passing a property descriptor as the second argument

```js
const child = Object.create(parent, {
  name: {
    value: "Sara",
  },
});
```

For this newly defined property, the omitted flags default to `false`:

```js
// value: "Sara"
// writable: false
// enumerable: false
// configurable: false
```

`name` cannot be reassigned or deleted, and it does not appear in `Object.keys(child)`. Attempts to change or delete it fail silently in non-strict code and throw a `TypeError` in strict mode.

### Explicitly allowing normal behavior

```js
const child = Object.create(parent, {
  name: {
    value: "Sara",
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

child.name = "Ali";              // Allowed
console.log(Object.keys(child)); // ["name"]
delete child.name;               // Allowed
```

These settings apply to the individual property, not the entire object. Even if `name` is restricted, you can still add another property:

```js
const child = Object.create(parent, {
  name: { value: "Sara" },
});

child.age = 25; // Allowed; name's restrictions do not apply to age.
```

## Writable but non-enumerable property

```js
const o2 = Object.create(
  {},
  {
    p: {
      value: 42,
      writable: true,
      enumerable: false,
      configurable: true,
    },
  },
);

o2.p = 10; // Allowed because writable is true.

console.log(o2.p);           // 10
console.log(Object.keys(o2)); // [] — p is non-enumerable.
```

`p` belongs directly to `o2`. It can be read and changed, but `enumerable: false` excludes it from `Object.keys(o2)`.

This is different from putting `p` on the prototype:

```js
const another = Object.create({ p: 42 });

console.log(another.p);            // 42 — inherited from the prototype.
console.log(Object.keys(another)); // [] — no own enumerable properties.

another.p = 10; // Creates a new own property; the inherited p is writable.

console.log(another.p);            // 10
console.log(Object.keys(another)); // ["p"] — the new own property is enumerable.
console.log(Object.getPrototypeOf(another).p); // 42 — prototype unchanged.
```

Both objects initially return `[]` from `Object.keys()`, but for different reasons: `o2` has a non-enumerable own property; `another` initially inherits its property.
