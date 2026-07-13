"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const fmt = (n: number) => `LKR ${Number(n).toLocaleString("en-LK")}.00`;

export default function ThankYouPage() {
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("draven_last_order");
    if (lastOrder) {
      try {
        setOrder(JSON.parse(lastOrder));
      } catch (err) {
        console.error("Error reading last order details:", err);
      }
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-[85vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full border border-white/10 bg-zinc-950 p-8 md:p-14 text-center relative overflow-hidden">
        
        {/* Animated green gradient header bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-950/30 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17l-5-5" />
          </svg>
        </div>

        <span className="text-[10px] tracking-[0.3em] text-emerald-400 font-extrabold uppercase block mb-2">
          TRANSACTION SECURED & PLACED
        </span>
        
        <h1 className="text-3xl md:text-4xl font-black tracking-widest uppercase mb-4 text-white">
          THANK YOU FOR YOUR ORDER
        </h1>
        
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-10 leading-relaxed uppercase tracking-wider">
          Your request is in our system. A verification call will be placed shortly to confirm your delivery address.
        </p>

        {/* Order Details box */}
        {order ? (
          <div className="bg-black/50 border border-white/5 p-6 md:p-8 text-left text-xs text-zinc-400 space-y-4 mb-10 max-w-lg mx-auto">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white uppercase tracking-wider">ORDER NUMBER</span>
              <span className="font-mono text-zinc-200 font-semibold">{order.id}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white uppercase tracking-wider">SHIPPING TIME</span>
              <span className="text-zinc-200 uppercase">2-4 BUSINESS DAYS</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="font-bold text-white uppercase tracking-wider">METHOD</span>
              <span className="text-zinc-200">CASH ON DELIVERY (COD)</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-bold text-white uppercase tracking-wider">ESTIMATED TOTAL</span>
              <span className="font-mono text-emerald-400 font-black text-sm">{fmt(order.total)}</span>
            </div>
          </div>
        ) : (
          <div className="bg-black/50 border border-white/5 p-6 text-center text-xs text-zinc-500 mb-10 max-w-lg mx-auto uppercase tracking-widest">
            Fetching active transaction logs...
          </div>
        )}

        {/* Return Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto bg-white text-black px-12 py-4 text-xs font-black tracking-widest hover:bg-zinc-200 transition-all duration-300 uppercase text-center"
          >
            CONTINUE SHOPPING
          </Link>
          <Link
            href="/profile"
            className="w-full sm:w-auto border border-white/20 text-white px-12 py-4 text-xs font-black tracking-widest hover:bg-white hover:text-black transition-all duration-300 uppercase text-center"
          >
            VIEW ORDER HISTORY
          </Link>
        </div>

      </div>
    </div>
  );
}
