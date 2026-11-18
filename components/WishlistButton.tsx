"use client";

import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { has, toggle, hydrated } = useWishlist();
  const on = hydrated && has(slug);
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`chip bg-paper text-ink ${on ? "!bg-hot" : ""} ${className}`}
    >
      {on ? "Saved" : "Save"}
    </button>
  );
}
