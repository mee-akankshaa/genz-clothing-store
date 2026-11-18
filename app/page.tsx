import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export default function Home() {
  const drop = products.filter((p) => p.drop);
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden border-4 border-current bg-volt p-6 text-ink shadow-pop-lg sm:p-12">
        <span className="sticker">Drop 07</span>
        <h1 className="h-big mt-4 max-w-3xl text-6xl sm:text-8xl">Wear the noise.</h1>
        <p className="mt-4 max-w-lg text-lg font-semibold">
          Oversized fits, loud colours and pockets that actually hold things. Fresh Static drop is live.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/shop" className="btn bg-ink !text-volt">Shop all</Link>
          <Link href="/shop?cat=hoodies" className="btn bg-paper">Hoodies</Link>
        </div>
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-hot sm:h-80 sm:w-80" />
      </section>

      <div aria-hidden className="-mx-4 overflow-hidden border-y-4 border-current bg-ink py-2 text-volt">
        <div className="flex w-max animate-marquee gap-8 font-display text-2xl uppercase">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>Free shipping over $100 &bull; New drops weekly &bull;</span>
          ))}
        </div>
      </div>

      <section aria-labelledby="drop-h">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="drop-h" className="h-big !text-4xl sm:!text-6xl">Drop 07: Static</h2>
          <Link href="/shop" className="font-bold underline">See everything</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {drop.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section aria-labelledby="cat-h">
        <h2 id="cat-h" className="h-big mb-6 !text-4xl sm:!text-6xl">Pick your lane</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c, i) => (
            <li key={c.id}>
              <Link
                href={`/shop?cat=${c.id}`}
                className={`flex h-full min-h-[140px] flex-col justify-between border-2 border-current p-4 shadow-pop transition hover:-translate-y-1 ${["bg-hot", "bg-grape", "bg-volt", "bg-sky", "bg-paper"][i]} text-ink`}
              >
                <span className="font-display text-2xl uppercase">{c.label}</span>
                <span className="text-sm font-semibold">{c.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
