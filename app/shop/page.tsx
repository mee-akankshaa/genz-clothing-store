import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense fallback={<p>Loading the drip...</p>}>
      <ShopClient />
    </Suspense>
  );
}
