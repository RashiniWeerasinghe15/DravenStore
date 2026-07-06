"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Contact Us
      </h1>
      <p className="text-zinc-500 text-sm text-center mb-10">
        Questions about an order or just want to talk? We are here.
      </p>

      {sent ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="3"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <p className="text-white font-medium">Message sent!</p>
          <p className="text-zinc-500 text-sm mt-1">
            We will get back to you shortly.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
          />
          <input
            placeholder="Your email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white"
          />
          <textarea
            placeholder="Your message"
            rows={5}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="w-full bg-black border border-white/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-white resize-none"
          />
          <button
            onClick={() => {
              if (!form.name || !form.email || !form.message)
                return;
              setSent(true);
            }}
            className="w-full bg-white text-black font-bold text-xs tracking-widest py-4 hover:bg-zinc-200 transition-colors"
          >
            SEND MESSAGE
          </button>
        </div>
      )}

      {/* Contact info */}
      <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 gap-4 text-center">
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-1">
            EMAIL
          </p>
          <p className="text-white text-sm">hello@draven.lk</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-1">
            INSTAGRAM
          </p>
          <p className="text-white text-sm">@draven.lk</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 mb-1">
            BASED IN
          </p>
          <p className="text-white text-sm">Sri Lanka</p>
        </div>
      </div>
    </div>
  );
}