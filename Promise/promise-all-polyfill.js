// From the repository root, run: node Promise/promise-all-polyfill.js
// Learning implementation using native promises, without calling Promise.all().

Promise.myPromiseAll = function (inputs) {
    return new Promise((resolve, reject) => {
        // Accept an iterable, such as an array or Set.
        // If spreading throws, the returned promise rejects automatically.
        const items = [...inputs];
        const results = [];
        let completed = 0;

        if (items.length === 0) {
            resolve([]);
            return;
        }

        items.forEach((item, index) => {
            // Handle promises, thenables, and plain values.
            // promiseFunc() already returns a native promise, so item.then()
            // would work for that input. But 42 has no .then() method.
            // Promise.resolve(42) gives us a fulfilled promise containing 42.
            // For a native Promise, Promise.resolve(item) returns that same
            // promise; it does not restart its timer or repeat its work.
            Promise.resolve(item).then(
                (value) => {
                    // Store by input position, not completion order.
                    results[index] = value;
                    completed++;

                    if (completed === items.length) {
                        resolve(results);
                    }
                },
                (reason) => {
                    // First failure rejects the combined promise.
                    // The other operations are not cancelled.
                    reject(reason);
                }
            );
        });
    });
};

function promiseFunc(message, wait, isResolved) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isResolved) {
                resolve(message);
            } else {
                reject(message);
            }
        }, wait);
    });
}

async function runExamples() {
    console.log("1. All succeed; output keeps input order:");
    const values = await Promise.myPromiseAll([
        promiseFunc("Promise 1", 300, true),
        promiseFunc("Promise 2", 100, true),
        promiseFunc("Promise 3", 200, true),
        42
    ]);
    console.log(values);
    // ["Promise 1", "Promise 2", "Promise 3", 42]

    console.log("\n2. One fails; combined promise rejects:");
    try {
        await Promise.myPromiseAll([
            promiseFunc("Promise 1", 300, true),
            promiseFunc("Promise 2 failed", 100, false),
            promiseFunc("Promise 3", 200, true)
        ]);
    } catch (reason) {
        console.log("Error:", reason);
        // Error: Promise 2 failed
    }

    console.log("\n3. Empty input:");
    console.log(await Promise.myPromiseAll([]));
    // []
}

runExamples().catch((error) => {
    console.error("Unexpected error:", error);
    process.exitCode = 1;
});
