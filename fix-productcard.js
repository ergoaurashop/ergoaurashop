const fs = require("fs");

const filePath = "src/components/products/ProductCard.tsx";
const lines = fs.readFileSync(filePath, "utf8").split("\n");

// Fix empty lines at 92 and 96 (0-indexed: 91 and 95)
// Line 91 (index) was "{hasDiscount && (" - now empty
// Line 95 (index) was "            )}" - now empty
// Also fix indentation on line 92 (index 92) which is the Badge

for (let i = 0; i < lines.length; i++) {
  // Remove empty lines that have just whitespace
  if (lines[i].trim() === "" && i >= 90 && i <= 100) {
    // Check if the next line is a real line
    lines[i] = ""; // Will be removed below
  }
}

// Remove blank lines between 90-100 that are truly empty
// First, mark lines to remove
const removeIndices = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === "" && i >= 90 && i <= 100) {
    removeIndices.push(i);
  }
}

// We need to fix indentation - the ded_licensed badge line should have proper indent
// Currently it's at some indent level, but the hasDiscount wrapper was removed
// Let's check what the indentation should be
// The made_in_uae badge is: "            <Badge variant="made_in_uae" ...>"
// The ded_licensed badge should have the same indent
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('variant="ded_licensed"')) {
    // Set proper indentation (same as made_in_uae badge)
    lines[i] = '            <Badge variant="ded_licensed" size="sm">';
  }
}

// Remove blank lines (in reverse order to preserve indices)
const indicesToRemove = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === "" && i >= 90 && i <= 100) {
    indicesToRemove.push(i);
  }
}
for (let i = indicesToRemove.length - 1; i >= 0; i--) {
  lines.splice(indicesToRemove[i], 1);
}

fs.writeFileSync(filePath, lines.join("\n"), "utf8");
console.log("Empty lines cleaned up");
