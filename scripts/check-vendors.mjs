/**
 * Fail if banned platform packages appear in package manifests (S17 / P02).
 */
import { readFileSync } from "node:fs";

const files = ["package.json", "package-lock.json"];
const banned = ["@lovable.dev", "@supabase"];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const needle of banned) {
    if (text.includes(needle)) {
      console.error(`${file} must not reference ${needle}`);
      process.exit(1);
    }
  }
}

console.log("check:vendors ok");
