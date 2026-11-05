// Throttle: run immediately, then ignore calls for `wait` milliseconds.
// Leading-only behavior: ignored calls are NOT saved for a later execution.
// The first accepted call supplies the arguments and `this`.
function throttle(func, wait) {
  let timerId = null;

  return function (...args) {
    if (timerId !== null) return;

    // Start the cooldown before calling func, including for recursive calls.
    timerId = setTimeout(() => {
      timerId = null;
    }, wait);

    return func.apply(this, args);
  };
}

// Example: limit how often a scroll position is reported.
const tracker = {
  prefix: "Scroll:",
  report(position) {
    console.log(this.prefix, position);
  },
};

tracker.throttled = throttle(tracker.report, 500);

tracker.throttled(10); // Runs immediately.
setTimeout(() => tracker.throttled(20), 100); // Ignored.
setTimeout(() => tracker.throttled(30), 200); // Ignored.
setTimeout(() => tracker.throttled(40), 700); // Runs after the cooldown.
setTimeout(() => tracker.throttled(50), 800); // Ignored.

// Output:
// Scroll: 10
// Scroll: 40

// Difference: debounce waits for a pause; throttle allows a call, then enforces a cooldown.
