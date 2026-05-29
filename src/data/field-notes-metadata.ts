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
};
