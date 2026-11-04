# FORMAT SAMPLE — not a licensed product body. See docs/specs/product-body-format.md.

# Collage — Portfolio hero — Substrates

Collage is a format sample for authors: a short editorial hero description. Rebuild it using the files under **Full source code** exactly as written.

## Stack & dependencies

React 19, TypeScript, and Vite.

## Layout & content

Cream full-screen frame with a tracked wordmark and draggable print collage.

## Interactions & animation

Pan with momentum; labels connect to prints with hairlines; optional lightbox.

## Responsive behaviour

Single viewport hero; footer stacks on narrow screens.

## Accessibility & robustness

Real buttons and links; focus rings; reduced-motion path.

## Performance notes

Small WebP thumbnails; one animation loop.

## Assets

Placeholder paths under `src/assets/` in the sample files below.

## Putting it in an existing site

Mount the default export as the page hero; scope or drop global resets as needed.

## Full source code

### `src/App.tsx`

```tsx
export default function CollageSample() {
  return <main className="collage-sample">Substrates format sample</main>;
}
```

### `src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")!).render(<App />);
```

## Build / run

```bash
npm install
npm run dev
```

## Limitations

Sample only — not the full Collage product source.
