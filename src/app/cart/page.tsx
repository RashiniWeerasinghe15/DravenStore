"use client";

import { useStore } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";

const fmt = (n: number) => `LKR ${Number(n).toLocaleString("en-LK")}.00`;

export default function CartPage() {
  const { cart, removeFromCart, updateCartQty } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingThreshold = 10000;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 350;
  const total = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center text-white min-h-[60vh] flex flex-col items-center justify-center">
        <span className="text-[10px] tracking-[0.25em] text-zinc-500 font-bold uppercase block mb-3">
          YOUR BAG
        </span>
        <h2 className="text-3xl font-black tracking-widest uppercase mb-4">
          YOUR BAG IS EMPTY
        </h2>
        <p className="text-zinc-500 text-sm max-w-md mb-8 leading-relaxed">
          You haven't added any products to your shopping bag yet. Explore our curated collections to find your fit.
        </p>
        <Link
          href="/men"
          className="bg-white text-black px-10 py-4 text-xs font-black tracking-widest hover:bg-zinc-200 transition-colors uppercase inline-block"
        >
          EXPLORE MEN
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10 border-b border-white/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-bold uppercase block mb-1">
            SHOPPING BAG
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase">
            YOUR ITEMS ({cart.reduce((sum, item) => sum + item.qty, 0)})
          </h1>
        </div>
        <Link
          href="/men"
          className="text-xs font-bold tracking-widest text-zinc-400 hover:text-white border-b border-zinc-800 hover:border-white pb-1 transition-all duration-300 uppercase"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Items List (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item, idx) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex flex-col sm:flex-row gap-6 p-6 border border-white/10 bg-zinc-950/40 hover:border-white/20 transition-all"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-[3/4] w-full sm:w-28 bg-zinc-900 flex-shrink-0 border border-white/5">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details and Actions */}
              <div className="flex-1 flex flex-col justify-between">
                
                {/* Product Name, size, color */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-sm font-black tracking-wider uppercase text-white hover:text-zinc-300">
                      <Link href={`/product/${item.productId}`}>{item.name}</Link>
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-zinc-400">
                      <p>
                        SIZE: <span className="text-white font-semibold">{item.size}</span>
                      </p>
                      <p>
                        COLOR: <span className="text-white font-semibold">{item.color}</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                    className="text-zinc-500 hover:text-white transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>

                {/* Pricing & Quantity selector row */}
                <div className="flex flex-wrap items-end justify-between gap-4 mt-6 pt-4 border-t border-white/5">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between border border-white/10 w-28 h-10 bg-black/40">
                    <button
                      onClick={() => updateCartQty(item.productId, item.size, item.color, item.qty - 1, 99)}
                      className="w-8 h-full text-zinc-400 hover:text-white transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="text-xs font-bold font-mono">{item.qty}</span>
                    <button
                      onClick={() => updateCartQty(item.productId, item.size, item.color, item.qty + 1, 99)}
                      className="w-8 h-full text-zinc-400 hover:text-white transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Price breakdown */}
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block uppercase tracking-wider mb-0.5">
                      {fmt(item.price)} each
                    </span>
                    <span className="text-sm font-bold font-mono text-white">
                      Total: {fmt(item.price * item.qty)}
                    </span>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Panel (1 col) */}
        <div className="space-y-6">
          <div className="border border-white/10 bg-zinc-950 p-6 md:p-8 space-y-6">
            <h3 className="text-sm font-black tracking-widest uppercase border-b border-white/5 pb-3">
              ORDER SUMMARY
            </h3>

            {/* Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL</span>
                <span className="font-mono text-white font-semibold">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>SHIPPING</span>
                {shippingCost === 0 ? (
                  <span className="text-emerald-400 tracking-wider font-bold uppercase">FREE</span>
                ) : (
                  <span className="font-mono text-white font-semibold">{fmt(shippingCost)}</span>
                )}
              </div>
              {shippingCost > 0 && (
                <div className="text-[10px] text-zinc-500 mt-1 uppercase italic leading-relaxed">
                  Spend LKR {Number(shippingThreshold - subtotal).toLocaleString("en-LK")}.00 more to qualify for Free Shipping.
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-white/5 pt-4 flex justify-between items-end">
              <span className="text-xs font-black tracking-widest text-zinc-400 uppercase">ESTIMATED TOTAL</span>
              <span className="text-lg font-bold font-mono text-white">{fmt(total)}</span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full h-14 bg-white text-black font-black text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center"
            >
              PROCEED TO CHECKOUT
            </Link>

            {/* Guarantees */}
            <div className="text-[10px] text-zinc-500 uppercase leading-relaxed tracking-wider space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                SECURE CHECKOUT GUARANTEE
              </div>
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                biodegradable custom packaging
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
