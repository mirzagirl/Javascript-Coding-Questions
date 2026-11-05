// JavaScript hoisting and scope exercises.
// Run with: node hoisting-examples.js
// Each example has its own scope. Expected errors are caught so all examples run.
// Error wording and the display of function objects vary between runtimes.
// Reference for function declarations and strict-mode behavior:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function

function runExample(title, example) {
    console.log("\n" + title);
    try {
        example();
    } catch (error) {
        console.log(error.name + ": " + error.message);
    }
}

runExample("1. var hoisting", function () {
    console.log(a);
    var a = 10;
    console.log(a);

    // Output: undefined, 10. Your answer was correct.
});

runExample("2. Function declaration and var assignment", function () {
    console.log(foo);
    var foo = 20;
    function foo() {
        return 100;
    }
    console.log(foo);

    // Output: [Function: foo], 20 (function formatting depends on the runtime).
    // The function is initialized before execution. The assignment replaces it.
});

runExample("3. let and the temporal dead zone", function () {
    console.log(a);
    let a = 10;
    console.log(a);

    // ReferenceError: Cannot access 'a' before initialization.
    // Your error prediction was correct; 10 is never printed because execution
    // of this example stops at the first console.log.
});

runExample("4. Calling a function expression before assignment", function () {
    sayHello();
    var sayHello = function () {
        console.log("Hello");
    };

    // TypeError: sayHello is not a function. Your answer was correct.
    // sayHello is undefined at the time of the call.
});

runExample("5. var and let inside a block", function () {
    var x = 10;
    if (true) {
        var x = 20;
        let y = 30;
    }
    console.log(x);
    console.log(y);

    // Output: 20, then ReferenceError: y is not defined.
    // Your answer was correct. var shares the function scope; let is block scoped.
});

runExample("6. Block function in non-strict mode", function () {
    console.log(typeof foo);
    {
        function foo() {
            return "Hello";
        }
    }
    console.log(typeof foo);

    // In Node.js CommonJS and environments applying Annex B compatibility rules:
    // undefined, function.
    // typeof returns a string, not the function's source code.
    // Non-strict block-function behavior can differ across environments.
});

runExample("6b. Block function in strict mode", function () {
    "use strict";
    console.log(typeof foo);
    {
        function foo() {
            return "Hello";
        }
    }
    console.log(typeof foo);

    // Output: undefined, undefined.
    // foo belongs only to the block. typeof an unresolvable name is "undefined".
});

runExample("7. Local var shadows an outer variable", function () {
    var x = 10;
    function test() {
        console.log(x);
        var x = 20;
        console.log(x);
    }
    test();

    // Output: undefined, 20. The prediction 10, 20 was incorrect.
    // The local x shadows the outer x throughout test().
});

runExample("8. Duplicate function declarations", function () {
    "use strict";
    function greet() {
        console.log("First");
    }
    function greet() {
        console.log("Second");
    }
    greet();

    // Output: Second. This is allowed in a function body even in strict mode.
    // The later declaration takes precedence during function initialization.
    // Duplicate declarations at module top level or inside a strict-mode block
    // are syntax errors; those are different scopes from this function body.
});

runExample("9. typeof during the temporal dead zone", function () {
    console.log(typeof a);
    let a = 100;

    // ReferenceError: Cannot access 'a' before initialization.
    // Your answer was correct. typeof does not bypass the temporal dead zone.
});

runExample("10. Reassigning a parameter", function () {
    function test(a) {
        console.log(a);
        a = 20;
        console.log(a);
    }
    test(10);

    // Output: 10, 20. Your answer was correct in both strict and non-strict mode.
    // This code has no var declaration; it simply reassigns the parameter.
    // Adding `var a;` inside test would redeclare the same parameter binding.
});
