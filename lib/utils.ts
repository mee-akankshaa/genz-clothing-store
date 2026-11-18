import type { CartItem, Product, SortKey } from "./types";
import { getProduct } from "./products";

export const formatPrice = (n: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const cartKey = (slug: string, size: string, color: string): string =>
  `${slug}|${size}|${color}`;

export function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const SHIPPING_FREE_OVER = 100;
export const SHIPPING_FLAT = 6;

export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => {
    const p = getProduct(i.slug);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
  const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FLAT;
  return { subtotal, shipping, total: subtotal + shipping };
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
  return copy;
}

export const cx = (...c: (string | false | null | undefined)[]): string =>
  c.filter(Boolean).join(" ");
