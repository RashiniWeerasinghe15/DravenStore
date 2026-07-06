"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProductById } from "@/lib/products";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { profile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.wishlist?.length) {
      setLoading(false);
      return;
    }
    Promise.all(
      profile.wishlist.map((id) => getProductById(id))
    ).then((results) => {
      setProducts(results.filter(Boolean) as Product[]);
      setLoading(false);
    });
  }, [profile?.wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-white mb-8">
        Wishlist
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-zinc-900 animate-pulse"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-sm">
            Your wishlist is empty.
          </p>
          <Link
            href="/men"
            className="mt-4 inline-block text-xs tracking-widest text-white border-b border-white pb-1"
          >
            DISCOVER PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}