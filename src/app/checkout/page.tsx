"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const fmt = (n: number) => `LKR ${Number(n).toLocaleString("en-LK")}.00`;

export default function CheckoutPage() {
  const { cart, user, placeOrder } = useStore();
  const router = useRouter();

  // Form Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autofill if user is logged in
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      const nameParts = user.name.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
    }
  }, [user]);

  // If cart is empty, redirect to cart
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
      setError("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    try {
      const customer = {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
      };

      const res = await placeOrder(customer);
      if (res.success && res.order) {
        localStorage.setItem("draven_last_order", JSON.stringify(res.order));
        router.push("/thank-you");
      } else {
        setError(res.error || "Order placement failed. Please try again.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingCost = subtotal >= 10000 ? 0 : 350;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10 border-b border-white/5">
        <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-bold uppercase block mb-1">
          SECURE CHECKOUT
        </span>
        <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase">
          SHIPPING DETAILS
        </h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Checkout Form (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          
          {/* Section: Customer Information */}
          <div className="space-y-6">
            <h3 className="text-sm font-black tracking-widest uppercase border-b border-white/10 pb-2">
              01. CUSTOMER INFORMATION
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all font-mono"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  LAST NAME *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all font-mono"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  MOBILE NUMBER *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0771234567"
                  className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all font-mono"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Delivery Location */}
          <div className="space-y-6">
            <h3 className="text-sm font-black tracking-widest uppercase border-b border-white/10 pb-2">
              02. SHIPPING ADDRESS
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                STREET ADDRESS *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Apartment, suite, street address"
                className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all font-mono"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  CITY *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Colombo"
                  className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all font-mono"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  POSTAL CODE / ZIP *
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="10000"
                  className="w-full bg-zinc-950 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-all font-mono"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Payment Method */}
          <div className="space-y-6">
            <h3 className="text-sm font-black tracking-widest uppercase border-b border-white/10 pb-2">
              03. PAYMENT DETAILS
            </h3>
            
            <div className="border border-white/15 bg-zinc-950/60 p-5 flex items-start gap-4">
              <div className="w-5 h-5 border border-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white">
                <div className="w-2.5 h-2.5 rounded-full bg-black" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold tracking-wider text-white uppercase block">
                  CASH ON DELIVERY (COD)
                </label>
                <p className="text-zinc-500 text-[10px] leading-relaxed uppercase tracking-wide">
                  Pay with cash upon handoff. Available for all island-wide orders.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-950/20 border border-red-900/50 p-4 text-xs text-red-400 font-medium">
              <span className="font-bold mr-1">ERROR:</span> {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-white text-black font-black text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                VERIFYING TRANSACTION...
              </span>
            ) : (
              `PLACE COD ORDER — ${fmt(total)}`
            )}
          </button>

        </form>

        {/* Order Details Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-white/10 bg-zinc-950 p-6 md:p-8 space-y-6 sticky top-24">
            <h3 className="text-sm font-black tracking-widest uppercase border-b border-white/5 pb-3">
              YOUR ORDER
            </h3>

            {/* List of items */}
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center border-b border-white/5 pb-4 last:border-b-0 last:pb-0">
                  <div className="relative w-10 h-14 bg-zinc-900 border border-white/5 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white uppercase truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      SIZE: {item.size} | COLOR: {item.color} | QTY: {item.qty}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white font-mono">
                      {fmt(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL</span>
                <span className="font-mono text-white font-semibold">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>SHIPPING COST</span>
                {shippingCost === 0 ? (
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">FREE</span>
                ) : (
                  <span className="font-mono text-white font-semibold">{fmt(shippingCost)}</span>
                )}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex justify-between items-end">
              <span className="text-xs font-black tracking-widest text-zinc-400 uppercase">ESTIMATED TOTAL</span>
              <span className="text-lg font-bold font-mono text-white">{fmt(total)}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
