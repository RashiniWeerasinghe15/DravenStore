"use client";

import { useEffect, useState, useMemo } from "react";
import { getProductsByGender } from "@/lib/products";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function MenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");
  const [fitFilter, setFitFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getProductsByGender("men").then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const fits = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.fit)))],
    [products]
  );

  const filtered = useMemo(() => {
    let list =
      fitFilter === "All"
        ? products
        : products.filter((p) => p.fit === fitFilter);
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "new")
      list = [...list].sort(
        (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      );
    return list;
  }, [products, fitFilter, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Men's T-Shirts
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          {filtered.length} products
        </p>
      </div>

      {/* Filter and sort bar */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-xs font-bold tracking-widest text-white border border-white/30 px-4 py-2 hover:border-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          FILTER
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-black border border-white/30 text-white text-xs tracking-widest px-4 py-2 focus:outline-none"
        >
          <option value="featured">FEATURED</option>
          <option value="new">NEWEST</option>
          <option value="price-asc">PRICE: LOW TO HIGH</option>
          <option value="price-desc">PRICE: HIGH TO LOW</option>
        </select>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-5 bg-zinc-950 border border-white/10">
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-3">
            FIT
          </p>
          <div className="flex flex-wrap gap-2">
            {fits.map((f) => (
              <button
                key={f}
                onClick={() => setFitFilter(f)}
                className={`text-xs px-3 py-1.5 border ${
                  fitFilter === f
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white hover:border-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-zinc-900 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-zinc-500 text-center py-20">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}