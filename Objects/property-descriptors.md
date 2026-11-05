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
