// Debounce: run only after calls have stopped for `wait` milliseconds.
// Trailing behavior: the latest call supplies the arguments and `this`.
function debounce(func, wait) {
  let timerId = null;

  return function (...args) {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = null;
      func.apply(this, args);
    }, wait);
  };
}

// Example: search after the user stops typing.
const search = {
  prefix: "Search:",
  run(query) {
    console.log(this.prefix, query);
  },
};

search.debounced = debounce(search.run, 300);

search.debounced("j");
setTimeout(() => search.debounced("ja"), 100);
setTimeout(() => search.debounced("javascript"), 200);

// Logs once, approximately 500 ms after the example starts:
// Search: javascript
// Earlier pending calls are cancelled. This wrapper does not return the later result.
