import Link from "next/link";
import { getDbProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { DbProduct } from "@/lib/types";

const staticProducts: DbProduct[] = [
  {
    id: "draven-sig-tee",
    name: "Draven Signature Heavyweight Tee",
    price: 3800,
    description: "240GSM luxury tight-knit cotton tee.",
    image_url: "/cat-men.jpg",
    category: "Men",
    stock: 25,
  },
  {
    id: "onyx-box-tee",
    name: "Onyx Premium Box Tee",
    price: 3500,
    description: "Classic boxy silhouette streetwear tee.",
    image_url: "/hero.jpg",
    category: "Men",
    stock: 40,
  },
  {
    id: "phantom-relaxed-tee",
    name: "Phantom Relaxed Tee",
    price: 3200,
    description: "Premium relaxed fit luxury tee.",
    image_url: "/cat-women.jpg",
    category: "Women",
    stock: 15,
  },
  {
    id: "classic-legacy-tee",
    name: "Classic Legacy Tee",
    price: 2900,
    description: "Classic everyday basic cotton tee.",
    image_url: "/cat-men.jpg",
    category: "Men",
    stock: 30,
  },
];

export const revalidate = 30; // Revalidate home page cache every 30s

export default async function HomePage() {
  let dbProducts: DbProduct[] = [];
  let useFallback = false;

  try {
    dbProducts = await getDbProducts();
    if (dbProducts.length === 0) {
      useFallback = true;
    }
  } catch (err) {
    console.warn("Database query failed, falling back to local static mock data:", err);
    useFallback = true;
  }

  const featured = useFallback ? staticProducts : dbProducts.slice(0, 4);

  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpg"
            alt="Draven Collection Hero"
            className="w-full h-full object-cover opacity-50 object-center transition-transform duration-[10000ms] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
          <img
            src="/logo-white.png"
            alt="DRAVEN"
            className="h-20 w-auto object-contain mb-6 animate-pulse"
          />
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-[0.3em] uppercase text-white drop-shadow-md">
            DEFINE YOUR LEGACY
          </h1>
          <p className="mt-4 text-zinc-300 max-w-lg text-sm md:text-lg tracking-wide leading-relaxed">
            Premium Heavyweight T-shirts. Engineered with 240GSM cotton. Designed to make a statement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/men"
              className="bg-white text-black px-10 py-4 text-xs font-black tracking-widest hover:bg-zinc-200 transition-all duration-300 transform hover:-translate-y-0.5 text-center uppercase"
            >
              SHOP MEN
            </Link>
            <Link
              href="/women"
              className="border border-white/60 text-white px-10 py-4 text-xs font-black tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:-translate-y-0.5 text-center uppercase"
            >
              SHOP WOMEN
            </Link>
          </div>
        </div>
      </section>

      {/* Category Selection Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 w-full border-t border-b border-white/10">
        {[
          { href: "/men", label: "MEN'S COLLECTION", img: "/cat-men.jpg", desc: "Heavyweight streetwear fits" },
          { href: "/women", label: "WOMEN'S COLLECTION", img: "/cat-women.jpg", desc: "Curated minimalist silhouettes" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="relative h-[480px] w-full overflow-hidden group flex items-end justify-start p-8 md:p-12 border-b md:border-b-0 last:border-b-0 md:first:border-r border-white/10"
          >
            <img
              src={c.img}
              alt={c.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] tracking-[0.2em] text-zinc-400 font-bold uppercase">{c.desc}</span>
              <h2 className="text-white text-2xl md:text-3xl font-black tracking-widest mt-1 mb-4">
                {c.label}
              </h2>
              <span className="inline-block text-white text-xs tracking-widest font-bold border-b border-white pb-1 group-hover:border-white/50 transition-colors">
                EXPLORE NOW →
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">CURATED COLLECTION</span>
            <h2 className="text-white text-3xl font-extrabold tracking-wide mt-1">
              New Drops {useFallback && <span className="text-[10px] text-zinc-600 font-mono italic">(Local Mock Data)</span>}
            </h2>
          </div>
          <div className="flex gap-4">
            <Link
              href="/test-db"
              className="text-xs tracking-widest text-zinc-500 hover:text-white border-b border-zinc-900 hover:border-white pb-1 transition-all duration-300"
            >
              CONNECTION TEST
            </Link>
            <span className="text-zinc-700">|</span>
            <Link
              href="/men"
              className="text-xs tracking-widest text-zinc-400 hover:text-white border-b border-zinc-800 hover:border-white pb-1 transition-all duration-300"
            >
              VIEW ALL PRODUCTS →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Ethos / Features Section */}
      <section className="bg-zinc-950 border-t border-b border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {[
              {
                t: "240GSM Heavyweight Cotton",
                d: "Crafted from tight-knit luxury cotton. Holds its boxy shape, wash after wash. Unmatched comfort and durability.",
              },
              {
                t: "Premium Local Craftsmanship",
                d: "Designed and manufactured in Sri Lanka. Tailored specifically for individuals who demand both style and substance.",
              },
              {
                t: "Carbon Neutral Shipping",
                d: "Fast, tracked shipping island-wide, wrapped entirely in sustainable, biodegradable custom packaging.",
              },
            ].map((f, i) => (
              <div key={i} className="flex flex-col gap-3">
                <span className="text-zinc-600 text-xs font-bold tracking-[0.2em]">0{i + 1} / FEATURE</span>
                <h3 className="text-white font-extrabold text-lg tracking-wider">
                  {f.t}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}