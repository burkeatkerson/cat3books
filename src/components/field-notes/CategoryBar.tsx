"use client";

import { cn } from "@/lib/cn";

export const CATEGORIES = [
  { key: "all",         label: "All Topics" },
  { key: "frameworks",  label: "Decision Frameworks" },
  { key: "benchmarks",  label: "Industry Benchmarks" },
  { key: "jobcosting",  label: "Job Costing" },
  { key: "pl",          label: "P&L Management" },
  { key: "hiring",      label: "Hiring & Outsourcing" },
  { key: "software",    label: "Software Reviews" },
  { key: "qb",          label: "QuickBooks Guides" },
  { key: "profit",      label: "Profitability" },
  { key: "supplements", label: "Supplements & TPAs" },
  { key: "cashflow",    label: "Cash Flow" },
  { key: "guides",      label: "Definitive Guides" },
  { key: "research",    label: "Industry Research" },
  { key: "reference",   label: "Reference" },
];

interface Props {
  active: string;
  search: string;
  onCategory: (cat: string) => void;
  onSearch: (q: string) => void;
}

export default function CategoryBar({ active, search, onCategory, onSearch }: Props) {
  return (
    <div className="sticky top-[60px] z-40 bg-[rgba(9,9,8,0.88)] backdrop-blur-[10px] border-b border-c3-border">
      <div className="flex items-center gap-5 px-5 sm:px-8 lg:px-[52px] xl:px-20 py-[18px] overflow-x-auto scrollbar-hide max-w-[1660px] mx-auto">
        <span className="font-mono text-[10px] tracking-[0.22em] text-c3-dim uppercase whitespace-nowrap shrink-0">
          Filter
        </span>

        <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onCategory(key)}
              className={cn(
                "inline-flex items-center whitespace-nowrap shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase px-[10px] py-[6px] border transition-all duration-200 cursor-pointer",
                active === key
                  ? "border-c3-yellow text-[#111] bg-c3-yellow"
                  : "border-c3-b2 text-c3-mid hover:border-c3-yellow hover:text-c3-yellow bg-transparent"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="hidden lg:flex shrink-0 items-center gap-[10px] px-[14px] py-[8px] border border-c3-b2 bg-[rgba(255,255,255,0.02)]">
          <span className="font-mono text-[12px] text-c3-dim">⌕</span>
          <input
            type="search"
            placeholder="Search the library"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="bg-transparent border-0 outline-none text-c3-text font-mono text-[11px] tracking-[0.08em] w-[180px] placeholder:text-c3-dim placeholder:tracking-[0.14em] placeholder:text-[11px] placeholder:uppercase"
          />
        </label>
      </div>
    </div>
  );
}
