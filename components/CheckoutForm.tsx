"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { cartTotals, formatPrice } from "@/lib/utils";

type Fields = "name" | "email" | "address" | "city" | "zip" | "card" | "expiry" | "cvc";
type Errors = Partial<Record<Fields, string>>;

const LABELS: Record<Fields, string> = {
  name: "Full name",
  email: "Email",
  address: "Street address",
  city: "City",
  zip: "ZIP / postal code",
  card: "Card number (fake, e.g. 4242 4242 4242 4242)",
  expiry: "Expiry (MM/YY)",
  cvc: "CVC",
};

function validate(v: Record<Fields, string>): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email.";
  if (v.address.trim().length < 4) e.address = "Enter your address.";
  if (v.city.trim().length < 2) e.city = "Enter your city.";
  if (!/^[A-Za-z0-9 -]{3,10}$/.test(v.zip.trim())) e.zip = "Enter a valid ZIP.";
  if (!/^\d{13,19}$/.test(v.card.replace(/\s/g, ""))) e.card = "Card number should be 13 to 19 digits.";
  const m = /^(\d{2})\/(\d{2})$/.exec(v.expiry.trim());
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.expiry = "Use MM/YY.";
  if (!/^\d{3,4}$/.test(v.cvc)) e.cvc = "3 or 4 digits.";
  return e;
}

export default function CheckoutForm() {
  const { items, hydrated, clear } = useCart();
  const [values, setValues] = useState<Record<Fields, string>>({ name: "", email: "", address: "", city: "", zip: "", card: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<{ id: string; total: number } | null>(null);

  if (!hydrated) return <p aria-busy="true">Loading...</p>;

  if (done) {
    return (
      <div role="status" className="border-4 border-current bg-volt p-8 text-ink shadow-pop-lg">
        <span className="sticker">Order confirmed</span>
        <h2 className="h-big mt-4">You're in, {values.name.split(" ")[0]}.</h2>
        <p className="mt-3 text-lg font-semibold">Mock order {done.id} for {formatPrice(done.total)}. Nothing was charged and no data was sent.</p>
        <Link href="/shop" className="btn mt-6 bg-ink !text-volt">Keep shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="border-2 border-dashed border-current p-10 text-center">
        <p className="font-display text-3xl uppercase">Nothing to check out</p>
        <Link href="/shop" className="btn mt-4">Go shopping</Link>
      </div>
    );
  }

  const { subtotal, shipping, total } = cartTotals(items);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setDone({ id: `DL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, total });
    clear();
  };

  const fields = Object.keys(LABELS) as Fields[];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f} className={f === "name" || f === "email" || f === "address" || f === "card" ? "sm:col-span-2" : ""}>
            <label htmlFor={f} className="mb-1 block text-sm font-bold uppercase">{LABELS[f]}</label>
            <input
              id={f}
              name={f}
              className="field"
              value={values[f]}
              autoComplete="off"
              inputMode={f === "card" || f === "cvc" ? "numeric" : undefined}
              aria-invalid={!!errors[f]}
              aria-describedby={errors[f] ? `${f}-err` : undefined}
              onChange={(e) => setValues((p) => ({ ...p, [f]: e.target.value }))}
            />
            {errors[f] && <p id={`${f}-err`} role="alert" className="mt-1 text-sm font-bold text-hot">{errors[f]}</p>}
          </div>
        ))}
        <button type="submit" className="btn sm:col-span-2">Place mock order</button>
      </form>

      <aside aria-label="Order summary" className="h-fit border-4 border-current p-5">
        <h2 className="font-display text-2xl uppercase">Order</h2>
        <dl className="mt-3 space-y-1">
          <div className="flex justify-between"><dt>Items</dt><dd>{items.reduce((s, i) => s + i.qty, 0)}</dd></div>
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
          <div className="flex justify-between border-t-2 border-current pt-2 font-black"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
