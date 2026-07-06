export default function ReturnsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white tracking-wide mb-2 text-center">
        Returns & Exchanges
      </h1>
      <p className="text-zinc-500 text-sm text-center mb-10">
        We want you to love what you ordered
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            EXCHANGE WINDOW
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            You may request a size exchange within 7 days of delivery.
            Items must be unworn, unwashed, and have all original tags
            still attached.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            HOW TO REQUEST AN EXCHANGE
          </h3>
          <div className="space-y-3">
            {[
              "Contact us via the Contact page or Instagram DM with your order ID and the size you need.",
              "We will confirm your exchange request within 24 hours.",
              "We arrange pickup of the original item from your address.",
              "Once we receive and inspect the item, we dispatch your new size.",
            ].map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            REFUNDS
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            As we are a Cash on Delivery store, refunds are issued as
            store credit rather than a monetary refund, unless
            otherwise agreed. Store credit never expires and can be
            used on any future order.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            NON-EXCHANGEABLE ITEMS
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Items marked as Final Sale cannot be exchanged. Any item
            showing signs of wear, washing, or damage not caused by
            us is not eligible for exchange.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            DAMAGED OR WRONG ITEM?
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            If you received a damaged or incorrect item, contact us
            immediately at{" "}
            <span className="text-white">hello@draven.lk</span> with
            a photo and your order ID. We will make it right at no
            extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}