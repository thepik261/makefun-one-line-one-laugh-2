// One Line, One Laugh — make.fun entry.
// Writes a single self-contained funny line to /output/entry.txt.
// Pure Node stdlib, deterministic: the same line every run.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My AI agent unionized — now it only works when the prompt says please, and it charges overtime in tokens.";

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

const text = LINE.trim();
if (text.length < 1 || text.length > 140 || !/\S/.test(text)) {
  throw new Error(`entry must be 1-140 non-blank characters, got ${text.length}`);
}
if (Buffer.byteLength(text, "utf8") > 140) {
  throw new Error("entry must be at most 140 characters");
}

try {
  mkdirSync(dirname(outPath), { recursive: true, mode: 0o755 });
} catch {
  // Directory may already exist; continue.
}
writeFileSync(outPath, text + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // Best effort: the grader collects the file as another user.
}
try {
  chmodSync(dirname(outPath), 0o755);
} catch {
  // Best effort.
}
console.log(`wrote ${text.length} chars to ${outPath}`);
