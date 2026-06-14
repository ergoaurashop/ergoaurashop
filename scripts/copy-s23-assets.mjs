/**
 * copy-s23-assets.mjs
 *
 * Copies Samsung S23 Ultra product assets from images/ (project root)
 * to public/images/ so Next.js can serve them as static files.
 *
 * Run: node scripts/copy-s23-assets.mjs
 * Or via prebuild: "prebuild": "node scripts/copy-s23-assets.mjs"
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const S23_FOLDER_NAME =
  "Samsung Galaxy S23 Ultra Dual SIM Smartphone 12GB RAM 512GB Storage - Internationa Version";

const SOURCE_DIR = path.join(
  ROOT,
  "images",
  "products",
  "Part-2",
  S23_FOLDER_NAME,
);
const DEST_DIR = path.join(
  ROOT,
  "public",
  "images",
  "products",
  "Part-2",
  S23_FOLDER_NAME,
);

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`❌ Source directory not found: ${src}`);
    process.exit(1);
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
    console.log(`📁 Created destination: ${dest}`);
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  let copiedCount = 0;
  let skippedCount = 0;

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories (e.g., review-images/)
      copyDirSync(srcPath, destPath);
    } else if (entry.isFile()) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        copiedCount++;
      } else {
        skippedCount++;
      }
    }
  }

  if (copiedCount > 0) {
    console.log(`✅ Copied ${copiedCount} file(s) to ${dest}`);
  }
  if (skippedCount > 0) {
    console.log(`⏭️  Skipped ${skippedCount} existing file(s) in ${dest}`);
  }
}

console.log("📦 Copying S23 Ultra assets to public/...");
copyDirSync(SOURCE_DIR, DEST_DIR);
console.log(
  "🎉 Done! S23 assets are now available via Next.js static serving.",
);
