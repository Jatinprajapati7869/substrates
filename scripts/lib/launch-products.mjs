/** Homepage showcase slugs (D25) — keep in sync with docs/launch-products.md */
export const LAUNCH_PRODUCT_GROUPS = [
  {
    name: "Free sections",
    items: [
      { display: "Collage", slug: "portfolio-collage" },
      { display: "Signal & Soil", slug: "signal" },
      { display: "Condensation", slug: "condensation" },
      { display: "Transmission", slug: "transmission" },
      { display: "Florilegium", slug: "florilegium" },
      { display: "Joiner", slug: "joiner" },
    ],
  },
  {
    name: "Webflow picks",
    items: [
      { display: "Stillpoint", slug: "stillpoint" },
      { display: "Evergrid", slug: "evergrid" },
      { display: "Protocol", slug: "protocol" },
      { display: "Lumenis", slug: "lumenis" },
      { display: "Legion", slug: "legion" },
      { display: "Nullify", slug: "nullify" },
    ],
  },
  {
    name: "Framer templates",
    items: [
      { display: "Cherry", slug: "cherry" },
      { display: "Madeline", slug: "madeline" },
      { display: "Queue", slug: "queue" },
      { display: "Pretty", slug: "pretty" },
      { display: "Wings", slug: "wings" },
      { display: "Daylight", slug: "daylight" },
    ],
  },
];

export function allLaunchSlugs() {
  return LAUNCH_PRODUCT_GROUPS.flatMap((g) => g.items.map((i) => i.slug));
}
