#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { LAUNCH_PRODUCT_GROUPS } from "./lib/launch-products.mjs";
import { catalogProductBySlug, validateProductBody } from "./lib/product-content-validation.mjs";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONTENT_DIR = join(ROOT, "content");
const TODO_PATH = join(CONTENT_DIR, "TODO.md");
const TODO_TEMPLATE = join(ROOT, "scripts/templates/content-TODO.template.md");

function bodyPathForSlug(slug) {
  const candidates = [
    join(CONTENT_DIR, `${slug}.md`),
    join(CONTENT_DIR, "sections", `${slug}.md`),
    join(CONTENT_DIR, "templates", `${slug}.md`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function relativeForPath(absolute) {
  return absolute.slice(ROOT.length + 1).replace(/\\/g, "/");
}

function ensureTodo() {
  mkdirSync(CONTENT_DIR, { recursive: true });
  if (existsSync(TODO_PATH)) return;
  if (existsSync(TODO_TEMPLATE)) {
    writeFileSync(TODO_PATH, readFileSync(TODO_TEMPLATE, "utf8"), "utf8");
    console.log(`Created ${relativeForPath(TODO_PATH)} from template (git-ignored).\n`);
  }
}

function main() {
  ensureTodo();

  console.log("Launch product bodies (homepage showcase, D25)\n");

  for (const group of LAUNCH_PRODUCT_GROUPS) {
    console.log(`## ${group.name}`);
    for (const item of group.items) {
      const inCatalog = catalogProductBySlug(item.slug);
      const path = bodyPathForSlug(item.slug);
      if (!inCatalog) {
        console.log(`  [catalog?] ${item.slug} (${item.display}) — not in catalog.json`);
        continue;
      }
      if (!path) {
        console.log(`  [missing]  ${item.slug} (${item.display})`);
        continue;
      }
      const rel = relativeForPath(path);
      const body = readFileSync(path, "utf8");
      const result = validateProductBody(rel, body);
      if (result.ok) {
        console.log(`  [ok]       ${item.slug} (${item.display}) ← ${rel}`);
      } else {
        console.log(`  [invalid]  ${item.slug} (${item.display}) ← ${rel}`);
        for (const err of result.errors.slice(0, 3)) {
          console.log(`             ${err.line}: ${err.message}`);
        }
      }
    }
    console.log("");
  }
}

main();
