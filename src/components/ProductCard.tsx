"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DbProduct } from "@/lib/types";

const fmt = (n: number) => `LKR ${Number(n).toLocaleString("en-LK")}.00`;

export default function ProductCard({ product }: { product: DbProduct }) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking the button
    setAdding(true);
    setTimeout(() => setAdding(false), 1500);
  };

  const imageSrc = product.image_url || "/hero.jpg";

  return (
    <div className="group relative flex flex-col bg-zinc-950 border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10">
      
      {/* Product Image Wrapper */}
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 block">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={false}
        />
        
        {/* Category tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[9px] font-black tracking-widest px-2.5 py-1 bg-black/80 backdrop-blur-sm text-white uppercase border border-white/10">
            {product.category}
          </span>
        </div>

        {/* Low Stock Indicator */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-[8px] font-bold tracking-wider px-2 py-0.5 bg-red-950/80 backdrop-blur-sm text-red-400 border border-red-800/40">
              LOW STOCK ({product.stock})
            </span>
          </div>
        )}
        
        {/* Out of Stock Indicator */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="text-xs font-black tracking-widest px-4 py-2 bg-red-900 text-white uppercase">
              OUT OF STOCK
            </span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-4">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-bold text-white group-hover:text-zinc-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-zinc-500 text-xs mt-1 font-mono">
            {fmt(product.price)}
          </p>
        </div>

        {/* Add to Cart Button */}
        {product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className={`w-full text-[10px] font-black tracking-widest py-3 border transition-all duration-300 uppercase ${
              adding
                ? "bg-white text-black border-white scale-[0.98]"
                : "bg-transparent text-white border-white/20 hover:border-white hover:bg-white hover:text-black"
            }`}
          >
            {adding ? (
              <span className="flex items-center justify-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                ADDED
              </span>
            ) : (
              "ADD TO CART"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
