"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllProducts, addProduct, deleteProduct } from "@/lib/products";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";

const SIZES = ["S", "M", "L", "XL", "XXL"];
const COLORS = ["Black", "White", "Red", "Charcoal", "Olive"];
const FITS = ["Oversized", "Slim Fit", "Box Fit", "Relaxed", "Classic"];

const blank = () => ({
  name: "",
  gender: "men" as const,
  fit: "Oversized" as const,
  price: 0,
  originalPrice: 0,
  description: "",
  images: [] as string[],
  sizes: [] as string[],
  colors: [] as string[],
  isNew: true,
  isBestSeller: false,
  stock: 10,
});

export default function AdminPage() {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(blank());
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!loading && !profile?.isAdmin) {
      router.replace("/");
    }
  }, [loading, profile]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const toggle = (arr: string[], val: string) =>
    arr.includes(val)
      ? arr.filter((x) => x !== val)
      : [...arr, val];

  const set = (k: string, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (
      !form.name ||
      !form.price ||
      form.sizes.length === 0 ||
      form.colors.length === 0
    ) {
      setMsg("Please fill in name, price, at least one size and color.");
      return;
    }
    if (!imageUrl) {
      setMsg("Please add at least one image URL.");
      return;
    }
    setSaving(true);
    try {
      const id = await addProduct({
        ...form,
        images: [imageUrl],
        originalPrice: form.originalPrice || null,
      });
      setProducts((prev) => [
        ...prev,
        { ...form, id, images: [imageUrl] },
      ]);
      setForm(blank());
      setImageUrl("");
      setMsg("Product added successfully!");
    } catch {
      setMsg("Error saving product.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!profile?.isAdmin) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl font-bold text-white mb-8 tracking-wide">
        Admin — Products
      </h1>

      {/* Add Product Form */}
      <div className="bg-zinc-950 border border-white/10 p-6 mb-12 space-y-4">
        <h2 className="text-white font-bold tracking-widest text-sm mb-2">
          ADD NEW PRODUCT
        </h2>

        {msg && (
          <p className={`text-sm ${msg.includes("Error") || msg.includes("Please") ? "text-red-400" : "text-green-400"}`}>
            {msg}
          </p>
        )}

        {/* Name */}
        <input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
        />

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price (LKR)"
            value={form.price || ""}
            onChange={(e) => set("price", Number(e.target.value))}
            className="bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
          />
          <input
            type="number"
            placeholder="Original price (optional)"
            value={form.originalPrice || ""}
            onChange={(e) =>
              set("originalPrice", Number(e.target.value))
            }
            className="bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white resize-none"
        />

        {/* Image URL from Cloudinary */}
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-2">
            IMAGE URL (paste from Cloudinary)
          </p>
          <input
            placeholder="https://res.cloudinary.com/..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="preview"
              className="mt-2 w-24 h-28 object-cover bg-zinc-900"
            />
          )}
        </div>

        {/* Gender */}
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-2">
            GENDER
          </p>
          <div className="flex gap-2">
            {["men", "women"].map((g) => (
              <button
                key={g}
                onClick={() => set("gender", g)}
                className={`px-4 py-2 text-xs border ${
                  form.gender === g
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white"
                }`}
              >
                {g.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Fit */}
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-2">
            FIT
          </p>
          <select
            value={form.fit}
            onChange={(e) => set("fit", e.target.value)}
            className="bg-black border border-white/20 text-white text-xs px-3 py-2 focus:outline-none"
          >
            {FITS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Sizes */}
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-2">
            SIZES
          </p>
          <div className="flex gap-2 flex-wrap">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => set("sizes", toggle(form.sizes, s))}
                className={`w-12 h-10 text-xs border ${
                  form.sizes.includes(s)
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-2">
            COLORS
          </p>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() =>
                  set("colors", toggle(form.colors, c))
                }
                className={`px-3 py-1.5 text-xs border ${
                  form.colors.includes(c)
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
            <input
              type="checkbox"
              checked={form.isNew}
              onChange={(e) => set("isNew", e.target.checked)}
            />
            New Arrival
          </label>
          <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
            <input
              type="checkbox"
              checked={form.isBestSeller}
              onChange={(e) =>
                set("isBestSeller", e.target.checked)
              }
            />
            Best Seller
          </label>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-white text-black font-bold text-xs tracking-widest px-8 py-4 hover:bg-zinc-200 disabled:opacity-50"
        >
          {saving ? "SAVING..." : "ADD PRODUCT"}
        </button>
      </div>

      {/* Product list */}
      <h2 className="text-white font-bold tracking-widest text-sm mb-4">
        ALL PRODUCTS ({products.length})
      </h2>
      <div className="space-y-3">
        {products.length === 0 ? (
          <p className="text-zinc-500 text-sm">
            No products yet. Add your first one above!
          </p>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 bg-zinc-950 border border-white/10 p-4"
            >
              {p.images[0] && (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-12 h-14 object-cover bg-zinc-900 flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {p.name}
                </p>
                <p className="text-zinc-500 text-xs">
                  {p.gender} · {p.fit} · LKR{" "}
                  {p.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-500 hover:text-red-400 text-xs underline flex-shrink-0"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}