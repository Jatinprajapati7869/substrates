/**
 * Shared product body validation (P31). Used by CLI scripts and Vitest.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import catalog from "../../src/lib/catalog.json" with { type: "json" };

export const MAX_BODY_BYTES = 900 * 1024;

/** Normalized ## headings that must appear in order (after title + description). */
export const REQUIRED_SECTION_HEADINGS = [
  "stack & dependencies",
  "layout & content",
  "interactions & animation",
  "responsive behaviour",
  "accessibility",
  "performance notes",
  "assets",
  "putting it in an existing site",
  "full source code",
  "build",
  "limitations",
];

const FORBIDDEN_STRINGS = [
  { pattern: /Oversight Supply/i, label: "Oversight Supply" },
  { pattern: /OversightStudio/i, label: "OversightStudio" },
  { pattern: /\bOversight\b/i, label: "Oversight" },
];

const SECRET_LIKE = /\b(api[_-]?key|secret|token|private[_-]?key|password)\s*[:=]\s*\S/i;

const LOCALHOST_URL = /https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/[^\s"'`]*)?/i;

const REMOTE_SCRIPT = /<script\b[^>]*\bsrc\s*=\s*["']https?:\/\//i;

export function catalogProductBySlug(slug) {
  return catalog.find((p) => p.slug === slug) ?? null;
}

/**
 * @returns {{ docId: string, kind: "section" | "template", slug: string, unknownCatalog?: boolean } | null}
 */
export function parseContentRelativePath(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");
  const fromExample = /^content-example\/(.+)\.md$/.exec(normalized);
  if (fromExample) {
    const fileStem = fromExample[1];
    const slug = fileStem === "collage" ? "portfolio-collage" : fileStem;
    const product = catalogProductBySlug(slug);
    if (!product) return { docId: slug, kind: "section", slug, unknownCatalog: true };
    return { docId: slug, kind: product.kind, slug };
  }

  const sectionMatch = /^(?:content\/)?sections\/(.+)\.md$/.exec(normalized);
  if (sectionMatch) {
    const slug = sectionMatch[1];
    return { docId: slug, kind: "section", slug };
  }
  const templateDual = /^(?:content\/)?templates\/(.+)\.(webflow|framer)\.md$/.exec(normalized);
  if (templateDual) {
    const slug = templateDual[1];
    return { docId: `${slug}__${templateDual[2]}`, kind: "template", slug };
  }
  const templateSingle = /^(?:content\/)?templates\/(.+)\.md$/.exec(normalized);
  if (templateSingle) {
    const slug = templateSingle[1];
    return { docId: slug, kind: "template", slug };
  }
  const flat = /^(?:content\/)?([^/]+)\.md$/.exec(normalized);
  if (flat) {
    const slug = flat[1];
    const product = catalogProductBySlug(slug);
    if (!product) return { docId: slug, kind: "section", slug, unknownCatalog: true };
    return { docId: slug, kind: product.kind, slug };
  }
  return null;
}

function normalizeHeading(line) {
  return line
    .replace(/^##+\s*/, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace("responsive behavior", "responsive behaviour")
    .replace("accessibility & robustness", "accessibility")
    .replace("build and run", "build")
    .replace("build / run", "build");
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

/**
 * @returns {{ ok: true } | { ok: false, errors: { path: string, line: number, message: string }[] }}
 */
export function validateProductBody(relativePath, body) {
  const errors = [];
  const push = (line, message) => errors.push({ path: relativePath, line, message });

  if (Buffer.byteLength(body, "utf8") > MAX_BODY_BYTES) {
    push(1, `Body exceeds ${MAX_BODY_BYTES} bytes`);
  }

  const lines = body.split("\n");
  const titleLineIdx = lines.findIndex((l) => l.startsWith("# ") && !/format sample/i.test(l));
  if (titleLineIdx < 0) {
    push(1, "Body must include a product title line (# …)");
  } else if (/Oversight/i.test(lines[titleLineIdx])) {
    push(titleLineIdx + 1, 'Title must use "Substrates", not Oversight branding');
  }

  const firstSectionLine = lines.findIndex((l, i) => i > titleLineIdx && l.startsWith("## "));
  if (firstSectionLine < 0) {
    push(1, "Missing section headings (## …)");
  } else if (firstSectionLine <= titleLineIdx + 1) {
    push(firstSectionLine + 1, "Add a description paragraph after the title");
  }

  const headingsFound = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ") && !lines[i].startsWith("### ")) {
      headingsFound.push({ line: i + 1, norm: normalizeHeading(lines[i]) });
    }
  }

  let hIdx = 0;
  for (const required of REQUIRED_SECTION_HEADINGS) {
    while (hIdx < headingsFound.length && !headingsFound[hIdx].norm.startsWith(required)) {
      hIdx++;
    }
    if (hIdx >= headingsFound.length) {
      push(headingsFound.at(-1)?.line ?? 1, `Missing required heading: ${required}`);
      break;
    }
    hIdx++;
  }

  const fullSource = headingsFound.find((h) => h.norm.startsWith("full source code"));
  if (fullSource) {
    const slice = lines.slice(fullSource.line - 1).join("\n");
    const fileHeadings = slice.match(/^###\s+`.+`/gm) ?? [];
    if (fileHeadings.length === 0) {
      push(fullSource.line, "Full source code needs at least one ### `path` file heading");
    }
  }

  let fence = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("```")) fence++;
  }
  if (fence % 2 !== 0) {
    push(lines.length, "Unbalanced fenced code blocks");
  }

  for (const { pattern, label } of FORBIDDEN_STRINGS) {
    const match = pattern.exec(body);
    if (match) {
      push(lineNumberAt(body, match.index), `Forbidden string: ${label}`);
    }
  }

  const secretMatch = SECRET_LIKE.exec(body);
  if (secretMatch) {
    push(lineNumberAt(body, secretMatch.index), "Forbidden secret-like pattern");
  }

  const localhostMatch = LOCALHOST_URL.exec(body);
  if (localhostMatch) {
    push(lineNumberAt(body, localhostMatch.index), "Forbidden localhost URL");
  }

  const scriptMatch = REMOTE_SCRIPT.exec(body);
  if (scriptMatch) {
    push(lineNumberAt(body, scriptMatch.index), "Forbidden remote script tag");
  }

  const parsed = parseContentRelativePath(relativePath);
  if (!parsed) {
    push(1, "Unrecognized content path (use content/<slug>.md or content/sections|templates/…)");
  } else if (parsed.unknownCatalog || !catalogProductBySlug(parsed.slug)) {
    push(1, `Unknown catalog slug: ${parsed.slug}`);
  }

  if (errors.length) return { ok: false, errors };
  return { ok: true };
}

export function validateFileOnDisk(absolutePath, relativePath) {
  const body = readFileSync(absolutePath, "utf8");
  return validateProductBody(relativePath, body);
}

export function listContentMarkdownFiles(contentDir, exampleDir) {
  const out = [];
  const walk = (dir, prefix) => {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path, `${prefix}/${name}`);
      else if (name.endsWith(".md")) {
        out.push({
          absolute: path,
          relative: `${prefix}/${name}`.replace(/^\//, ""),
        });
      }
    }
  };
  walk(contentDir, "content");
  walk(exampleDir, "content-example");
  return out;
}
