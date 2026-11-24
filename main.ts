// One-Line Roast: The Gadget You Use Every Day
// Writes a single original roast line (<=200 chars) to /output/entry.txt.
// Node 22 stdlib only.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My earbuds only die mid-sentence on important calls, never during the three-hour podcast about absolutely nothing.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} is outside the 1-200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Re-read and re-check what actually landed on disk.
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the entry line");
}
const words = written.trim().split(/\s+/).length;
if (words < 5) {
  throw new Error(`entry has only ${words} words`);
}
console.log(`wrote ${LINE.length} chars (${words} words) to /output/entry.txt`);
