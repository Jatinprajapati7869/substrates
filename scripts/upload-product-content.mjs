/**
 * Upload canonical product bodies from git-ignored content/ to Firestore product_content/{slug}.
 *
 * Usage:
 *   node scripts/upload-product-content.mjs [--dry-run] [--slug=daylight]
 *
 * Requires FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY (or GOOGLE_APPLICATION_CREDENTIALS).
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import catalog from "../src/lib/catalog.json" with { type: "json" };

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONTENT_DIR = join(ROOT, "content");
const MAX_BYTES = 900 * 1024;

const dryRun = process.argv.includes("--dry-run");
const slugFilter = process.argv.find((a) => a.startsWith("--slug="))?.slice("--slug=".length);

function adminFirestore() {
  const projectId = process.env["FIREBASE_PROJECT_ID"];
  const clientEmail = process.env["FIREBASE_CLIENT_EMAIL"];
  let privateKey = process.env["FIREBASE_PRIVATE_KEY"];
  if (!projectId || !clientEmail || !privateKey) {
    console.error("Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY");
    process.exit(1);
  }
  privateKey = privateKey.replace(/\\n/g, "\n");
  if (!getApps().length) {
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId });
  }
  return getFirestore();
}

function walkMarkdown(dir, out = []) {
  try {
    if (!statSync(dir).isDirectory()) return out;
  } catch {
    return out;
  }
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkMarkdown(path, out);
    else if (name.endsWith(".md")) out.push(path);
  }
  return out;
}

function catalogProduct(kind, slug) {
  return catalog.find((p) => p.kind === kind && p.slug === slug);
}

/** @returns {{ docId: string, kind: "section" | "template", slug: string } | null} */
function parseFile(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");
  const sectionMatch = /^sections\/(.+)\.md$/.exec(normalized);
  if (sectionMatch) {
    const slug = sectionMatch[1];
    return { docId: slug, kind: "section", slug };
  }
  const templateDual = /^templates\/(.+)\.(webflow|framer)\.md$/.exec(normalized);
  if (templateDual) {
    const slug = templateDual[1];
    const platform = templateDual[2];
    return { docId: `${slug}__${platform}`, kind: "template", slug };
  }
  const templateSingle = /^templates\/(.+)\.md$/.exec(normalized);
  if (templateSingle) {
    const slug = templateSingle[1];
    return { docId: slug, kind: "template", slug };
  }
  return null;
}

async function main() {
  const files = walkMarkdown(CONTENT_DIR);
  if (!files.length) {
    console.log("No markdown files under content/ (nothing to upload).");
    return;
  }

  const db = dryRun ? null : adminFirestore();
  let uploaded = 0;

  for (const file of files) {
    const rel = file.slice(CONTENT_DIR.length + 1);
    const parsed = parseFile(rel);
    if (!parsed) {
      console.warn(`Skip (unrecognized path): ${rel}`);
      continue;
    }
    if (slugFilter && parsed.slug !== slugFilter) continue;

    const product = catalogProduct(parsed.kind, parsed.slug);
    if (!product) {
      console.error(`Unknown catalog slug: ${parsed.kind}/${parsed.slug}`);
      process.exitCode = 1;
      continue;
    }

    const body = readFileSync(file, "utf8");
    if (body.length > MAX_BYTES) {
      console.error(`Body too large (${body.length} bytes): ${rel}`);
      process.exitCode = 1;
      continue;
    }

    const sha256 = createHash("sha256").update(body).digest("hex");
    const payload = { body, updatedAt: new Date(), bodyVersion: 1, sha256 };

    if (dryRun) {
      console.log(`[dry-run] product_content/${parsed.docId} (${body.length} bytes)`);
      uploaded += 1;
      continue;
    }

    await db.collection("product_content").doc(parsed.docId).set(payload, { merge: true });
    console.log(`Uploaded product_content/${parsed.docId}`);
    uploaded += 1;
  }

  console.log(`Done. ${uploaded} document(s) ${dryRun ? "validated" : "written"}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
