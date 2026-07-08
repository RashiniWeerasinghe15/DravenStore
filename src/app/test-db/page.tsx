"use client";

import { useEffect, useState } from "react";
import { getDbProducts } from "@/lib/products";
import { DbProduct } from "@/lib/types";

export default function TestDbPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        setLoading(true);
        setError(null);
        const data = await getDbProducts();
        setProducts(data);
      } catch (err: any) {
        console.error("Test database fetch error:", err);
        setError(err?.message || "An unknown error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    }
    testConnection();
  }, []);

  const sqlCode = `-- 1. Create products table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric(10, 2) not null,
  description text,
  image_url text,
  category text not null,
  stock integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- 3. Create public read policy (Allow anonymous selects)
create policy "Allow public read access"
on public.products for select
to anon
using (true);

-- 4. Seed table with sample products
insert into public.products (name, price, description, image_url, category, stock)
values 
  ('Draven Signature Heavyweight Tee', 3800.00, '240GSM luxury tight-knit cotton tee.', '/cat-men.jpg', 'Men', 25),
  ('Onyx Premium Box Tee', 3500.00, 'Classic boxy silhouette streetwear tee.', '/hero.jpg', 'Men', 40),
  ('Phantom Relaxed Tee', 3200.00, 'Premium relaxed fit luxury tee.', '/cat-women.jpg', 'Women', 15);`;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-white min-h-[70vh]">
      <div className="border border-white/10 bg-zinc-950 p-6 md:p-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider uppercase text-white">
              Supabase Connection Test
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Verifying products database connection and schema.
            </p>
          </div>
          <div>
            {loading && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-bold bg-zinc-800 text-zinc-300 animate-pulse border border-zinc-700">
                CHECKING CONNECTION...
              </span>
            )}
            {!loading && error && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-bold bg-red-950 text-red-400 border border-red-800">
                FAILED TO CONNECT
              </span>
            )}
            {!loading && !error && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                CONNECTED SUCCESSFULLY
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-zinc-500 text-sm tracking-widest">FETCHING PRODUCTS FROM SUPABASE...</p>
          </div>
        )}

        {/* Error State & Troubleshooting */}
        {!loading && error && (
          <div className="mt-8 space-y-8">
            <div className="bg-red-950/20 border border-red-900/50 p-5">
              <h3 className="text-red-400 font-bold text-sm tracking-wider uppercase mb-2">
                Connection Error Details
              </h3>
              <p className="text-zinc-300 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                {error}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold text-base tracking-wide">
                Troubleshooting Checklist:
              </h3>
              <ul className="list-decimal pl-5 space-y-2 text-zinc-400 text-sm">
                <li>
                  <strong className="text-zinc-200">Verify environment variables:</strong> Check that <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-white">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-white">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> are correctly defined in your local environment file (<code className="text-zinc-300">.env.local</code>).
                </li>
                <li>
                  <strong className="text-zinc-200">Check Supabase Table:</strong> Verify you have created a table named <code className="text-zinc-300 font-bold">products</code> in your Supabase database schema.
                </li>
                <li>
                  <strong className="text-zinc-200">Verify RLS Policies:</strong> Ensure Row Level Security (RLS) policy is created to allow public anonymous read access (<code className="text-zinc-300">SELECT</code>).
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-2">
                  SQL Setup Commands
                </h4>
                <p className="text-zinc-400 text-xs mb-3">
                  Copy and execute this script inside the Supabase SQL Editor to configure your table and insert sample products:
                </p>
                <pre className="bg-zinc-900/60 border border-white/5 p-4 rounded text-xs text-zinc-300 font-mono overflow-x-auto max-h-80 select-all">
                  {sqlCode}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <div className="mt-8">
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6 pb-2 border-b border-white/5">
              Fetched Products ({products.length})
            </h3>
            
            {products.length === 0 ? (
              <div className="text-center py-10 bg-zinc-900/20 border border-white/5 p-6">
                <p className="text-zinc-500 text-sm mb-4">
                  The products table connected successfully but it contains no rows.
                </p>
                <div className="max-w-2xl mx-auto text-left">
                  <p className="text-zinc-400 text-xs mb-2 uppercase font-bold">Seed script:</p>
                  <pre className="bg-zinc-900/60 p-4 text-xs font-mono text-zinc-300 overflow-x-auto select-all max-h-48 border border-white/5">
                    {`insert into public.products (name, price, description, image_url, category, stock)
values 
  ('Draven Signature Heavyweight Tee', 3800.00, '240GSM luxury tight-knit cotton tee.', '/cat-men.jpg', 'Men', 25),
  ('Onyx Premium Box Tee', 3500.00, 'Classic boxy silhouette streetwear tee.', '/hero.jpg', 'Men', 40),
  ('Phantom Relaxed Tee', 3200.00, 'Premium relaxed fit luxury tee.', '/cat-women.jpg', 'Women', 15);`}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-white/10 bg-zinc-900/40 p-5 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] bg-white text-black px-2 py-0.5 font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          Stock: {product.stock}
                        </span>
                      </div>
                      <h4 className="text-white font-extrabold text-base tracking-wide">
                        {product.name}
                      </h4>
                      <p className="text-zinc-400 text-xs mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-white text-sm font-bold">
                        LKR {Number(product.price).toLocaleString("en-LK")}.00
                      </span>
                      {product.image_url && (
                        <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[120px]">
                          img: {product.image_url.split("/").pop()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
