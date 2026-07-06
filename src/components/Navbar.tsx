"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();
  const { user, profile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const link = (href: string) =>
    `text-xs font-bold tracking-widest uppercase transition-colors ${
      pathname === href
        ? "text-white"
        : "text-zinc-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Left side */}
        <div className="flex items-center gap-8">
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

         {/* Logo */}
<Link href="/" className="flex items-center">
  <img
    src="/logo-white.png"
    alt="DRAVEN"
    className="h-10 w-auto"
  />
</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/men" className={link("/men")}>Men</Link>
            <Link href="/women" className={link("/women")}>Women</Link>
            <Link href="/about" className={link("/about")}>About</Link>
            <Link href="/contact" className={link("/contact")}>Contact</Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 md:gap-5">

          {/* User menu */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-white hover:text-zinc-300"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-8 w-48 bg-zinc-950 border border-white/10 py-2 z-50">
                {user ? (
                  <>
                    <p className="px-4 py-2 text-xs text-zinc-500 truncate">
                      {profile?.name || user.email}
                    </p>
                    <Link href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/5">
                      My Profile
                    </Link>
                    <Link href="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/5">
                      Order History
                    </Link>
                    {profile?.isAdmin && (
                      <Link href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-red-400 hover:bg-white/5">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-zinc-400 hover:bg-white/5">
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/5">
                      Log In
                    </Link>
                    <Link href="/register"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/5">
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative text-white hover:text-zinc-300">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </Link>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white hover:text-zinc-300"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-700 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-4 bg-black">
          {[
            { href: "/men", label: "Men" },
            { href: "/women", label: "Women" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: user ? "/profile" : "/login", label: user ? "My Account" : "Log In" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}