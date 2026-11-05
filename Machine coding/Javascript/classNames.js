// Combine class names from strings, numbers, nested arrays, and objects.
// Falsy arguments are ignored. Truthy object values include their keys.
function classNames(...args) {
  const ans = [];

  args.forEach((value) => {
    if (!value) return;

    const valueType = typeof value;

    if (valueType === "string" || valueType === "number") {
      ans.push(value);
      return;
    }

    if (Array.isArray(value)) {
      const nested = classNames(...value);
      if (nested) ans.push(nested);
      return;
    }

    if (valueType === "object") {
      // Object.entries() already excludes inherited properties.
      for (const [key, val] of Object.entries(value)) {
        if (val) ans.push(key);
      }
    }
  });

  return ans.join(" ");
}

console.log(
  classNames("pop", false, ["qw", "4hbd"], {
    addCla: true,
    subClas: false,
    dis: [], // Empty arrays are truthy, so "dis" is included.
  }),
);
// "pop qw 4hbd addCla dis"

console.log(classNames("button", [false, [], null], "primary"));
// "button primary" — empty recursive results do not add extra spaces.

console.log(classNames("item", 7, 0, undefined, true));
// "item 7" — zero is falsy; standalone booleans do not contribute classes.
