const items = [
  "Job Costing",
  "Supplement Recovery",
  "TPA Channel Billing",
  "QuickBooks ProAdvisor",
  "ERP Integration",
  "Expense Management",
  "Restoration Exclusive",
  "0.85% of Revenue",
  "No Annual Contract",
];

export default function Ticker() {
  return (
    <div
      className="bg-c3-yellow text-[#111] border-t-2 border-b-2 border-black py-[13px] overflow-hidden relative z-10"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap font-disp text-[15px] tracking-[0.12em] animate-ticker">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center after:content-['✦'] after:mx-6 after:opacity-60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
