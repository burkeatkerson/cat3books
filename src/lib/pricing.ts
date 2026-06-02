/**
 * Single source of truth for Cat3 Books pricing.
 *
 * Flat monthly fees — billed the same regardless of a client's revenue or job
 * volume. Three done-for-you packages, each additive on the one before it.
 * Anything that quotes a price (pricing UI, JSON-LD offers, llms.txt, blog
 * posts) should trace back here.
 */

export type PricingTierId = "bookkeeping" | "job-costing" | "cfo";

export interface PricingTier {
  id: PricingTierId;
  /** Small mono kicker above the card title, e.g. "Tier 01". */
  kicker: string;
  /** Short card heading. */
  name: string;
  /** Full, spelled-out package name — used for SEO/schema. */
  fullName: string;
  /** Flat price in whole US dollars per month. */
  monthly: number;
  /** One-line plain-English promise. */
  tagline: string;
  /** Bullet list. Tiers 2–3 lead with an "Everything in …, plus —" rollup line. */
  features: string[];
  /** Button label. */
  cta: string;
  /** Highlighted as the recommended tier. */
  featured?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "bookkeeping",
    kicker: "Tier 01",
    name: "Bookkeeping",
    fullName: "Bookkeeping",
    monthly: 1000,
    tagline: "Clean, current, restoration-ready books — done for you, every month.",
    features: [
      "Full monthly bookkeeping & bank reconciliation",
      "Restoration-specific chart of accounts",
      "Supplement recovery tracking & monthly report",
      "TPA channel AR aging by program",
      "Subcontractor W-9, COI & 1099 management",
      "Equipment revenue & asset tracking",
      "Monthly close by the 15th, every month",
      "CPA-ready financials, year-round",
      "Monthly review call",
    ],
    cta: "Start with Bookkeeping",
  },
  {
    id: "job-costing",
    kicker: "Tier 02",
    name: "+ Job Costing",
    fullName: "Bookkeeping + Job Costing",
    monthly: 2000,
    tagline: "Everything in Bookkeeping, plus the true margin on every single job.",
    features: [
      "Everything in Bookkeeping, plus —",
      "Job costing on every project — labor, materials, equipment, subs, overhead",
      "Job-level P&L, every job, every month",
      "Estimate-to-books mapping (Xactimate, Albi, Dash, JobNimbus)",
      "Margin by job type, carrier & TPA program",
      "True job margin before you send the invoice",
      "Field receipts tagged to the right job, every week",
    ],
    cta: "Add Job Costing",
    featured: true,
  },
  {
    id: "cfo",
    kicker: "Tier 03",
    name: "+ Fractional CFO",
    fullName: "Bookkeeping + Job Costing + Fractional CFO",
    monthly: 5000,
    tagline: "Everything in Job Costing, plus a fractional CFO in your corner.",
    features: [
      "Everything in Job Costing, plus —",
      "AP management — vendor bills & payment scheduling",
      "AR management — collections, aging & follow-up",
      "13-week rolling cash flow forecast",
      "CEO dashboard — KPIs, job mix, TPA performance",
      "Budget vs. actual & quarterly reporting package",
      "Banking, lending & bonding support",
      "Monthly CFO advisory call (60 min)",
      "Tax strategy coordination with your CPA",
    ],
    cta: "Get the Full Suite",
  },
];

/** Optional payroll processing — available on any package. */
export const PAYROLL_ADDON = { amount: 400, unit: "pay cycle" } as const;

/** Format a whole-dollar amount with thousands separators (no cents). */
export function formatUsd(n: number): string {
  return n.toLocaleString("en-US");
}

/** Look up a tier by id (used by components that anchor to a specific package). */
export function getTier(id: PricingTierId): PricingTier {
  const tier = PRICING_TIERS.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown pricing tier: ${id}`);
  return tier;
}
