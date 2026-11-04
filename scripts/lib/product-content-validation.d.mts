export type ValidationError = { path: string; line: number; message: string };

export type ValidationResult = { ok: true } | { ok: false; errors: ValidationError[] };

export function validateProductBody(relativePath: string, body: string): ValidationResult;

export function validateFileOnDisk(absolutePath: string, relativePath: string): ValidationResult;

export function parseContentRelativePath(relativePath: string): {
  docId: string;
  kind: "section" | "template";
  slug: string;
  unknownCatalog?: boolean;
} | null;

export function listContentMarkdownFiles(
  contentDir: string,
  exampleDir: string,
): { absolute: string; relative: string }[];

export const MAX_BODY_BYTES: number;
