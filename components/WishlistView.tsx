"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function WishlistView() {
  const { slugs, hydrated } = useWishlist();
  if (!hydrated) return <p aria-busy="true">Loading...</p>;
  const saved = products.filter((p) => slugs.includes(p.slug));
  if (saved.length === 0) {
    return (
      <div className="border-2 border-dashed border-current p-10 text-center">
        <p className="font-display text-3xl uppercase">No saves yet</p>
        <Link href="/shop" className="btn mt-4">Find something</Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {saved.map((p) => <ProductCard key={p.slug} product={p} />)}
    </div>
  );
}
