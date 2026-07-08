"use client";

import { useState } from "react";
import { DbProduct } from "@/lib/types";

export default function ProductActions({ product }: { product: DbProduct }) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Black");
  const [qty, setQty] = useState<number>(1);
  const [adding, setAdding] = useState(false);

  const sizes = ["S", "M", "L", "XL"];
  const colors = [
    { name: "Black", class: "bg-black border-white/20" },
    { name: "Charcoal", class: "bg-zinc-800 border-white/20" },
    { name: "White", class: "bg-white border-black/20" },
  ];

  const handleAddToCart = () => {
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      alert(`Added to Cart:\n- 1x ${product.name}\n- Size: ${selectedSize}\n- Color: ${selectedColor}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Color Selector */}
      <div>
        <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-3">
          COLOR: <span className="text-white">{selectedColor}</span>
        </h4>
        <div className="flex gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${c.class} ${
                selectedColor === c.name
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                  : "hover:scale-105"
              }`}
              aria-label={c.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            SIZE: <span className="text-white">{selectedSize}</span>
          </h4>
          <button className="text-[10px] tracking-widest text-zinc-500 hover:text-white transition-colors underline uppercase">
            Size Guide
          </button>
        </div>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-12 h-12 border text-xs font-bold tracking-wider transition-all duration-200 ${
                selectedSize === size
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/10 hover:border-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart Container */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between border border-white/10 w-full sm:w-32 h-14 bg-zinc-950/40">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-full text-zinc-400 hover:text-white transition-colors text-lg"
          >
            −
          </button>
          <span className="text-sm font-bold font-mono">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stock, qty + 1))}
            className="w-10 h-full text-zinc-400 hover:text-white transition-colors text-lg"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`flex-1 h-14 text-xs font-black tracking-widest uppercase transition-all duration-300 ${
            adding
              ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed"
              : "bg-white text-black border border-white hover:bg-zinc-200"
          }`}
        >
          {adding ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              ADDING TO BAG...
            </span>
          ) : (
            "ADD TO BAG"
          )}
        </button>
      </div>
    </div>
  );
}
