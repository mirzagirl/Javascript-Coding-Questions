# Array.prototype.toLocaleString()

`array.toLocaleString(locales, options)` converts the elements to strings using their own `toLocaleString()` methods, then combines the results with a separator.

Useful for arrays containing numbers or dates that need regional formatting.

```js
const numbers = [1234.5];

console.log(numbers.toLocaleString("en-US"));
// "1,234.5"

console.log(numbers.toLocaleString("de-DE"));
// "1.234,5"
```

## Currency formatting

```js
console.log([25].toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
}));
// "$25.00"
```

## Important points

- Returns a string without changing the array.
- Locale and options are passed to each element's formatting method; their effect depends on the element type.
- Without an explicit locale, formatting uses the environment's default.
- Exact formatting can vary across environments and locale data.
- For a custom separator, format the elements and use `join()`:

```js
const prices = [25, 50];
const formatted = prices.map(price => price.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
}));

console.log(formatted.join(" | ")); // "$25.00 | $50.00"
```

See also: [toString()](toString.md) and [join()](join.md).
