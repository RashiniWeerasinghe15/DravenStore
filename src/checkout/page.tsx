"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const fmt = (n: number) => `LKR ${n.toLocaleString("en-LK")}.00`;

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const shipping = subtotal > 10000 ? 0 : 450;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (Object.values(form).some((v) => !v.trim())) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const orderRef = await addDoc(collection(db, "orders"), {
        userId: user?.uid || "guest",
        items: cart,
        subtotal,
        shipping,
        total,
        customer: form,
        paymentMethod: "COD",
        status: "pending",
        createdAt: Date.now(),
      });
      clearCart();
      router.push(`/order-success?id=${orderRef.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="text-zinc-400">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <div className="grid md:grid-cols-3 gap-10">

        {/* Form */}
        <div className="md:col-span-2 space-y-5">
          <h1 className="text-2xl font-bold text-white mb-2">
            Checkout
          </h1>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              className="bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
            />
            <input
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              className="bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
            />
          </div>

          <input
            placeholder="Email address"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
          />
          <input
            placeholder="Phone number"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
          />
          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              className="bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
            />
            <input
              placeholder="Postal code"
              value={form.postalCode}
              onChange={(e) => set("postalCode", e.target.value)}
              className="bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
            />
          </div>

          {/* Payment */}
          <div className="border border-white/20 p-4 flex items-center gap-3">
            <input type="radio" checked readOnly />
            <span className="text-white text-sm">
              Cash on Delivery
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black font-bold text-xs tracking-widest py-4 hover:bg-zinc-200 disabled:opacity-50 transition-colors"
          >
            {loading ? "PLACING ORDER..." : "PLACE ORDER"}
          </button>
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-zinc-950 border border-white/10 p-5 sticky top-24">
            <h2 className="text-white font-bold text-sm tracking-widest mb-4">
              ORDER SUMMARY
            </h2>
            <div className="space-y-3 mb-4">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover bg-zinc-900 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-white text-xs">{item.name}</p>
                    <p className="text-zinc-500 text-xs">
                      {item.color}/{item.size} × {item.qty}
                    </p>
                  </div>
                  <p className="text-white text-xs">
                    {fmt(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : fmt(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-white font-bold border-t border-white/10 pt-2">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}