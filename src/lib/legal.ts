/**
 * Centralized facts for the legal pages (Privacy Policy, Terms of Use,
 * Disclaimers). Kept in one place so the effective date, entity name and
 * contact details stay identical across every page and are trivial to update.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * IMPORTANT — read before publishing:
 * These documents are a thorough, good-faith starting point, NOT legal advice,
 * and they were not drafted or reviewed by a licensed attorney. Before you rely
 * on them, have counsel in your jurisdiction confirm the items marked `REVIEW`
 * below and adjust the content to your actual practices. The few things a
 * lawyer must confirm are surfaced here rather than buried in page copy.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const legal = {
  /** REVIEW: If the business is incorporated, use the full legal name here
   *  (e.g. "Cat3 Books LLC"). This string appears throughout the documents. */
  entity: "Cat3 Books",
  /** Trading / brand name shown to the public. */
  brand: "Cat3 Books",
  /** Companion property referenced in the disclaimers. */
  companion: "The Carryforward",
  /** REVIEW: confirm the governing-law state with counsel; the clause is written
   *  to be valid without naming a state, but you may prefer to name one. */
  governingLaw: "the laws of the United States and the state in which Cat3 Books is organized, without regard to its conflict-of-laws rules",
  /** Contact mailbox for privacy / legal requests. Set a dedicated privacy@
   *  alias if you prefer; hello@ is the confirmed working mailbox today. */
  contactEmail: "hello@cat3books.com",
  /** REVIEW: add a postal address if you want one shown (some jurisdictions and
   *  app-store / OAuth review processes expect one). Empty = omitted. */
  postalAddress: "",
  /** Human-readable effective / last-updated date shown on every page. Update
   *  this string whenever you change a policy. */
  effectiveDate: "July 23, 2026",
  /** Machine-readable ISO form of the same date for <time> and metadata. */
  effectiveDateISO: "2026-07-23",
} as const;

export interface LegalPage {
  slug: string;
  title: string;
  /** Short line under the title and in the footer link group. */
  blurb: string;
}

/** The three legal pages, in the order they appear in nav/footers. */
export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    blurb: "What we collect, why, who we share it with, and your choices.",
  },
  {
    slug: "terms",
    title: "Terms of Use",
    blurb: "The agreement that governs your use of this website.",
  },
  {
    slug: "disclaimer",
    title: "Disclaimers",
    blurb: "Educational content only — not tax, legal, accounting or financial advice.",
  },
];

export function otherLegalPages(currentSlug: string): LegalPage[] {
  return LEGAL_PAGES.filter((p) => p.slug !== currentSlug);
}
