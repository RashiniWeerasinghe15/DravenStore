import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo and tagline */}
        <div className="col-span-2">
          <svg width="32" height="25" viewBox="0 0 200 156" fill="none">
            <path d="M10 30 H95 C108 30 116 36 122 46 L100 110 L78 46 C72 34 60 30 47 30 Z" fill="white" />
            <path d="M190 30 H105 C118 30 128 38 132 50 C137 64 148 70 160 70 L190 30 Z" fill="white" />
            <path d="M97 60 L100 130 L103 60 Z" fill="white" />
            <polygon points="100,118 96,128 104,128" fill="#dc2626" />
          </svg>
          <p className="text-zinc-500 text-sm mt-4 max-w-xs">
            Premium T-shirts for men and women. Define your legacy.
          </p>
        </div>

        {/* Shop links */}
        <div>
          <h4