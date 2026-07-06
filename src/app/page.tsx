import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export default async function HomePage() {
  const all = await getAllProducts();
  const featured = all.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden bg-black">
        <img
          src="/hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <img
  src="/logo-white.png"
  alt="DRAVEN"
  className="h-20 w-auto mx-auto"
/>
          <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-white">
            DEFINE YOUR LEGACY
          </h1>
          <p className="mt-4 text-zinc-300 max-w-md text-sm md:text-base tracking-wide">
            Premium T-shirts for men and women. Built different.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/men"
              className="bg-white text-black px-8 py-3.5 text-xs font-bold tracking-widest hover:bg-zinc-200 transition-colors"
            >
              SHOP MEN
            </Link>
            <Link
              href="/women"
              className="border border-white text-white px-8 py-3.5 text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              SHOP WOMEN
            </Link>
          </div>
        </div>
      </section>

      {/* Category split */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {[
          { href: "/men", label: "MEN'S COLLECTION", img: "/cat-men.jpg" },
          { href: "/women", label: "WOMEN'S COLLECTION", img: "/cat-women.jpg" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="relative h-[420px] overflow-hidden group"
          >
            <img
              src={c.img}
              alt={c.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-white text-2xl font-bold tracking-widest mb-3">
                  {c.label}
                </h2>
                <span className="text-white text-xs tracking-widest border-b border-white pb-1">
                  SHOP NOW
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-2xl font-bold tracking-wide">
            New Arrivals
          </h2>
          <Link
            href="/men"
            className="text-xs tracking-widest text-zinc-400 hover:text-white"
          >
            VIEW ALL →
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center py-20">
            No products yet — add some in the admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Trust strip */}
      <section className="bg-zinc-950 border-y border-white/10 py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { t: "240GSM Heavyweight Cotton", d: "Built to last, holds shape wash after wash" },
            { t: "Island-wide Delivery", d: "Fast, tracked shipping across Sri Lanka" },
            { t: "Easy Exchanges", d: "7-day hassle-free size exchange" },
          ].map((f, i) => (
            <div key={i}>
              <h3 className="text-white font-bold text-sm tracking-widest mb-2">
                {f.t}
              </h3>
              <p className="text-zinc-500 text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}