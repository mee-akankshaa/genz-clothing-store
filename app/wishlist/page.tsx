import type { Metadata } from "next";
import WishlistView from "@/components/WishlistView";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div>
      <h1 className="h-big mb-6">Wishlist</h1>
      <WishlistView />
    </div>
  );
}
