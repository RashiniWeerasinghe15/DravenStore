export default function SizeGuidePage() {
  const rows = [
    { size: "S", chest: "36-38", length: "27", shoulder: "17" },
    { size: "M", chest: "39-41", length: "28", shoulder: "18" },
    { size: "L", chest: "42-44", length: "29", shoulder: "19" },
    { size: "XL", chest: "45-47", length: "30", shoulder: "20" },
    { size: "XXL", chest: "48-50", length: "31", shoulder: "21" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-white tracking-wide mb-2 text-center">
        Size Guide
      </h1>
      <p className="text-zinc-500 text-sm text-center mb-10">
        All measurements in inches. Garment measured flat.
      </p>

      {/* Table */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border border-white/10">
          <thead>
            <tr className="bg-zinc-950 border-b border-white/10">
              <th className="text-left text-white font-bold tracking-widest text-xs px-4 py-3">
                SIZE
              </th>
              <th className="text-left text-white font-bold tracking-widest text-xs px-4 py-3">
                CHEST
              </th>
              <th className="text-left text-white font-bold tracking-widest text-xs px-4 py-3">
                LENGTH
              </th>
              <th className="text-left text-white font-bold tracking-widest text-xs px-4 py-3">
                SHOULDER
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.size}
                className={
                  i % 2 === 0 ? "bg-black" : "bg-zinc-950/50"
                }
              >
                <td className="px-4 py-3 text-white font-semibold">
                  {r.size}
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {r.chest}"
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {r.length}"
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {r.shoulder}"
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* How to measure */}
      <div className="space-y-6">
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-2">
            HOW TO MEASURE
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Lay a similar T-shirt flat on a table. Chest is measured
            straight across from armpit to armpit, then doubled.
            Length is measured from the highest point of the shoulder
            seam to the bottom hem. Shoulder is measured seam to seam
            across the back.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-2">
            FIT NOTES
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Oversized and Box Fit styles run roomier — if you prefer
            a closer fit in these styles, consider sizing down. Slim
            Fit and Classic styles run true to size.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm tracking-widest mb-2">
            STILL NOT SURE?
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Contact us and we will help you find the perfect size.
            We offer a 7-day exchange if the size is not right.
          </p>
        </div>
      </div>
    </div>
  );
}