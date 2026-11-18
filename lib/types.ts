export type Category = "tees" | "hoodies" | "cargos" | "jackets" | "accessories";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "One Size";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  description: string;
  details: string[];
  sizes: Size[];
  colors: ColorOption[];
  badge?: "NEW" | "HOT" | "SALE" | "LIMITED";
  drop?: string;
  art: { from: string; to: string; accent: string };
}

export interface CartItem {
  key: string;
  slug: string;
  size: Size;
  color: string;
  qty: number;
}

export type SortKey = "featured" | "price-asc" | "price-desc";
