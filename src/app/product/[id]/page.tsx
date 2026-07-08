import Image from "next/image";
import Link from "next/link";
import { getDbProductById } from "@/lib/products";
import ProductActions from "@/components/ProductActions";

const fmt = (n: number) => `LKR ${Number(n).toLocaleString("en-LK")}.00`;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  let product = null;
  let fetchError = null;

  try {
    product = await getDbProductById(id);
  } catch (err: any) {
    fetchError = err?.message || "Could not query database.";
  }

  // Not Found State
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center text-white min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-black tracking-widest uppercase mb-4">PRODUCT NOT FOUND</h2>
        <p className="text-zinc-500 text-sm max-w-md mb-8">
          The product you are looking for does not exist in our system or might have been removed.
        </p>
        {fetchError && (
          <div className="bg-red-950/20 border border-red-900/40 p-4 mb-6 rounded text-xs font-mono text-red-400 text-left max-w-md">
            Diagnostic details: {fetchError}
          </div>
        )}
        <Link
          href="/"
          className="bg-white text-black px-8 py-4 text-xs font-bold tracking-widest hover:bg-zinc-200 transition-colors uppercase"
        >
          BACK TO HOMEPAGE
        </Link>
      </div>
    );
  }

  const imageSrc = product.image_url || "/hero.jpg";

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs tracking-wider font-bold text-zinc-500 uppercase">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-400">{product.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Product Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950 border border-white/5">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={true}
            />
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                <span className="text-sm font-black tracking-widest px-6 py-3 bg-red-950 border border-red-800 text-white uppercase">
                  OUT OF STOCK
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col justify-start">
            
            {/* Header info */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase block mb-1">
                {product.category} Collection
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-white uppercase">
                {product.name}
              </h1>
              <p className="text-xl font-mono text-white mt-3 font-semibold">
                {fmt(product.price)}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                Product Details
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                {product.description || "Premium Draven garment. Designed with high-durability fabrics and tailoring for clean styling, streetwear aesthetics, and lasting fit."}
              </p>
            </div>

            {/* Interactive Client selectors & Add to Cart button */}
            <ProductActions product={product} />

            {/* Shipping / Returns Accordion details */}
            <div className="mt-12 border-t border-white/10 pt-8 space-y-6">
              <div className="space-y-2">
                <h5 className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  ISLAND-WIDE SHIPPING
                </h5>
                <p className="text-zinc-500 text-xs pl-6 leading-relaxed">
                  Delivered in 2-4 business days across Sri Lanka. Free delivery on orders over LKR 10,000.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  EASY EXCHANGES
                </h5>
                <p className="text-zinc-500 text-xs pl-6 leading-relaxed">
                  7-day exchanges on sizes. Garments must be unworn and in original packaging. Contact support to schedule.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
