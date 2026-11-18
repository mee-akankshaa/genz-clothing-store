"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { count, hydrated } = useCart();
  const wish = useWishlist();
  return (
    <header className="sticky top-0 z-40 border-b-4 border-current bg-paper dark:bg-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-volt focus:p-3 focus:text-ink">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="font-display text-3xl uppercase tracking-tight">
          Drip<span className="bg-volt px-1 text-ink">Lab</span>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase">
          <Link href="/shop" className="chip">Shop</Link>
          <Link href="/wishlist" className="chip">
            Wishlist{wish.hydrated && wish.slugs.length > 0 ? ` (${wish.slugs.length})` : ""}
          </Link>
          <Link href="/cart" className="chip bg-hot text-ink" aria-label={`Cart, ${hydrated ? count : 0} items`}>
            Cart ({hydrated ? count : 0})
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
