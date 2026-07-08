import Link from "next/link";
import { getDbProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

import { DbProduct } from "@/lib/types";

export const revalidate = 60; // Cache page for 60 seconds

export default async function MenCollectionPage() {
  let products: DbProduct[] = [];
  let errorMsg = null;

  try {
    products = await getDbProductsByCategory("Men");
  } catch (err: any) {
    errorMsg = err?.message || "Failed to fetch database products.";
  }

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Category Header */}
      <section className="relative h-[40vh] min-h-[250px] w-full bg-zinc-950 flex flex-col justify-end p-8 md:p-16 border-b border-white/10 overflow-hidden">
        {/* Background Image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cat-men.jpg"
            alt="Men's Collection Banner"
            className="w-full h-full object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">COLLECTION</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-widest mt-1 uppercase text-white">
            MEN
          </h1>
          <p className="text-zinc-400 text-sm mt-3 max-w-lg leading-relaxed">
            Engineered streetwear staples. Premium heavyweight materials, boxy silhouettes, and clean aesthetics designed for longevity.
          </p>
        </div>
      </section>

      {/* Grid Display */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {errorMsg ? (
          <div className="bg-red-950/20 border border-red-900/40 p-5 max-w-lg mx-auto text-center rounded">
            <p className="text-red-400 text-sm font-semibold mb-2">Database Connection Issue</p>
            <p className="text-zinc-400 text-xs mb-4">{errorMsg}</p>
            <Link
              href="/test-db"
              className="text-xs font-bold tracking-widest text-white border-b border-white pb-1"
            >
              RUN DIAGNOSTIC CONNECTION TEST
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-zinc-950/20 p-6 max-w-lg mx-auto">
            <p className="text-zinc-500 text-sm mb-4">No products found in this category.</p>
            <p className="text-zinc-400 text-xs mb-6">
              If you haven't seeded your database, navigate to our connection test page to run SQL setup.
            </p>
            <Link
              href="/test-db"
              className="bg-white text-black text-xs font-black tracking-widest px-6 py-3 hover:bg-zinc-200 transition-colors uppercase inline-block"
            >
              DATABASE SETUP
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
