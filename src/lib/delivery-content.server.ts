import type { Product } from "./catalog";

export const FULL_PROMPT_LICENSE_NOTICE = `You may use an unlocked template in your own or a client project, subject to any licence terms supplied with that template or its source platform. You may not resell or redistribute the template files or access links, share your account, or present the template itself as your own product for sale.

This prompt includes Substrates-licensed source specifications. For your use in projects you build; do not redistribute the prompt text or generated source as a standalone product for sale.`;

export function productContentDocId(product: Product): string {
  if (product.kind === "template" && product.platform) {
    return product.slug;
  }
  return product.slug;
}

export function rebrandDeliveredBody(body: string): string {
  return body
    .replaceAll("Oversight Supply", "Substrates")
    .replaceAll("OversightStudio", "Substrates");
}

export function wrapFullPrompt(assistant: string, body: string): string {
  const rebranded = rebrandDeliveredBody(body);
  return `In ${assistant}, apply the following rebuild specification exactly. Create every file at the paths given under Full source code with the exact contents shown. Do not paraphrase visible copy.

${rebranded}

${FULL_PROMPT_LICENSE_NOTICE}`;
}
