# Array.from()

`Array.from()` creates a new array from an iterable or an array-like value.

```js
Array.from(source, optionalMapFunction, optionalThisArg);
```

## String

```js
console.log(Array.from("foo"));
// ["f", "o", "o"]
```

## Array

```js
console.log(Array.from([1, 2, 3]));
// [1, 2, 3]
```

This is a shallow copy: nested objects remain shared references.

## Set

```js
console.log(Array.from(new Set([1, 2, 2, 3])));
// [1, 2, 3]
```

## Map

```js
const map = new Map([
  ["name", "Ali"],
  ["age", 25],
]);

console.log(Array.from(map));
// [["name", "Ali"], ["age", 25]]
```

## Array-like object

An array-like value has a `length` property and usually numbered properties.

```js
console.log(Array.from({
  0: "Ali",
  1: "Sara",
  length: 2,
}));
// ["Ali", "Sara"]
```

## Generate values using length

The optional mapping function receives `(value, index)`.

```js
console.log(Array.from({ length: 5 }, (_, index) => index + 1));
// [1, 2, 3, 4, 5]
```

## Transform values while creating the array

```js
console.log(Array.from([1, 2, 3], x => x + x));
// [2, 4, 6]
```

`optionalThisArg` supplies `this` for a normal mapping function. Arrow functions use their surrounding `this` instead.

## DOM collections

Run this in a browser:

```js
const buttons = document.querySelectorAll("button");
const buttonArray = Array.from(buttons);
// An array containing the matching button elements.
```

Other supported inputs include `arguments`, generators, and custom iterables.

## A normal object is not automatically converted to its values

```js
console.log(Array.from({ name: "Ali", age: 25 }));
// [] — no iterator or length.

console.log(Object.values({ name: "Ali", age: 25 }));
// ["Ali", 25]
```
