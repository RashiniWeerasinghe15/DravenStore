import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Hero Banner Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-zinc-950 flex flex-col justify-end p-8 md:p-20 border-b border-white/10 overflow-hidden">
        {/* Background Image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpg"
            alt="Draven Collection Story Banner"
            className="w-full h-full object-cover opacity-20 object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="text-zinc-500 text-xs font-bold tracking-[0.25em] uppercase">THE PHILOSOPHY</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-widest mt-2 uppercase text-white">
            THE DRAVEN STORY
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-xl leading-relaxed">
            We don’t follow cycles. We create staples. Heavyweight fabrics, meticulous tailoring, and local craftsmanship designed to command attention.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-[10px] tracking-[0.2em] text-zinc-600 font-bold uppercase block">01 / CONCEPT</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase">
            ENGINEERED TO BE UNCOMPROMISING
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            DRAVEN was born out of a desire for simplicity done right. Frustrated by lightweight shirts that lost their shape in a single wash, we set out to construct the ultimate heavy knit basic.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Our signature 240GSM cotton fabric is tight-knit, pre-shrunk, and heavy enough to hold a clean boxy drape. It's a silhouette designed to stand out without needing loud graphics.
          </p>
        </div>
        
        {/* Callout box */}
        <div className="border border-white/10 bg-zinc-950 p-8 md:p-12 space-y-4">
          <span className="text-xs font-black tracking-widest text-white uppercase block">
            THE GARMENT SPECIFICATIONS
          </span>
          <ul className="space-y-3 text-xs text-zinc-400 font-mono">
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>WEIGHT</span>
              <span className="text-white">240 GSM</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>THREAD TYPE</span>
              <span className="text-white">100% COMBED LUXURY COTTON</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>COLLAR SPEC</span>
              <span className="text-white">THICK TIGHT-RIB KNIT</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-2">
              <span>FIT STYLE</span>
              <span className="text-white">STREETWEAR BOXY DRAUGHT</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Split Narrative Section 2 */}
      <section className="bg-zinc-950 border-t border-b border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-3">
            <span className="text-zinc-600 text-xs font-bold tracking-[0.2em]">02 / MANUFACTURING</span>
            <h3 className="text-white font-extrabold text-lg tracking-wider">
              LOCAL INDUSTRY EXCELLENCE
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Every DRAVEN garment is tailored in Sri Lanka. We partner with ethical workshops that guarantee clean work environments and pay fair wages, supporting regional craftsmanship.
            </p>
          </div>
          <div className="space-y-3">
            <span className="text-zinc-600 text-xs font-bold tracking-[0.2em]">03 / SUSTAINABILITY</span>
            <h3 className="text-white font-extrabold text-lg tracking-wider">
              BIODEGRADABLE PACKAGING
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We care about the impact we leave. Your orders arrive wrapped inside fully custom, 100% biodegradable custom card mailing boxes without any single-use plastic wrappers.
            </p>
          </div>
          <div className="space-y-3">
            <span className="text-zinc-600 text-xs font-bold tracking-[0.2em]">04 / SHIELD</span>
            <h3 className="text-white font-extrabold text-lg tracking-wider">
              ESTABLISHED IN SRI LANKA
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              DRAVEN represents a global streetwear quality baseline built locally. We exist to set new standards in durability, wearability, and minimalist luxury.
            </p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="max-w-4xl mx-auto px-4 text-center py-24 space-y-6">
        <h2 className="text-3xl font-black tracking-widest uppercase">
          CHOOSE YOUR SILHOUETTE
        </h2>
        <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed uppercase tracking-wider">
          Explore our collections and experience the heavy drape difference.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/men"
            className="bg-white text-black px-10 py-4 text-xs font-black tracking-widest hover:bg-zinc-200 transition-all uppercase"
          >
            SHOP MEN
          </Link>
          <Link
            href="/women"
            className="border border-white/20 text-white px-10 py-4 text-xs font-black tracking-widest hover:bg-white hover:text-black hover:border-white transition-all uppercase"
          >
            SHOP WOMEN
          </Link>
        </div>
      </section>
    </div>
  );
}
