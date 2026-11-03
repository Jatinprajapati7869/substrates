/** Marker used only in tests and Firestore fixtures — must never appear in client bundles. */
export const FIXTURE_LEAK_MARKER = "__SUBSTRATES_P11_FIXTURE_LEAK__";

export const FIXTURE_PRODUCT_BODY = `# Fixture product

Document title: \`Fixture — Oversight Supply\`.

${FIXTURE_LEAK_MARKER}
`;
