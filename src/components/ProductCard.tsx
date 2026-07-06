"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

const fmt = (n: number) => `LKR ${n.toLocaleString("en-LK")}.00`;

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { profile, toggleWishlist } = useAuth();
  const liked = profile?.wishlist?.includes(product.id) ?? false;

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-zinc-900 aspect-[4/5]">
        <img
          src={
            hovered && product.images[1]
              ? product.images[1]
              : product.images[0]
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="text-[10px] tracking-widest font-bold px-2 py-1 bg-white text-black">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="text-[10px] tracking-widest font-bold px-2 py-1 bg-black text-white border border-white/30">
              BEST SELLER
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] tracking-widest font-bold px-2 py-1 bg-red-700 text-white">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={liked ? "#dc2626" : "none"}
            stroke={liked ? "#dc2626" : "white"}
            strokeWidth="2"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>

        {/* Quick view */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            href={`/product/${product.id}`}
            className="block w-full bg-white text-black text-center text-xs font-bold tracking-widest py-3 hover:bg-zinc-200 transition-colors"
          >
            VIEW PRODUCT
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="pt-3 pb-6">
        <p className="text-[11px] tracking-widest text-zinc-500 uppercase mb-1">
          {product.fit}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-white hover:text-zinc-300">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-white">
            {fmt(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-500 line-through">
              {fmt(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}