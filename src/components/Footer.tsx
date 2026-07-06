import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Logo and tagline */}
          <div className="col-span-2">
            <img
  src="/logo-white.png"
  alt="DRAVEN"
  className="h-12 w-auto"
/>
            <p className="text-zinc-500 text-sm mt-4 max-w-xs">
              Premium T-shirts for men and women. Define your legacy.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest mb-4">
              SHOP
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/men" className="text-zinc-500 text-sm hover:text-white">
                Men
              </Link>
              <Link href="/women" className="text-zinc-500 text-sm hover:text-white">
                Women
              </Link>
              <Link href="/size-guide" className="text-zinc-500 text-sm hover:text-white">
                Size Guide
              </Link>
            </div>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest mb-4">
              SUPPORT
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-zinc-500 text-sm hover:text-white">
                About
              </Link>
              <Link href="/contact" className="text-zinc-500 text-sm hover:text-white">
                Contact
              </Link>
              <Link href="/faq" className="text-zinc-500 text-sm hover:text-white">
                FAQ
              </Link>
              <Link href="/shipping-policy" className="text-zinc-500 text-sm hover:text-white">
                Shipping Policy
              </Link>
              <Link href="/returns" className="text-zinc-500 text-sm hover:text-white">
                Returns & Exchanges
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 text-center text-zinc-600 text-xs">
        © {new Date().getFullYear()} DRAVEN. All rights reserved.
      </div>
    </footer>
  );
}