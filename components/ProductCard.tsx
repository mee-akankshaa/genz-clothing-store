import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import ProductArt from "./ProductArt";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="group relative flex flex-col border-2 border-current bg-paper text-ink shadow-pop transition hover:-translate-y-1 dark:bg-ink dark:text-paper">
      <div className="relative aspect-square overflow-hidden border-b-2 border-current">
        <Link href={`/product/${p.slug}`} aria-label={`View ${p.name}`} tabIndex={-1}>
          <ProductArt category={p.category} {...p.art} label={p.name} />
        </Link>
        {p.badge && <span className="sticker absolute left-2 top-2">{p.badge}</span>}
        <WishlistButton slug={p.slug} name={p.name} className="absolute right-2 top-2 !min-h-[36px] !min-w-0 !px-2" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-display text-xl uppercase leading-tight">
          <Link href={`/product/${p.slug}`} className="after:absolute after:inset-0 after:content-none hover:underline">
            {p.name}
          </Link>
        </h3>
        <p className="mt-auto flex items-baseline gap-2 font-bold">
          <span>{formatPrice(p.price)}</span>
          {p.compareAt && <span className="text-sm line-through opacity-60">{formatPrice(p.compareAt)}</span>}
        </p>
      </div>
    </article>
  );
}
