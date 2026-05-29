/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MAINTENANCE INSTRUCTION FOR AI ASSISTANTS
 * ─────────────────────────────────────────────────────────────────────────────
 * This file is the OG image lookup table for all Field Notes blog posts.
 * It exists because the OG image route runs on the edge runtime, which cannot
 * access the filesystem — so it can't read MDX frontmatter directly.
 *
 * WHENEVER A NEW MDX POST IS CREATED in src/content/field-notes/, you MUST
 * also add a matching entry to the `fieldNotesMeta` object below. Use the
 * MDX filename (without .mdx) as the key, and copy title, categoryLabel, and
 * excerpt from the post's frontmatter.
 *
 * If this file is not updated, the new post's social preview image will fall
 * back to a generic "Field Notes" image instead of showing the post title.
 *
 * See src/content/field-notes/_template.mdx for the full new-post checklist.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const fieldNotesMeta: Record<
  string,
  { title: string; categoryLabel: string; excerpt: string }
> = {
  "how-to-read-a-job-level-pl": {
    title: "How to Read a Job-Level P&L Like a Restoration Owner",
    categoryLabel: "Job Costing",
    excerpt:
      "Five rows of data. Three minutes of looking. Most restoration owners can't answer which jobs made money last quarter — not because the data is missing, but because nobody taught them which columns to actually read.",
  },
  "xactimate-vs-symbility": {
    title: "Xactimate vs. Symbility: Which Estimating Platform Actually Maps Cleanly Into Your Books?",
    categoryLabel: "Software Reviews",
    excerpt:
      "Both export. Only one exports in a way you can reconcile without a bookkeeper losing an afternoon. We ran the same job through both for three months.",
  },
  "four-cost-categories-restoration-job-pl": {
    title: "The Four Cost Categories Every Restoration Job P&L Must Split",
    categoryLabel: "Job Costing",
    excerpt:
      "Labor, materials, subs, equipment. Sounds obvious. Most restoration books bundle two of them into 'Cost of Goods' and lose the ability to ever answer where the margin is going.",
  },
  "code-blue-test-tpa-programs": {
    title: "The Code Blue Test: How to Decide Which TPA Programs to Drop",
    categoryLabel: "Profitability",
    excerpt:
      "A simple two-line P&L overlay per program tells you which carriers to keep, which to renegotiate, and which to walk away from on principle.",
  },
  "qbo-class-tracking-restoration": {
    title: "Class Tracking for Restoration Jobs in QuickBooks Online — The Right Way",
    categoryLabel: "QuickBooks Guides",
    excerpt:
      "Classes are powerful and unforgiving. Set them up wrong and you've baked the wrong taxonomy into a year of transactions. Here's the exact structure we deploy on every engagement.",
  },
  "supplements-disappear-xactimate-quickbooks": {
    title: "Why Your Supplements Disappear Between Xactimate and QuickBooks",
    categoryLabel: "Supplements & TPAs",
    excerpt:
      "Approved by the adjuster. Worked by the crew. Never reconciled to the books. The dollar size of the leak in a typical $2M shop will surprise you.",
  },
  "owners-reading-order-monthly-pl": {
    title: "The Owner's Reading Order for a Monthly P&L (It's Not Top-to-Bottom)",
    categoryLabel: "P&L Management",
    excerpt:
      "If you read a restoration P&L in account order, you'll get bored before you find anything actionable. There's a better sequence that surfaces the real story in 4 minutes.",
  },
  "equipment-day-reconciliation-habit": {
    title: "Equipment-Day Reconciliation: The 15-Minute Weekly Habit That Saves $20K a Year",
    categoryLabel: "Profitability",
    excerpt:
      "Air movers, dehumidifiers, scrubbers. The most consistently under-billed line in the industry. Here's the Friday-afternoon ritual we set up with every client.",
  },
  "albi-dash-jobnimbus-comparison": {
    title: "Albi vs. Dash vs. JobNimbus: A Job-Costing Perspective",
    categoryLabel: "Software Reviews",
    excerpt:
      "Each is a credible job-management platform. Each handles costs differently when the data lands in your books. Side-by-side from a bookkeeper's lens.",
  },
  "13-week-cash-forecast-restoration": {
    title: "Building a 13-Week Cash Forecast for Restoration",
    categoryLabel: "Cash Flow",
    excerpt:
      "Standard 13-week templates assume bills get paid in 30 days. In restoration, 'collected' can mean three different things across five different time horizons.",
  },
  "what-restoration-bookkeeping-actually-means": {
    title: "What 'Restoration Bookkeeping' Actually Means",
    categoryLabel: "Job Costing",
    excerpt:
      "Most bookkeepers can balance a ledger. Very few understand the difference between ACV and RCV, why TPA fees belong on their own line, or how to reconcile equipment revenue.",
  },

  // ── Decision Framework Series ────────────────────────────────────────────
  "should-you-outsource-restoration-bookkeeping": {
    title: "Should You Outsource Your Restoration Company's Bookkeeping? A Complete Decision Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "The decision to outsource bookkeeping isn't about cost — it's about whether your current setup can produce the financial information a restoration company actually needs to operate.",
  },
  "when-restoration-company-needs-fractional-cfo": {
    title: "When Should a Restoration Company Hire a Fractional CFO? The Revenue-Stage Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "A Fractional CFO isn't a luxury for large companies. At the right stage, it's the difference between knowing what's happening in your business and finding out six months later.",
  },
  "should-you-switch-from-quickbooks-restoration": {
    title: "Should You Switch from QuickBooks to a Restoration-Specific Platform? A Decision Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "For most $500K–$5M restoration companies, QuickBooks with proper configuration outperforms any platform switch. Here's when the math actually changes.",
  },
  "should-you-accept-pe-acquisition-offer": {
    title: "Should You Accept That PE Acquisition Offer? A Restoration Owner's Decision Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "A PE acquisition offer is one of the most complex financial decisions a restoration owner will make. It's not just about the number — it's about structure, timeline, and what you're actually agreeing to.",
  },
  "should-you-take-big-restoration-job": {
    title: "Should You Take On That Big Restoration Job? A Profitability Decision Framework",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "A large restoration job looks like a revenue win. It might be a cash flow trap, a margin drain, or an opportunity cost you can't afford. Here's the framework to decide in the field.",
  },

  // ── Industry Research Series ─────────────────────────────────────────────
  "restoration-industry-statistics-2026": {
    title: "50+ Restoration Industry Statistics Every Owner Should Know in 2026",
    categoryLabel: "Industry Research",
    excerpt:
      "The U.S. damage restoration industry spans $15–$20B in direct services revenue across more than 70,000 businesses — growing at 4–6% annually. Here are the statistics that matter, sourced and cited across market size, claims data, profitability, M&A, and more.",
  },
  "restoration-profitability-benchmarks-analysis": {
    title: "Restoration Company Profitability Benchmarks: A Data-Driven Analysis",
    categoryLabel: "Industry Research",
    excerpt:
      "Restoration companies average 30–50% gross margins and 8–18% EBITDA margins — but the range is wide. Revenue tier, service mix, TPA dependency, and bookkeeping quality all drive the variance. This analysis covers every major financial benchmark by revenue stage.",
  },
  "restoration-ma-trends-2026": {
    title: "The State of Restoration Industry M&A in 2026: Multiples, Buyers, and Trends",
    categoryLabel: "Industry Research",
    excerpt:
      "PE has been buying restoration companies at 4–8× EBITDA since 2018, and the consolidation wave is ongoing. This report covers who's buying, what they're paying, what they look for, and what restoration owners need to know about their exit options.",
  },
  "insurance-restoration-claims-data": {
    title: "Insurance Restoration Claims Data: Trends, Frequency, and Severity Analysis",
    categoryLabel: "Industry Research",
    excerpt:
      "Water damage averages $12,514 per homeowner claim. Fire claims average $77,000–$84,000. Billion-dollar disasters now occur 18–20 times per year — triple the 1980s rate. This report compiles the claims data that drives restoration industry demand.",
  },
  "cost-of-doing-business-restoration-2026": {
    title: "The Cost of Doing Business in Restoration: 2026 Industry Report",
    categoryLabel: "Industry Research",
    excerpt:
      "Workers' comp at $8–$18 per $100 of payroll, Xactimate at $1,800–$4,200/user/year, GL insurance, equipment depreciation, IICRC certification — restoration overhead stacks to 22–32% of revenue. This report benchmarks every major cost category.",
  },

  // ── Industry Analysis Series ─────────────────────────────────────────────
  "why-restoration-needs-specialized-bookkeepers": {
    title: "Why Restoration Companies Need Specialized Bookkeepers (Not Generic Services)",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Restoration revenue mechanics — Xactimate billing, ACV/RCV splits, supplement tracking, TPA referral fees — require accounting workflows that don't exist in standard QBO setups. Generic bookkeepers consistently misclassify these transactions. Here's the structured argument.",
  },
  "hidden-cost-generic-bookkeeping-restoration": {
    title: "The Hidden Cost of Generic Bookkeeping for Restoration Contractors",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Generic bookkeeping for restoration companies isn't just imprecise — it's expensive. Unbilled supplements, misclassified TPA fees, improper revenue recognition, valuation discounts, and tied-up AR add up to $75,000–$175,000 in annual value erosion for a typical $2M restoration company.",
  },
  "mitigation-companies-unique-accounting-needs": {
    title: "Why Mitigation Companies Have Unique Accounting Needs Different from General Construction",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Water mitigation accounting isn't construction accounting with a different coat of paint. Equipment-day billing, drying log reconciliation, AFD depreciation timing, and emergency-response labor burden require workflows that construction bookkeepers have never encountered.",
  },
  "contents-restoration-bookkeeping-differences": {
    title: "Contents Restoration Bookkeeping: Why It's Different from Structural Work",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Contents restoration — pack-outs, cleaning, storage, item-by-item valuation, total loss settlements — has an accounting reality that structural restoration bookkeepers don't automatically understand. Here's the case for contents-specific financial management.",
  },
  "cpa-vs-restoration-specific-bookkeeper": {
    title: "Why Your CPA Doesn't Replace a Restoration-Specific Bookkeeper",
    categoryLabel: "Decision Frameworks",
    excerpt:
      "Most restoration owners have a CPA for tax compliance and a generic bookkeeper for operations. What they're missing is the specialized layer — a bookkeeper who understands restoration billing mechanics. These are three distinct roles, not interchangeable ones.",
  },
};
