// Object.groupBy(items, callback) groups items into arrays by the returned key.
// The result is an object with no prototype. The original collection is unchanged.

// 1. Group numbers into odd and even.
const numbers = [1, 2, 3, 4, 5];

const byParity = Object.groupBy(numbers, (number) =>
  number % 2 === 0 ? "even" : "odd",
);

console.log("Odd and even:", byParity);
// { odd: [1, 3, 5], even: [2, 4] }

// 2. Group objects by a property.
const people = [
  { name: "Ali", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "John", role: "admin" },
];

const byRole = Object.groupBy(people, (person) => person.role);

console.log("By role:", byRole);
// {
//   admin: [
//     { name: "Ali", role: "admin" },
//     { name: "John", role: "admin" }
//   ],
//   user: [{ name: "Sara", role: "user" }]
// }

// Grouped objects are the original references, not copies.
console.log(byRole.admin[0] === people[0]); // true

// 3. Group words by their first letter.
const words = ["apple", "banana", "avocado", "blueberry"];

const byFirstLetter = Object.groupBy(words, (word) => word[0]);

console.log("By first letter:", byFirstLetter);
// { a: ["apple", "avocado"], b: ["banana", "blueberry"] }

// Some consoles display these results as [Object: null prototype].
