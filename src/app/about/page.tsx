export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <svg width="60" height="47" viewBox="0 0 200 156" fill="none">
          <path d="M10 30 H95 C108 30 116 36 122 46 L100 110 L78 46 C72 34 60 30 47 30 Z" fill="white" />
          <path d="M190 30 H105 C118 30 128 38 132 50 C137 64 148 70 160 70 L190 30 Z" fill="white" />
          <path d="M97 60 L100 130 L103 60 Z" fill="white" />
          <polygon points="100,118 96,128 104,128" fill="#dc2626" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-white tracking-wide mb-6">
        DEFINE YOUR LEGACY
      </h1>

      <p className="text-zinc-400 leading-relaxed mb-6">
        DRAVEN was built for those who refuse to blend in. We design
        premium T-shirts using 240GSM heavyweight cotton, engineered
        for comfort, durability, and a fit that holds up wear after wear.
      </p>

      <p className="text-zinc-400 leading-relaxed mb-6">
        This is just the beginning. Every drop is a step toward
        something bigger. We started with T-shirts because that is
        where every great wardrobe starts — a foundation built right.
      </p>

      <p className="text-zinc-400 leading-relaxed">
        Based in Sri Lanka. Built for the world.
      </p>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <div className="h-px w-16 bg-red-600"></div>
        <span className="text-white text-xs tracking-widest font-bold">
          DRAVEN
        </span>
        <div className="h-px w-16 bg-red-600"></div>
      </div>
    </div>
  );
}