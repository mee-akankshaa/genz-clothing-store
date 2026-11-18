"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/lib/products";
import { cartTotals, formatPrice, SHIPPING_FREE_OVER } from "@/lib/utils";
import ProductArt from "./ProductArt";

export default function CartView() {
  const { items, hydrated, setQty, remove } = useCart();

  if (!hydrated) return <p aria-busy="true">Loading your cart...</p>;

  if (items.length === 0) {
    return (
      <div className="border-2 border-dashed border-current p-10 text-center">
        <p className="font-display text-3xl uppercase">Cart is empty</p>
        <Link href="/shop" className="btn mt-4">Go shopping</Link>
      </div>
    );
  }

  const { subtotal, shipping, total } = cartTotals(items);
  const away = Math.max(0, SHIPPING_FREE_OVER - subtotal);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <ul className="space-y-4">
        {items.map((i) => {
          const p = getProduct(i.slug);
          if (!p) return null;
          const col = p.colors.find((c) => c.name === i.color);
          return (
            <li key={i.key} className="flex gap-4 border-2 border-current p-3">
              <div className="h-24 w-24 shrink-0 border-2 border-current sm:h-32 sm:w-32">
                <ProductArt category={p.category} from={p.art.from} to={p.art.to} accent={p.art.accent} tint={col?.hex} label={p.name} />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link href={`/product/${p.slug}`} className="font-display text-xl uppercase hover:underline">{p.name}</Link>
                    <p className="text-sm">{i.color} / {i.size}</p>
                  </div>
                  <p className="font-bold">{formatPrice(p.price * i.qty)}</p>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <div role="group" aria-label={`Quantity for ${p.name}`} className="flex items-center border-2 border-current">
                    <button type="button" className="h-11 w-11 text-xl font-black" aria-label="Decrease quantity" onClick={() => setQty(i.key, i.qty - 1)}>-</button>
                    <output className="w-8 text-center font-bold" aria-live="polite">{i.qty}</output>
                    <button type="button" className="h-11 w-11 text-xl font-black" aria-label="Increase quantity" disabled={i.qty >= 10} onClick={() => setQty(i.key, i.qty + 1)}>+</button>
                  </div>
                  <button type="button" className="min-h-[44px] text-sm font-bold uppercase underline" onClick={() => remove(i.key)}>Remove</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside aria-label="Order summary" className="h-fit border-4 border-current p-5 shadow-pop-lg">
        <h2 className="font-display text-3xl uppercase">Summary</h2>
        <dl className="mt-4 space-y-2">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
          <div className="flex justify-between border-t-2 border-current pt-2 text-xl font-black"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
        {away > 0 && <p className="mt-3 text-sm font-bold">Add {formatPrice(away)} more for free shipping.</p>}
        <Link href="/checkout" className="btn mt-5 w-full">Checkout</Link>
      </aside>
    </div>
  );
}
