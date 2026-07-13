"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { getDbProducts } from "@/lib/products";
import { DbProduct } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const [allProducts, setAllProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getDbProducts();
        setAllProducts(data);
      } catch (err) {
        console.warn("Failed to fetch database products inside wishlist page:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const wishlistItems = allProducts.filter((p) => wishlist.includes(p.id));

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs tracking-widest text-zinc-500 uppercase font-bold">
            LOADING WISHLIST...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Header */}
      <section className="relative h-[25vh] min-h-[180px] w-full bg-zinc-950 flex flex-col justify-end p-8 md:p-12 border-b border-white/10">
        <div className="relative z-10 max-w-4xl">
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">FAVORITES</span>
          <h1 className="text-3xl md:text-4xl font-black tracking-widest mt-1 uppercase text-white">
            MY WISHLIST ({wishlistItems.length})
          </h1>
        </div>
      </section>

      {/* Content grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-zinc-950/20 p-6 max-w-lg mx-auto">
            <p className="text-zinc-500 text-sm mb-4">Your wishlist is currently empty.</p>
            <p className="text-zinc-400 text-xs mb-6 uppercase tracking-wider">
              Collect items you like to view them in one place.
            </p>
            <Link
              href="/men"
              className="bg-white text-black text-xs font-black tracking-widest px-6 py-3 hover:bg-zinc-200 transition-colors uppercase inline-block"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
