export default function ShippingPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white tracking-wide mb-2 text-center">
        Shipping Policy
      </h1>
      <p className="text-zinc-500 text-sm text-center mb-10">
        Everything you need to know about delivery
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            DELIVERY AREAS
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We currently deliver island-wide across Sri Lanka via
            trusted courier partners. Every order is tracked from
            our hands to yours.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            DELIVERY TIMES
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Colombo and suburbs: 1-2 business days. All other areas:
            2-4 business days. Orders placed after 3 PM are processed
            the next business day. We do not deliver on Sundays or
            public holidays.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            SHIPPING COSTS
          </h3>
          <div className="border border-white/10 overflow-hidden">
            <div className="flex justify-between px-4 py-3 bg-zinc-950 border-b border-white/10">
              <span className="text-white text-sm font-medium">
                Orders under LKR 10,000
              </span>
              <span className="text-zinc-400 text-sm">
                LKR 450
              </span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-white text-sm font-medium">
                Orders over LKR 10,000
              </span>
              <span className="text-green-400 text-sm font-medium">
                FREE
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            ORDER TRACKING
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Once your order ships, you will receive a tracking number
            via SMS or WhatsApp so you can follow your delivery in
            real time.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            DELAYS
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            During high-demand periods such as new drops and holidays,
            delivery may take slightly longer than usual. We will
            always keep you updated if there is any delay with
            your order.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-3">
            QUESTIONS?
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            If you have any questions about your delivery, reach out
            to us at{" "}
            <span className="text-white">hello@draven.lk</span> or
            DM us on Instagram{" "}
            <span className="text-white">@draven.lk</span>
          </p>
        </div>
      </div>
    </div>
  );
}