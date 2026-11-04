/**
 * Upload canonical product bodies to Firestore product_content/{docId}.
 *
 * Default: dry-run (validation only). Pass --confirm to write.
 *
 *   node scripts/upload-product-content.mjs [--confirm] [--all] [--slug=portfolio-collage]
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  listContentMarkdownFiles,
  parseContentRelativePath,
  validateProductBody,
  catalogProductBySlug,
} from "./lib/product-content-validation.mjs";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONTENT_DIR = join(ROOT, "content");
const MANIFEST_PATH = join(ROOT, "src/lib/content-manifest.json");

const confirm = process.argv.includes("--confirm");
const dryRun = !confirm;
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

function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) {
    return { updatedAt: null, products: [] };
  }
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
}

function saveManifest(manifest) {
  manifest.updatedAt = new Date().toISOString();
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

async function main() {
  const files = listContentMarkdownFiles(CONTENT_DIR, join(ROOT, "content-example")).filter((f) =>
    f.relative.startsWith("content/"),
  );

  if (!files.length) {
    console.log("No markdown files under content/ (nothing to upload).");
    return;
  }

  for (const { absolute, relative } of files) {
    const body = readFileSync(absolute, "utf8");
    const validation = validateProductBody(relative, body);
    if (!validation.ok) {
      for (const err of validation.errors) {
        console.error(`${err.path}:${err.line}: ${err.message}`);
      }
      process.exitCode = 1;
      console.error("Upload aborted: validation failed.");
      return;
    }
  }

  const db = dryRun ? null : adminFirestore();
  const manifest = loadManifest();
  const byDocId = new Map(manifest.products.map((p) => [p.docId, p]));
  let processed = 0;

  for (const { absolute, relative } of files) {
    const parsed = parseContentRelativePath(relative);
    if (!parsed || !catalogProductBySlug(parsed.slug)) continue;
    if (slugFilter && parsed.slug !== slugFilter) continue;

    const body = readFileSync(absolute, "utf8");
    const bytes = Buffer.byteLength(body, "utf8");
    const sha256 = createHash("sha256").update(body).digest("hex");
    const existing = byDocId.get(parsed.docId);
    if (existing?.sha256 === sha256) {
      console.log(`Skip unchanged ${parsed.docId} (${bytes} bytes)`);
      processed += 1;
      continue;
    }

    const bodyVersion = (existing?.bodyVersion ?? 0) + 1;
    const payload = { body, updatedAt: new Date(), bodyVersion, sha256 };

    if (dryRun) {
      console.log(`[dry-run] product_content/${parsed.docId} (${bytes} bytes, v${bodyVersion})`);
      processed += 1;
      continue;
    }

    await db.collection("product_content").doc(parsed.docId).set(payload, { merge: true });
    console.log(`Uploaded product_content/${parsed.docId} (v${bodyVersion}, ${bytes} bytes)`);

    byDocId.set(parsed.docId, {
      docId: parsed.docId,
      slug: parsed.slug,
      kind: parsed.kind,
      bodyVersion,
      sha256,
      bytes,
    });
    processed += 1;
  }

  if (!dryRun && processed > 0) {
    manifest.products = [...byDocId.values()].sort((a, b) => a.docId.localeCompare(b.docId));
    saveManifest(manifest);
    console.log(`Updated ${MANIFEST_PATH}`);
  }

  console.log(`Done. ${processed} document(s) ${dryRun ? "validated (dry-run)" : "written"}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
