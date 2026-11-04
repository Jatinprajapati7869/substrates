#!/usr/bin/env node
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { listContentMarkdownFiles, validateFileOnDisk } from "./lib/product-content-validation.mjs";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONTENT_DIR = join(ROOT, "content");
const EXAMPLE_DIR = join(ROOT, "content-example");

const files = listContentMarkdownFiles(CONTENT_DIR, EXAMPLE_DIR);
if (!files.length) {
  console.log("No markdown under content/ or content-example/.");
  process.exit(0);
}

let failed = false;
for (const { absolute, relative } of files) {
  const result = validateFileOnDisk(absolute, relative);
  if (result.ok) {
    console.log(`OK ${relative}`);
  } else {
    failed = true;
    for (const err of result.errors) {
      console.error(`${err.path}:${err.line}: ${err.message}`);
    }
  }
}

process.exit(failed ? 1 : 0);
