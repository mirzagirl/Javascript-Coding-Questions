# Prototype basics

A prototype is an ordinary object that another object falls back to when a property is missing.

## Basic example

```js
const parent = {
  country: "India",
};

// Create an object whose prototype is parent.
const child = Object.create(parent);
child.name = "Sara";

console.log(child.name);    // "Sara" — found directly on child
console.log(child.country); // "India" — found on parent
```

```text
child: { name: "Sara" }
  │
  └── [[Prototype]] → parent: { country: "India" }
```

`[[Prototype]]` is JavaScript's internal name for the hidden link. It is not syntax you can use to access the prototype.

When reading `child.country`, JavaScript checks `child` first, then follows the link to `parent`. The property is not copied into `child`.

## Accessing the prototype

`Object.getPrototypeOf(child)` returns the object linked as its prototype.

```js
console.log(Object.getPrototypeOf(child));
// { country: "India" }

console.log(Object.getPrototypeOf(child) === parent);
// true
```

## The prototype chain

The prototype can have its own prototype. JavaScript follows these links until it finds the property or reaches `null`.

```text
child → parent → Object.prototype → null
```

`null` means there is no next object. If the property is missing throughout the chain, reading it returns `undefined`.

```js
console.log(child.age); // undefined
```

## A property on the child takes priority

```js
child.country = "Canada";

console.log(child.country);  // "Canada" — found directly on child
console.log(parent.country); // "India" — unchanged
```

JavaScript finds `country` on `child`, so it does not continue searching its prototype.

## Ordinary objects

An object created with `{}` normally has `Object.prototype` as its prototype.

```js
const person = { name: "Ali" };

console.log(Object.getPrototypeOf(person) === Object.prototype);
// true
```

```text
person → Object.prototype → null
```

`person.prototype` does not access this hidden link. A constructor function's `.prototype` property is a separate concept.
