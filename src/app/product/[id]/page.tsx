"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/products";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const fmt = (n: number) => `LKR ${n.toLocaleString("en-LK")}.00`;

const COLORS: Record<string, string> = {
  Black: "#0a0a0a",
  White: "#f5f5f5",
  Red: "#7f1d1d",
  Charcoal: "#374151",
  Olive: "#4d4d33",
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [toast, setToast] = useState("");
  const { addToCart, setCartOpen } = useCart();
  const { profile, toggleWishlist } = useAuth();

  useEffect(() => {
    getProductById(id as string).then((p) => {
      setProduct(p);
      if (p) setColor(p.colors[0]);
      setLoading(false);
    });
  }, [id]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleAdd = () => {
    if (!size) {
      showToast("Please select a size");
      return;
    }
    if (!product) return;
    addToCart(product, size, color);
    setCartOpen(true);
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center py-20 text-zinc-500">
        Product not found.
      </p>
    );
  }

  const liked = profile?.wishlist?.includes(product.id) ?? false;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-2 gap-10">

      {/* Images */}
      <div>
        <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`w-16 h-20 border-2 overflow-hidden ${
                  imgIdx === i ? "border-white" : "border-white/20"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <p className="text-xs tracking-widest text-zinc-500 uppercase">
          {product.fit}
        </p>
        <h1 className="text-2xl font-bold text-white mt-1">
          {product.name}
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl text-white font-semibold">
            {fmt(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-zinc-500 line-through">
              {fmt(product.originalPrice)}
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
          {product.description}
        </p>

        {/* Color picker */}
        <div className="mt-6">
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-2">
            COLOR — {color}
          </p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-9 h-9 rounded-full border-2 ${
                  color === c ? "border-white" : "border-white/20"
                }`}
                style={{ background: COLORS[c] || "#888" }}
                title={c}
              />
            ))}
          </div>
        </div>

        {/* Size picker */}
        <div className="mt-6">
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-2">
            SIZE {size ? `— ${size}` : ""}
          </p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-12 h-11 text-xs font-bold border ${
                  size === s
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white hover:border-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleAdd}
            className="flex-1 bg-white text-black font-bold text-xs tracking-widest py-4 hover:bg-zinc-200 transition-colors"
          >
            ADD TO CART
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`w-14 flex items-center justify-center border ${
              liked
                ? "border-red-600 bg-red-600/10"
                : "border-white/30"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={liked ? "#dc2626" : "none"}
              stroke={liked ? "#dc2626" : "white"}
              strokeWidth="2"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>
        </div>

        {/* Extra info */}
        <div className="mt-6 pt-6 border-t border-white/10 text-xs text-zinc-500 space-y-1">
          <p>✓ 240GSM premium combed cotton</p>
          <p>✓ Free island-wide delivery over LKR 10,000</p>
          <p>✓ 7-day exchange policy</p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-2xl font-medium text-sm z-[100]">
          {toast}
        </div>
      )}
    </div>
  );
}