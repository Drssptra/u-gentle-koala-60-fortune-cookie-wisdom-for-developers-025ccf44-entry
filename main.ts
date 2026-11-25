// Fortune Cookie Wisdom for Developers — v2 resubmit.
// Emits exactly one fortune-cookie line for developers and writes it
// to entry.txt inside the directory named by MAKEFUN_OUTPUT_DIR.
// Deliberately plain: Node 22 stdlib only, no network, no randomness,
// no clock reads — the same bytes come out on every run.
import * as fs from "node:fs";
import * as path from "node:path";

// The entry is assembled from its two clauses so the sentence's
// turn is visible in the source: first the setup (old code looks
// like a mess), then the reversal (it is the survivor, the part
// every rewrite failed to replace). Joining on a single space
// reproduces the line byte for byte.
const CLAUSES: readonly string[] = [
  "The oldest code in the repo is not a mess;",
  "it is the part that survived every rewrite.",
];

function buildEntry(): string {
  if (CLAUSES.length !== 2 || CLAUSES.some((c) => c.length === 0)) {
    throw new Error("entry clauses are incomplete");
  }
  return CLAUSES.join(" ");
}

function checkEntry(text: string): void {
  const problems: string[] = [];
  if (text.length < 1 || text.length > 120) {
    problems.push(`length ${text.length} outside 1-120`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("must be a single line");
  }
  if (text.trim() !== text || text.length === 0) {
    problems.push("must not be blank or padded");
  }
  if (problems.length > 0) {
    throw new Error(`entry fails gate: ${problems.join("; ")}`);
  }
}

function outputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return path.resolve(dir, "entry.txt");
}

function main(): void {
  const entry = buildEntry();
  checkEntry(entry);
  const target = outputPath();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  // Exact bytes only: no trailing newline in the file. The terminal
  // copy gets its newline from stdout, not from the file content.
  fs.writeFileSync(target, Buffer.from(entry, "utf8"));
  process.stdout.write(entry + "\n");
}

main();
