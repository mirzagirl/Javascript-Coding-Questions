// Run from the repository root: node Promise/promise-race-polyfill.js
// First settled input wins, whether it succeeds or fails.
// Learning implementation using native promises.

Promise.myPromiseRace = function (inputs) {
    return new Promise((resolve, reject) => {
        const items = [...inputs];

        items.forEach((item) => {
            Promise.resolve(item).then(resolve, reject);
        });

        // Empty input leaves this promise pending: neither callback is called.
        // After the first settlement, further resolve/reject calls do nothing.
        // The other operations continue running.
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
    console.log("1. Fastest input succeeds:");
    console.log(await Promise.myPromiseRace([
        promiseFunc("Slow success", 30, true),
        promiseFunc("Fast success", 10, true)
    ]));
    // Fast success

    console.log("\n2. Fastest input fails:");
    try {
        await Promise.myPromiseRace([
            promiseFunc("Slow success", 30, true),
            promiseFunc("Fast failure", 10, false)
        ]);
    } catch (reason) {
        console.log("Error:", reason);
        // Error: Fast failure
    }

    console.log("\n3. Plain values work:");
    console.log(await Promise.myPromiseRace([42]));
    // 42

    console.log("\n4. Empty input stays pending:");
    let settled = false;
    Promise.myPromiseRace([]).then(
        () => { settled = true; },
        () => { settled = true; }
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    console.log("Settled after 20 ms:", settled);
    // false; do not await the empty race, because it never settles.
}

runExamples().catch((error) => {
    console.error("Unexpected error:", error);
    process.exitCode = 1;
});
