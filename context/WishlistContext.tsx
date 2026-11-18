"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { safeParse } from "@/lib/utils";

const STORAGE_KEY = "driplab-wishlist-v1";

interface WishCtx {
  slugs: string[];
  hydrated: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
}

const Ctx = createContext<WishCtx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSlugs(safeParse<string[]>(window.localStorage.getItem(STORAGE_KEY), []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs, hydrated]);

  const toggle = useCallback(
    (slug: string) => setSlugs((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug])),
    [],
  );
  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const value = useMemo(() => ({ slugs, hydrated, has, toggle }), [slugs, hydrated, has, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWishlist(): WishCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWishlist must be used inside WishlistProvider");
  return c;
}
