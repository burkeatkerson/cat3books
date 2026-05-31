"use client";

import { cn } from "@/lib/cn";
import { THEMES, CAT_LABEL, themeForKey } from "@/lib/field-notes-taxonomy";

interface Props {
  /** "all" | a theme key (t-*) | a category key */
  active: string;
  search: string;
  /** category key → number of posts */
  counts: Record<string, number>;
  total: number;
  /** number of posts currently shown (after filter + search) */
  resultCount: number;
  onSelect: (key: string) => void;
  onSearch: (q: string) => void;
}

export default function CategoryBar({
  active,
  search,
  counts,
  total,
  resultCount,
  onSelect,
  onSearch,
}: Props) {
  const activeTheme = themeForKey(active);
  const isFiltered = active !== "all" || search.trim() !== "";
  const themeCount = (t: (typeof THEMES)[number]) =>
    t.cats.reduce((n, c) => n + (counts[c] ?? 0), 0);

  return (
    <div className="sticky top-[60px] z-40 bg-[rgba(9,9,8,0.92)] backdrop-blur-[10px] border-b border-c3-border">
      <div className="max-w-[1660px] mx-auto px-5 sm:px-8 lg:px-[52px] xl:px-20 py-[14px]">
        {/* Row 1 — theme nav + search */}
        <div className="flex items-start justify-between gap-5">
          <nav
            aria-label="Filter by topic"
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="font-mono text-[9px] tracking-[0.24em] text-c3-dim uppercase mr-1 hidden sm:inline">
              Topics
            </span>

            <ThemeButton
              label="All"
              count={total}
              active={active === "all"}
              onClick={() => onSelect("all")}
            />
            {THEMES.map((t) => (
              <ThemeButton
                key={t.key}
                label={t.label}
                count={themeCount(t)}
                active={activeTheme?.key === t.key}
                onClick={() => onSelect(t.key)}
              />
            ))}
          </nav>

          <label className="hidden lg:flex shrink-0 items-center gap-[10px] px-[14px] py-[7px] border border-c3-b2 bg-[rgba(255,255,255,0.02)] focus-within:border-c3-yellow transition-colors duration-200">
            <span className="font-mono text-[12px] text-c3-dim">⌕</span>
            <input
              type="search"
              placeholder="Search the library"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="bg-transparent border-0 outline-none text-c3-text font-mono text-[11px] tracking-[0.08em] w-[160px] placeholder:text-c3-dim placeholder:tracking-[0.14em] placeholder:text-[11px] placeholder:uppercase"
            />
          </label>
        </div>

        {/* Mobile search */}
        <label className="flex lg:hidden mt-3 items-center gap-[10px] px-[14px] py-[8px] border border-c3-b2 bg-[rgba(255,255,255,0.02)] focus-within:border-c3-yellow transition-colors duration-200">
          <span className="font-mono text-[12px] text-c3-dim">⌕</span>
          <input
            type="search"
            placeholder="Search the library"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="bg-transparent border-0 outline-none text-c3-text font-mono text-[11px] tracking-[0.08em] flex-1 placeholder:text-c3-dim placeholder:tracking-[0.14em] placeholder:text-[11px] placeholder:uppercase"
          />
        </label>

        {/* Row 2 — sub-categories for the active theme */}
        {activeTheme && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-dashed border-c3-border">
            <span className="font-mono text-[9px] tracking-[0.22em] text-c3-yellow uppercase mr-1">
              ▸ {activeTheme.label}
            </span>
            <SubChip
              label="All"
              count={themeCount(activeTheme)}
              active={active === activeTheme.key}
              onClick={() => onSelect(activeTheme.key)}
            />
            {activeTheme.cats.map((c) => (
              <SubChip
                key={c}
                label={CAT_LABEL[c] ?? c}
                count={counts[c] ?? 0}
                active={active === c}
                onClick={() => onSelect(c)}
              />
            ))}
          </div>
        )}

        {/* Row 3 — result summary + clear */}
        {isFiltered && (
          <div className="flex items-center gap-3 mt-3 font-mono text-[10px] tracking-[0.16em] uppercase text-c3-dim">
            <span>
              {resultCount} {resultCount === 1 ? "result" : "results"} of {total}
            </span>
            <button
              onClick={() => {
                onSelect("all");
                onSearch("");
              }}
              className="inline-flex items-center gap-1 text-c3-mid hover:text-c3-yellow transition-colors duration-200 cursor-pointer"
            >
              ✕ Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ThemeButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group inline-flex items-baseline gap-[5px] font-mono text-[11px] tracking-[0.12em] uppercase pb-[3px] border-b-2 transition-colors duration-200 cursor-pointer whitespace-nowrap",
        active
          ? "text-c3-yellow border-c3-yellow"
          : "text-c3-mid border-transparent hover:text-c3-text"
      )}
    >
      {label}
      <span
        className={cn(
          "font-mono text-[9px] tracking-normal tabular-nums",
          active ? "text-c3-yellow/70" : "text-c3-dim group-hover:text-c3-mid"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function SubChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase px-[10px] py-[5px] border transition-all duration-200 cursor-pointer whitespace-nowrap",
        active
          ? "border-c3-yellow bg-c3-yellow text-[#111]"
          : "border-c3-b2 text-c3-mid hover:border-c3-yellow hover:text-c3-yellow bg-transparent"
      )}
    >
      {label}
      <span
        className={cn(
          "text-[9px] tabular-nums",
          active ? "text-[#111]/60" : "text-c3-dim"
        )}
      >
        {count}
      </span>
    </button>
  );
}
