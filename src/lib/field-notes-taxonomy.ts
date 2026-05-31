/**
 * Field Notes taxonomy — the single source of truth for blog categories and
 * the themes that group them. Imported by both the client-side category filter
 * (CategoryBar) and the server-side footer (SiteFooter), so the two never drift.
 *
 * Plain data + pure helpers only (no React, no "use client") so it's safe to
 * import from both server and client components.
 */

export interface CategoryDef {
  key: string;
  label: string;
}

/** Category key → display label. One entry per `category` value used in MDX frontmatter. */
export const CATEGORIES: CategoryDef[] = [
  { key: "frameworks", label: "Decision Frameworks" },
  { key: "benchmarks", label: "Industry Benchmarks" },
  { key: "jobcosting", label: "Job Costing" },
  { key: "pl", label: "P&L Management" },
  { key: "hiring", label: "Hiring & Outsourcing" },
  { key: "comparisons", label: "Comparisons" },
  { key: "sop", label: "Standard Operating Procedures" },
  { key: "software", label: "Software Reviews" },
  { key: "qb", label: "QuickBooks Guides" },
  { key: "profit", label: "Profitability" },
  { key: "supplements", label: "Supplements & TPAs" },
  { key: "cashflow", label: "Cash Flow & Working Capital" },
  { key: "guides", label: "Definitive Guides" },
  { key: "industry", label: "Industry & Strategy" },
  { key: "research", label: "Industry Research" },
  { key: "exit", label: "Exit Planning & Valuation" },
  { key: "reference", label: "Reference" },
];

export interface ThemeDef {
  key: string;
  label: string;
  cats: string[];
  /** One-line, owner-facing benefit hook — what you get from reading this track. */
  blurb: string;
}

/**
 * Themes group the 16 categories into a short, scannable top-level nav.
 * Theme keys are prefixed `t-` so they never collide with category keys —
 * a filter value (and the ?cat= URL param) can hold "all", a theme key, or a
 * category key and be resolved unambiguously. Every category belongs to one theme.
 * `blurb` is the benefit hook surfaced on the topic tiles and series headers.
 */
export const THEMES: ThemeDef[] = [
  {
    key: "t-profit",
    label: "Profit & Numbers",
    cats: ["profit", "benchmarks", "pl", "cashflow"],
    blurb: "Find out if your margins are actually good — and the specific levers that move net profit, not just revenue.",
  },
  {
    key: "t-ops",
    label: "Costing & SOPs",
    cats: ["jobcosting", "sop", "supplements"],
    blurb: "Stop guessing which jobs make money. The job costing and step-by-step procedures that plug the leaks.",
  },
  {
    key: "t-people",
    label: "Hiring & Decisions",
    cats: ["hiring", "frameworks", "comparisons"],
    blurb: "The bet-the-business calls — who to hire, what to outsource, which bookkeeper — made with numbers, not gut.",
  },
  {
    key: "t-software",
    label: "Software",
    cats: ["software", "qb"],
    blurb: "Which tools actually fit restoration accounting, and which will cost you a year — decided before you commit.",
  },
  {
    key: "t-industry",
    label: "Guides & Industry",
    cats: ["industry", "research", "guides", "exit"],
    blurb: "The deep guides, industry data, and exit math that tell you where the business is headed and what it's worth.",
  },
  {
    key: "t-reference",
    label: "Reference",
    cats: ["reference"],
    blurb: "Plain-English definitions for every insurance, accounting, and tax term an adjuster or buyer will use on you.",
  },
];

export const CAT_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c.label])
);

/** Resolve a filter key (theme | category | "all") to the theme it lives in. */
export function themeForKey(key: string): ThemeDef | null {
  if (key === "all") return null;
  const asTheme = THEMES.find((t) => t.key === key);
  if (asTheme) return asTheme;
  return THEMES.find((t) => t.cats.includes(key)) ?? null;
}

/** Does a post's category fall under the active filter key? */
export function matchesFilter(postCategory: string, key: string): boolean {
  if (key === "all") return true;
  const theme = THEMES.find((t) => t.key === key);
  if (theme) return theme.cats.includes(postCategory);
  return postCategory === key;
}
