// Fortune Cookie Wisdom for Developers — make.fun entry
// Writes one original fortune-cookie line for a software developer
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt when
// the variable is unset), creating the directory if needed, while
// still printing the entry to stdout.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One short balanced sentence: true about a developer's day (Friday
// deploys), with a quiet twist — the "letter" is the deploy itself,
// and it arrives unsigned, so no one owns the weekend it causes.
const LINE =
  "A deploy on Friday is not brave; it is a letter to your future self, unsigned.";

// The harness hands the output directory through MAKEFUN_OUTPUT_DIR;
// fall back to /output so the entry still lands where the gate looks.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const out = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(out, LINE, "utf8");
console.log(LINE);
