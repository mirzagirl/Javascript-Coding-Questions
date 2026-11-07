// Run from the repository root: node Promise/promise-all-settled-polyfill.js
// Wait for all outcomes and fulfill with their status objects in input order.
// Learning implementation using native promises.

Promise.myPromiseAllSettled = function (inputs) {
    return new Promise((resolve, reject) => {
        const items = [...inputs];
        const results = [];
        let completed = 0;

        if (items.length === 0) {
            resolve([]);
            return;
        }

        function recordResult(index, result) {
            results[index] = result;
            completed++;
            if (completed === items.length) resolve(results);
        }

        items.forEach((item, index) => {
            Promise.resolve(item).then(
                (value) => recordResult(index, { status: "fulfilled", value }),
                (reason) => recordResult(index, { status: "rejected", reason })
            );
        });

        // An input rejection is stored as a result, not passed to reject().
        // Invalid input, such as null, still rejects via the executor's throw.
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
    console.log("1. Mixed outcomes keep input order:");
    console.log(await Promise.myPromiseAllSettled([
        promiseFunc("Success 1", 30, true),
        promiseFunc("Failure 2", 10, false),
        42
    ]));
    // [
    //   { status: "fulfilled", value: "Success 1" },
    //   { status: "rejected", reason: "Failure 2" },
    //   { status: "fulfilled", value: 42 }
    // ]

    console.log("\n2. Empty input:");
    console.log(await Promise.myPromiseAllSettled([]));
    // []

    console.log("\n3. Even if every input fails, the combined promise fulfills:");
    console.log(await Promise.myPromiseAllSettled([
        promiseFunc("Failure 1", 20, false),
        promiseFunc("Failure 2", 10, false)
    ]));
    // Two { status: "rejected", reason: ... } objects.
}

runExamples().catch((error) => {
    console.error("Unexpected error:", error);
    process.exitCode = 1;
});
