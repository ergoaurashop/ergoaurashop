const fs = require("fs");

function fixFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;
  for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Fixed:", filePath);
  } else {
    console.log("No changes:", filePath);
  }
}

// Use hex codes to avoid HTML entity decoding
const AMP = String.fromCharCode(0x26);
const APOS = AMP + "apos;";
const LDQUO = AMP + "ldquo;";
const RDQUO = AMP + "rdquo;";

fixFile("src/components/products/ProductCard.tsx", [
  [
    "ErgoAura" + String.fromCharCode(0x27) + "s Choice",
    "ErgoAura" + APOS + "s Choice",
  ],
]);

fixFile("src/components/products/ProductGrid.tsx", [
  ["You" + String.fromCharCode(0x27) + "ve", "You" + APOS + "ve"],
]);

fixFile("src/components/products/QuickViewModal.tsx", [
  ["it" + String.fromCharCode(0x27) + "s back", "it" + APOS + "s back"],
]);

fixFile("src/app/products/[slug]/page.tsx", [
  [
    String.fromCharCode(0x22) +
      "{content.problemHook}" +
      String.fromCharCode(0x22),
    LDQUO + "{content.problemHook}" + RDQUO,
  ],
]);
