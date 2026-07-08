"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = (href: string) =>
    `text-xs font-bold tracking-widest uppercase transition-colors ${
      pathname === href ? "text-white" : "text-zinc-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Left side: Hamburger (mobile) & Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            className="md:hidden text-white hover:text-zinc-300 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-black tracking-[0.25em] text-white">DRAVEN</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/men" className={linkClass("/men")}>Men</Link>
            <Link href="/women" className={linkClass("/women")}>Women</Link>
            <Link href="/about" className={linkClass("/about")}>About</Link>
          </nav>
        </div>

        {/* Right side: Placeholders for Search, Account, Wishlist, Cart */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Account */}
          <button className="text-zinc-400 hover:text-white transition-colors" aria-label="Account">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </button>

          {/* Wishlist */}
          <button className="text-zinc-400 hover:text-white transition-colors" aria-label="Wishlist">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </button>

          {/* Cart */}
          <button className="relative text-zinc-400 hover:text-white transition-colors" aria-label="Cart">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-4 bg-black/95 backdrop-blur-md">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="/men"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
          >
            Men
          </Link>
          <Link
            href="/women"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
          >
            Women
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}