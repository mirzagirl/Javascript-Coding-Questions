# Promises

A Promise represents the eventual success value or failure reason of an asynchronous operation.

## Creating promises

The executor passed to `new Promise()` runs immediately; `.then(onFulfilled, onRejected)` handles its eventual result asynchronously.

```js
let PromiseOne = new Promise((resolve, reject) => {
    if (Math.random() * 10 < 5) resolve("Promise 1 Resolved");
    else reject("Promise 1 Rejected");
});

let PromiseTwo = new Promise((resolve, reject) => {
    if (Math.random() * 10 < 5) resolve("Promise 2 Resolved");
    else reject("Promise 2 Rejected");
});

let PromiseThree = new Promise((resolve, reject) => {
    if (Math.random() * 10 < 5) resolve("Promise 3 Resolved");
    else reject("Promise 3 Rejected");
});

let PromiseFour = new Promise((resolve, reject) => {
    if (Math.random() * 10 < 5) resolve("Promise 4 Resolved");
    else reject("Promise 4 Rejected");
});

PromiseThree.then(
    (value) => console.log("Success:", value),
    (reason) => console.log("Error:", reason)
);

// Handle the other promises too, so random failures are not left unhandled.
Promise.allSettled([PromiseOne, PromiseTwo, PromiseThree, PromiseFour])
    .then((results) => console.log("Random results:", results));
```

The output varies because each promise randomly succeeds or fails. The callback names `value` and `reason` describe their arguments; these callbacks are not the executor's `resolve` and `reject` functions.

## Helper used below

`promiseFunc(message, wait, isResolved)` fulfills or rejects with `message` after a timer delay in milliseconds.

```js
const promiseFunc = function (message, wait, isResolved) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isResolved) {
                return resolve(message);
            }
            return reject(message);
        }, wait);
    });
};
```

Run each example below with this helper available. Timers specify a minimum delay; actual execution can occur later.

## Promise.race()

Waits for the first promise to settle, then fulfills with its value or rejects with its reason.

```js
Promise.race([
    promiseFunc("Promise 1", 500, true),
    promiseFunc("Promise 2", 1000, true),
    promiseFunc("Promise 3", 2000, true),
    promiseFunc("Promise 4", 300, true)
]).then(
    (value) => console.log("Success:", value),
    (reason) => console.log("Error:", reason)
);
// Success: Promise 4
```

Correction: it does not wait for a failure or the last success. Here Promise 4 wins because its timer finishes first. Changing its flag to `false` would produce `Error: Promise 4`.

## Promise.any()

Waits for the first fulfillment; if all promises reject, rejects with an `AggregateError` containing their reasons.

```js
Promise.any([
    promiseFunc("Promise 1", 500, false),
    promiseFunc("Promise 2", 1000, false),
    promiseFunc("Promise 3", 2000, false),
    promiseFunc("Promise 4", 3000, false)
]).then(
    (value) => console.log("Success:", value),
    (error) => {
        console.log("Error:", error.name);
        console.log("Reasons:", error.errors);
    }
);
// Error: AggregateError
// Reasons: ["Promise 1", "Promise 2", "Promise 3", "Promise 4"]
```

Your definition was essentially correct. The rejection is one `AggregateError`; its `.errors` array contains all rejection reasons in input order. If Promise 3's flag were `true`, the result would be `Success: Promise 3`, despite earlier failures.

## Promise.allSettled()

Waits for every promise to fulfill or reject, then fulfills with an array of outcome objects in input order.

```js
Promise.allSettled([
    promiseFunc("Promise 1", 500, true),
    promiseFunc("Promise 2", 1000, false),
    promiseFunc("Promise 3", 2000, true),
    promiseFunc("Promise 4", 3000, false)
]).then((results) => console.log(results));
// [
//   { status: "fulfilled", value: "Promise 1" },
//   { status: "rejected", reason: "Promise 2" },
//   { status: "fulfilled", value: "Promise 3" },
//   { status: "rejected", reason: "Promise 4" }
// ]
```

Your idea was correct; this adds the missing example. An input rejection becomes a result object instead of rejecting the combined promise.

## Promise.all()

Rejects on the first rejection; otherwise waits for all promises to fulfill and returns their values in input order.

```js
Promise.all([
    promiseFunc("Promise 1", 500, true),
    promiseFunc("Promise 2", 1000, true),
    promiseFunc("Promise 3", 2000, true),
    promiseFunc("Promise 4", 3000, true)
]).then(
    (values) => console.log("Success:", values),
    (reason) => console.log("Error:", reason)
);
// Success: ["Promise 1", "Promise 2", "Promise 3", "Promise 4"]
```

Your code and definition were correct. The values keep their input order even if completion order differs. If Promise 2's flag were `false`, the combined promise would reject with `Promise 2` without waiting for the later timers.

## Promise.all learning polyfill

[Runnable implementation and examples](promise-all-polyfill.js).

From the repository root, run:

```sh
node Promise/promise-all-polyfill.js
```

This implements the combining logic using native promises. It covers input order, plain values, rejection, and empty input.

`promiseFunc()` already returns a promise, so calling `.then()` on its result works directly. `Promise.resolve(item)` also lets the implementation accept plain values such as `42`. For a native Promise, it returns the same promise without restarting the operation.

`resolve(message)` inside the executor settles the promise being created with that message; `Promise.resolve(item)` returns a promise representing an existing item.

## Important points

- These methods do not cancel the remaining operations when they finish early.
- Calling `promiseFunc()` starts its timer immediately; the combinator observes the promises it receives.
- The spelling is `Success`, rather than `Sucess`.
- Rejecting with a string works here; using `new Error(message)` is generally more useful for debugging real applications.

Reference: [MDN Promise documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
