"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import type { Category, SortKey } from "@/lib/types";
import { sortProducts } from "@/lib/utils";
import ProductCard from "./ProductCard";

const SIZES = ["XS", "S", "M", "L", "XL", "One Size"] as const;
const catIds = categories.map((c) => c.id) as string[];

export default function ShopClient() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const cat = sp.get("cat") ?? "";
  const size = sp.get("size") ?? "";
  const q = sp.get("q") ?? "";
  const sortParam = sp.get("sort");
  const sort: SortKey = sortParam === "price-asc" || sortParam === "price-desc" ? sortParam : "featured";

  const [text, setText] = useState(q);
  useEffect(() => setText(q), [q]);

  // All filter state lives in the URL so views are shareable and survive refresh.
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = products.filter(
      (p) =>
        (!cat || p.category === (cat as Category)) &&
        (!size || p.sizes.some((s) => s === size)) &&
        (!term || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term)),
    );
    return sortProducts(filtered, sort);
  }, [cat, size, q, sort]);

  return (
    <div>
      <h1 className="h-big mb-6">Shop</h1>

      <form role="search" onSubmit={(e) => e.preventDefault()} className="mb-6 grid gap-4 border-2 border-current p-4 md:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="q" className="mb-1 block text-sm font-bold uppercase">Search</label>
          <input id="q" type="search" className="field" placeholder="hoodie, cargo, bag..." value={text} onChange={(e) => { setText(e.target.value); setParam("q", e.target.value); }} />
        </div>
        <div>
          <label htmlFor="sort" className="mb-1 block text-sm font-bold uppercase">Sort by price</label>
          <select id="sort" className="field bg-paper dark:bg-ink" value={sort} onChange={(e) => setParam("sort", e.target.value === "featured" ? "" : e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Low to high</option>
            <option value="price-desc">High to low</option>
          </select>
        </div>

        <fieldset className="md:col-span-2">
          <legend className="mb-1 text-sm font-bold uppercase">Category</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="chip" aria-pressed={!cat} onClick={() => setParam("cat", "")}>All</button>
            {categories.map((c) => (
              <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setParam("cat", cat === c.id ? "" : c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="md:col-span-2">
          <legend className="mb-1 text-sm font-bold uppercase">Size</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="chip" aria-pressed={!size} onClick={() => setParam("size", "")}>Any</button>
            {SIZES.map((s) => (
              <button key={s} type="button" className="chip" aria-pressed={size === s} onClick={() => setParam("size", size === s ? "" : s)}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      </form>

      {cat && !catIds.includes(cat) && <p className="mb-4 font-bold">Unknown category, showing nothing.</p>}
      <p aria-live="polite" className="mb-4 font-bold">{results.length} {results.length === 1 ? "piece" : "pieces"}</p>

      {results.length === 0 ? (
        <div className="border-2 border-dashed border-current p-10 text-center">
          <p className="font-display text-3xl uppercase">Nothing here</p>
          <button type="button" className="btn mt-4" onClick={() => router.replace(pathname)}>Clear filters</button>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => <li key={p.slug} className="flex"><div className="w-full"><ProductCard product={p} /></div></li>)}
        </ul>
      )}
    </div>
  );
}
