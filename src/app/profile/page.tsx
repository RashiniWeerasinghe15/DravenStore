"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { getDbProducts } from "@/lib/products";
import { DbProduct, Order } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

const fmt = (n: number) => `LKR ${Number(n).toLocaleString("en-LK")}.00`;

export default function ProfilePage() {
  const { user, orders, wishlist, logout, loading } = useStore();
  const [allProducts, setAllProducts] = useState<DbProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const router = useRouter();

  // Redirect to Auth if not logged in after loading finishes
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  // Load products to display wishlist items properly
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getDbProducts();
        setAllProducts(data);
      } catch (err) {
        console.warn("Failed to fetch live products, using local fallback in profile:", err);
      } finally {
        setProductsLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs tracking-widest text-zinc-500 uppercase font-bold">
            LOADING ACCOUNT SESSION...
          </p>
        </div>
      </div>
    );
  }

  // Filter wishlist items
  const wishlistItems = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Account Header */}
      <section className="bg-zinc-950 border-b border-white/10 py-12">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-zinc-500 font-bold uppercase block mb-1">
              CUSTOMER SPACE
            </span>
            <h1 className="text-3xl font-black tracking-widest uppercase">
              WELCOME BACK, {user.name}
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Member email: <span className="text-zinc-400 font-mono">{user.email}</span>
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/auth");
            }}
            className="px-6 py-3 border border-white/20 hover:border-white text-xs font-black tracking-widest uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-300"
          >
            LOG OUT
          </button>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Side: Order History (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-lg font-black tracking-wider uppercase border-b border-white/10 pb-3 mb-6">
            ORDER HISTORY ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <div className="border border-white/5 bg-zinc-950/40 p-8 text-center rounded">
              <p className="text-zinc-500 text-sm mb-4">You have not placed any orders yet.</p>
              <Link
                href="/men"
                className="bg-white text-black text-[10px] font-black tracking-widest px-6 py-3 hover:bg-zinc-200 transition-colors uppercase inline-block"
              >
                START SHOPPING NOW
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-white/10 bg-zinc-950 p-6 flex flex-col gap-6"
                >
                  {/* Order Details Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-white/5 gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white uppercase tracking-wider block">
                        ORDER ID: <span className="text-zinc-400 font-mono">{order.id}</span>
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono block">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-white font-mono">
                        {fmt(order.total)}
                      </span>
                      <span
                        className={`text-[9px] font-black tracking-widest px-2.5 py-1 uppercase border ${
                          order.status === "pending"
                            ? "bg-amber-950/20 text-amber-400 border-amber-800/40"
                            : order.status === "delivered"
                            ? "bg-emerald-950/20 text-emerald-400 border-emerald-800/40"
                            : "bg-zinc-800 text-zinc-300 border-zinc-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="relative w-12 h-16 bg-zinc-900 border border-white/5 flex-shrink-0">
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
                          <span className="text-xs font-bold text-zinc-300 font-mono">
                            {fmt(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address Summary */}
                  <div className="mt-2 bg-black/40 border border-white/5 p-4 text-xs text-zinc-400 space-y-1">
                    <p className="font-bold text-white text-[10px] tracking-widest uppercase mb-1">
                      SHIPPING ADDRESS
                    </p>
                    <p className="font-semibold text-zinc-300">
                      {order.customer.firstName} {order.customer.lastName}
                    </p>
                    <p>{order.customer.address}, {order.customer.city}</p>
                    <p>Phone: <span className="font-mono text-zinc-300">{order.customer.phone}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Wishlist & Profile Summary */}
        <div className="space-y-8">
          
          {/* Profile Summary Card */}
          <div className="border border-white/10 bg-zinc-950 p-6 space-y-4">
            <h3 className="text-sm font-black tracking-widest uppercase border-b border-white/5 pb-2">
              ACCOUNT INFO
            </h3>
            <div className="space-y-3 text-xs text-zinc-400">
              <div>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase">FULL NAME</span>
                <span className="text-white font-semibold text-sm">{user.name}</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase">EMAIL</span>
                <span className="text-white font-mono">{user.email}</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase">CUSTOMER TIER</span>
                <span className="text-white font-bold tracking-widest">DRAVEN EXCLUSIVE</span>
              </div>
            </div>
          </div>

          {/* Wishlist Box */}
          <div className="border border-white/10 bg-zinc-950 p-6 space-y-4">
            <h3 className="text-sm font-black tracking-widest uppercase border-b border-white/5 pb-2">
              MY WISHLIST ({wishlistItems.length})
            </h3>
            {productsLoading ? (
              <div className="text-center py-4">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : wishlistItems.length === 0 ? (
              <p className="text-zinc-500 text-xs">No items saved to your wishlist yet.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {wishlistItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 transition-colors border border-white/5"
                  >
                    <div className="relative w-10 h-12 bg-zinc-900 flex-shrink-0">
                      <Image
                        src={item.image_url || "/hero.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate uppercase">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                        {fmt(item.price)}
                      </p>
                    </div>
                    <span className="text-zinc-600 hover:text-white text-xs px-2">→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
