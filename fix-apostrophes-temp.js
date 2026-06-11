const fs = require("fs");

const files = [
  {
    path: "src/components/products/ProductCard.tsx",
    search: "ErgoAura's Choice",
    replace: "ErgoAura's Choice",
  },
  {
    path: "src/components/products/ProductGrid.tsx",
    search: "You've seen all products",
    replace: "You've seen all products",
  },
  {
    path: "src/components/products/QuickViewModal.tsx",
    search: "when it's back",
    replace: "when it's back",
  },
];

for (const f of files) {
  let content = fs.readFileSync(f.path, "utf8");
  const before = content;
  content = content.split(f.search).join(f.replace);
  if (before !== content) {
    fs.writeFileSync(f.path, content, "utf8");
    console.log("Fixed: " + f.path);
  } else {
    console.log(
      "No match found in: " +
        f.path +
        " (search: " +
        JSON.stringify(f.search) +
        ")",
    );
  }
}
