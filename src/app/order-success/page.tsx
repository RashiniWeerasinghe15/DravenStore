"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">

      {/* Check icon */}
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="3"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-white">
        Order Placed!
      </h1>

      <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
        Thank you for shopping with DRAVEN. Your order has been
        received and will be processed shortly.
      </p>

      {id && (
        <p className="text-zinc-500 text-xs mt-2">
          Order ID: {id}
        </p>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-white text-black px-8 py-3 text-xs font-bold tracking-widest hover:bg-zinc-200 transition-colors"
        >
          CONTINUE SHOPPING
        </Link>
        <Link
          href="/orders"
          className="border border-white text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-colors"
        >
          VIEW ORDERS
        </Link>
      </div>
    </div>
  );
}