// Run from the repository root: node Promise/promise-any-polyfill.js
// First success wins; reject only if every input fails.
// Learning implementation using native Promise and AggregateError.

Promise.myPromiseAny = function (inputs) {
    return new Promise((resolve, reject) => {
        const items = [...inputs];
        const errors = [];
        let rejectedCount = 0;

        if (items.length === 0) {
            reject(new AggregateError([], "All promises were rejected"));
            return;
        }

        items.forEach((item, index) => {
            // Accept plain values as well as promises and thenables.
            Promise.resolve(item).then(
                (value) => resolve(value),
                (reason) => {
                    // Collect failures in input order, not completion order.
                    errors[index] = reason;
                    rejectedCount++;

                    if (rejectedCount === items.length) {
                        // Errors array first, message second; reject, not resolve.
                        reject(new AggregateError(errors, "All promises were rejected"));
                    }
                }
            );
        });
    });
};

function promiseFunc(message, wait, isResolved) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isResolved) resolve(message);
            else reject(message);
        }, wait);
    });
}

async function runExamples() {
    console.log("1. Ignore an early failure; return the first success:");
    console.log(await Promise.myPromiseAny([
        promiseFunc("Early failure", 10, false),
        promiseFunc("First success", 20, true),
        promiseFunc("Later success", 30, true)
    ]));
    // First success

    console.log("\n2. All fail; collect reasons in input order:");
    try {
        await Promise.myPromiseAny([
            promiseFunc("Failure 1", 30, false),
            promiseFunc("Failure 2", 10, false)
        ]);
    } catch (error) {
        console.log(error.name, error.errors);
        // AggregateError ["Failure 1", "Failure 2"]
    }

    console.log("\n3. Empty input rejects:");
    try {
        await Promise.myPromiseAny([]);
    } catch (error) {
        console.log(error.name, error.errors);
        // AggregateError []
    }

    console.log("\n4. Plain values work:");
    console.log(await Promise.myPromiseAny([42]));
    // 42
}

runExamples().catch((error) => {
    console.error("Unexpected error:", error);
    process.exitCode = 1;
});
