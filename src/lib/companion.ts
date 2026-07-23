/**
 * The Carryforward — companion publication.
 *
 * A separately-run, independent educational reference on specialty tax and
 * incentives (R&D credits, §174, cost segregation, energy incentives), written
 * for tax professionals, investors and business owners.
 *
 * It shares the School's editorial DNA — plain-English, primary-source-grounded,
 * no sales pitch — which is exactly why linking to it strengthens rather than
 * dilutes this site's credibility. We present it as a sibling publication with
 * the same standards, not as an ad. Single source of truth so the URL, framing
 * and disclaimers stay consistent everywhere it appears.
 */
export const carryforward = {
  name: "The Carryforward",
  url: "https://thecarryforward.com",
  tagline: "Specialty tax & incentives, explained plainly.",
  /** One-line description of scope, owner-facing. */
  scope:
    "An independent reference for the corners of the tax code where good explanations are scarce and sales pitches are not.",
  /** The relationship we assert — kept accurate and modest. */
  relationship: "Companion publication",
  /** The credibility hook: shared editorial standards, stated the way they state them. */
  standards: [
    "Independent — no studies sold, no sponsorships, no lead forms",
    "Grounded in the Internal Revenue Code, Treasury regulations, IRS guidance and case law",
    "Covers when an incentive does not make sense, and what examiners challenge",
  ],
  /** Topics, used for contextual links from tax-adjacent lessons. */
  topics: [
    { label: "R&D Tax Credits (§41)", href: "https://thecarryforward.com" },
    { label: "Section 174", href: "https://thecarryforward.com" },
    { label: "Cost Segregation", href: "https://thecarryforward.com" },
    { label: "Energy Incentives (§179D / §45L)", href: "https://thecarryforward.com" },
  ],
  /** Where our scope ends and theirs begins — the honest boundary we hand off at. */
  boundary:
    "We teach you to keep clean books and read your own numbers. Where those numbers meet the specialty tax code, The Carryforward picks up.",
} as const;
