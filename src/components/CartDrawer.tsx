"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const fmt = (n: number) => `LKR ${n.toLocaleString("en-LK")}.00`;

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQty,
    removeItem,
    subtotal,
  } = useCart();

  const shipping = subtotal > 10000 ? 0 : 450;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[80] transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-zinc-950 border-l border-white/10 z-[90] transition-transform duration-300 flex flex-col ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-white font-bold tracking-widest text-sm">
            YOUR CART ({cart.length})
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-sm">Your cart is empty.</p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 text-xs tracking-widest text-white border-b border-white pb-1"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 object-cover bg-zinc-900 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">
                    {item.name}
                  </p>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    {item.color} / {item.size}
                  </p>
                  <p className="text-white text-sm mt-1">
                    {fmt(item.price)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-white/20">
                      <button
                        onClick={() => updateQty(i, item.qty - 1)}
                        className="w-7 h-7 text-white"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-white text-xs">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(i, item.qty + 1)}
                        className="w-7 h-7 text-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(i)}
                      className="text-zinc-500 hover:text-red-500 text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : fmt(shipping)}</span>
              </div>
              <div className="flex justify-between text-white font-bold border-t border-white/10 pt-2">
                <span>Total</span>
                <span>{fmt(subtotal + shipping)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="block w-full bg-white text-black font-bold text-xs tracking-widest py-4 text-center hover:bg-zinc-200 transition-colors"
            >
              CHECKOUT
            </Link>
          </div>
        )}
      </div>
    </>
  );
}