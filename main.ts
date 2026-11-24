// Loading Screen Gold — writes one loading-screen tip to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Plain JavaScript (no TypeScript annotations), no dependencies, Node 22.
import fs from "node:fs";
import path from "node:path";

const TIP =
  "Loading\u2026 your agent has rewritten this function three times. The bug is a typo. It was always a typo.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });

// Gate: 1-200 characters (code points), exactly one line, not whitespace-only.
const chars = [...TIP];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`tip must be 1-200 characters, got ${chars.length}`);
}
if (/[\n\r]/.test(TIP) || TIP.trim().length === 0) {
  throw new Error("tip must be a single non-blank line");
}

const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, TIP, "utf8");

// Round-trip validation of our own output.
const back = fs.readFileSync(outPath, "utf8");
if (back !== TIP) {
  throw new Error("round-trip mismatch");
}
