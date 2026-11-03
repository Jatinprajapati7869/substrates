import { useEffect, useMemo, useState } from "react";
import { catalog, productPhoto, productPrice, type Product } from "@/lib/catalog";

const FAV_KEY = "supply-favorites";

/** Favorites are stored by product name, shared with the homepage hearts. */
export function filterProducts(
  items: Product[],
  opts: {
    query: string;
    category: string;
    platform: string;
    savedOnly: boolean;
    favorites: string[];
  },
) {
  const q = opts.query.trim().toLowerCase();
  return items.filter((p) => {
    if (opts.category && p.category !== opts.category) return false;
    if (opts.platform && (p.platform ?? "") !== opts.platform) return false;
    if (opts.savedOnly && !opts.favorites.includes(p.name)) return false;
    if (!q) return true;
    return [p.name, p.category, p.subcategory, p.description, p.platform ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}

export function CatalogBrowser({ kind }: { kind: Product["kind"] }) {
  const items = useMemo(() => catalog.filter((p) => p.kind === kind), [kind]);
  const categories = useMemo(
    () => [...new Set(items.map((p) => p.category).filter(Boolean))].sort(),
    [items],
  );
  const platforms = useMemo(
    () => [...new Set(items.map((p) => p.platform).filter(Boolean) as string[])].sort(),
    [items],
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(24);

  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, loaded]);
  useEffect(() => setLimit(24), [query, category, platform, savedOnly]);

  const results = filterProducts(items, { query, category, platform, savedOnly, favorites });
  const toggle = (name: string) =>
    setFavorites((f) => (f.includes(name) ? f.filter((n) => n !== name) : [...f, name]));
  const base = kind === "template" ? "/templates" : "/sections";
  const field =
    "h-10 rounded-full border border-black/10 bg-white px-4 text-[13px] text-[var(--text)] outline-none focus:border-black/30";

  return (
    <section
      aria-label={`Browse ${kind}s`}
      className="mb-12 rounded-[20px] border border-black/[0.06] bg-white/70 p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          aria-label={`Search ${kind}s`}
          placeholder={`Search ${items.length} ${kind}s…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${field} min-w-[200px] flex-1`}
        />
        <select
          aria-label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={field}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {platforms.length > 1 && (
          <select
            aria-label="Platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className={field}
          >
            <option value="">All platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        )}
        <button
          type="button"
          aria-pressed={savedOnly}
          onClick={() => setSavedOnly((s) => !s)}
          className={`${field} ${savedOnly ? "border-black bg-black text-white" : ""}`}
        >
          ♥ Saved ({favorites.filter((n) => items.some((p) => p.name === n)).length})
        </button>
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-tertiary)]" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>
      {results.length === 0 ? (
        <p className="py-10 text-center text-[13px] text-[var(--text-secondary)]">
          {savedOnly
            ? "No saved items yet — tap the heart on any card to save it."
            : "Nothing matches. Try another search."}
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.slice(0, limit).map((p) => {
            const on = favorites.includes(p.name);
            return (
              <li
                key={p.slug}
                className="group relative overflow-hidden rounded-[16px] border border-black/[0.06] bg-white"
              >
                <a href={`${base}/${p.slug}`} className="block">
                  <img
                    src={productPhoto(p.slug) ?? p.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="p-3">
                    <div className="text-[14px] font-medium text-[var(--text)]">{p.name}</div>
                    <div className="mt-0.5 text-[12px] text-[var(--text-tertiary)]">
                      {p.category} · {productPrice(p)}
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  aria-label={`${on ? "Remove" : "Add"} ${p.name} ${on ? "from" : "to"} favorites`}
                  aria-pressed={on}
                  onClick={() => toggle(p.name)}
                  className={`absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[16px] shadow ${on ? "text-[#ff5206]" : "text-black/40"}`}
                >
                  {on ? "♥" : "♡"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {results.length > limit && (
        <div className="mt-5 text-center">
          <button type="button" onClick={() => setLimit((l) => l + 24)} className={field}>
            Show more ({results.length - limit} left)
          </button>
        </div>
      )}
    </section>
  );
}
