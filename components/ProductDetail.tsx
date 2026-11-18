"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import ProductArt from "./ProductArt";
import WishlistButton from "./WishlistButton";

export default function ProductDetail({ product: p }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(p.sizes.length === 1 ? p.sizes[0] : null);
  const [color, setColor] = useState(p.colors[0]);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const onAdd = () => {
    if (!size) {
      setError("Pick a size first.");
      return;
    }
    setError("");
    add(p.slug, size, color.name);
    setAdded(true);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square border-4 border-current shadow-pop-lg">
        <ProductArt category={p.category} from={p.art.from} to={p.art.to} accent={p.art.accent} tint={color.hex} label={p.name} />
        {p.badge && <span className="sticker absolute left-3 top-3 text-lg">{p.badge}</span>}
      </div>

      <div className="space-y-6">
        <nav aria-label="Breadcrumb" className="text-sm font-bold uppercase">
          <Link href="/shop" className="underline">Shop</Link> / <Link href={`/shop?cat=${p.category}`} className="underline">{p.category}</Link>
        </nav>
        <h1 className="h-big">{p.name}</h1>
        <p className="flex items-baseline gap-3 text-3xl font-black">
          {formatPrice(p.price)}
          {p.compareAt && <span className="text-lg font-bold line-through opacity-60">{formatPrice(p.compareAt)}</span>}
        </p>
        <p className="text-lg">{p.description}</p>

        <div role="radiogroup" aria-label="Colour">
          <p className="mb-2 text-sm font-bold uppercase">Colour: {color.name}</p>
          <div className="flex flex-wrap gap-2">
            {p.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                role="radio"
                aria-checked={color.name === c.name}
                aria-label={c.name}
                onClick={() => setColor(c)}
                className={`h-11 w-11 border-2 border-current ${color.name === c.name ? "outline outline-4 outline-offset-2 outline-hot" : ""}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div role="radiogroup" aria-label="Size">
          <p className="mb-2 text-sm font-bold uppercase">Size{size ? `: ${size}` : ""}</p>
          <div className="flex flex-wrap gap-2">
            {p.sizes.map((s) => (
              <button key={s} type="button" role="radio" aria-checked={size === s} className="chip" onClick={() => { setSize(s); setError(""); }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn" onClick={onAdd}>Add to cart</button>
          <WishlistButton slug={p.slug} name={p.name} />
        </div>
        <div aria-live="polite" className="min-h-[1.5rem] font-bold">
          {error && <span className="text-hot">{error}</span>}
          {added && !error && (
            <span>Added. <Link href="/cart" className="underline">View cart</Link></span>
          )}
        </div>

        <ul className="list-disc space-y-1 pl-5">
          {p.details.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </div>
    </div>
  );
}
