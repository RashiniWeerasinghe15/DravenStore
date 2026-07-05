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
            <span className="text-[10px]