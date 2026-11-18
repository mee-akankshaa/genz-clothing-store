import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div>
      <h1 className="h-big mb-6">Your cart</h1>
      <CartView />
    </div>
  );
}
