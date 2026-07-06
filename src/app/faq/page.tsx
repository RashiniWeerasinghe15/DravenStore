"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What sizes do you offer?",
    a: "We currently offer S, M, L, XL, and XXL across all T-shirts. Check our Size Guide page for detailed measurements before ordering.",
  },
  {
    q: "How long does delivery take?",
    a: "Island-wide delivery typically takes 2-4 business days. Colombo city orders are often delivered within 1-2 business days.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes — orders over LKR 10,000 qualify for free island-wide delivery. Orders below that are charged a flat LKR 450 shipping fee.",
  },
  {
    q: "Can I exchange a size after delivery?",
    a: "Yes, we offer a 7-day exchange window from the date of delivery, as long as the item is unworn, unwashed, and has its original tags attached.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Currently we accept Cash on Delivery for all orders. Online payment options are coming soon.",
  },
  {
    q: "How do I care for my DRAVEN T-shirt?",
    a: "Machine wash cold, inside out, with similar colors. Avoid bleach. Tumble dry low or hang dry to best preserve the print and fit.",
  },
  {
    q: "Do you ship outside Sri Lanka?",
    a: "At this time we only deliver within Sri Lanka. International shipping is something we are looking into for the future.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white tracking-wide mb-2 text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-zinc-500 text-sm text-center mb-10">
        Everything you need to know about DRAVEN
      </p>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="border border-white/10"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-white text-sm font-medium">
                {f.q}
              </span>
              <span
                className={`text-zinc-400 text-xl transition-transform duration-200 ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}