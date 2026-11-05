# Object.is()

`Object.is(a, b)` returns a boolean indicating whether two values are the same. It does not convert their types.

```js
console.log(Object.is(10, 10));       // true
console.log(Object.is("10", 10));     // false
console.log(Object.is(null, null));   // true
console.log(Object.is(null, undefined)); // false
```

## Differences from ===

The only differences are how they compare `NaN` and signed zeros.

| Comparison | `===` | `Object.is()` |
| --- | --- | --- |
| `NaN`, `NaN` | `false` | `true` |
| `+0`, `-0` | `true` | `false` |
| `-0`, `-0` | `true` | `true` |
| `"10"`, `10` | `false` | `false` |

```js
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0));    // false
console.log(Object.is(-0, -0));   // true
```

## Objects are compared by reference

Matching contents do not make separate objects equal.

```js
const first = { name: "Ali" };
const second = { name: "Ali" };
const same = first;

console.log(Object.is(first, second)); // false
console.log(Object.is(first, same));   // true
console.log(Object.is([], []));       // false
```

Use `Object.is()` when the distinction between signed zeros or equality of `NaN` matters. It does not perform a deep comparison.

Source: [MDN — Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
