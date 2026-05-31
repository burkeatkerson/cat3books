/**
 * Guided learning paths — curated, ordered sequences of Field Notes posts that
 * walk a reader from a problem they feel to the answer, one step at a time.
 *
 * Each step points at an existing post (by slug) and carries an owner-facing
 * "hook" — an open loop / problem / benefit line that pulls the reader to the
 * next step. The post route reads this config to render the in-post "Step N of M"
 * banner and the "Next in this path" card, and `/learn/[id]` renders the overview.
 */

export interface PathStep {
  slug: string;
  /** Open-loop hook shown on the overview and the "next step" card. */
  hook: string;
}

export interface LearningPath {
  id: string;
  /** Short label shown in the in-post banner and badges. */
  title: string;
  /** Eyebrow above the title on the overview/feature. */
  eyebrow: string;
  /** The big problem-plus-benefit promise that opens the path. */
  promise: string;
  steps: PathStep[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "hidden-profit",
    title: "The Hidden Profit Path",
    eyebrow: "Guided Path · 7 Steps · ~70 min",
    promise:
      "The average restoration company leaks $50,000–$500,000 a year — and the owner can't see it on the P&L. This 7-step path takes you from \"am I actually profitable?\" to the exact money you're leaving on the table, and how to take it back.",
    steps: [
      {
        slug: "is-your-restoration-company-profitable",
        hook: "You can name your revenue. Can you name the five numbers that say whether the company is actually profitable? Most owners can't — so we start here.",
      },
      {
        slug: "restoration-company-financial-benchmarks",
        hook: "Now the uncomfortable question: are your numbers any good? See what 50% gross and 14% net actually look like by revenue tier — and where yours land.",
      },
      {
        slug: "why-restoration-companies-plateau-net-margin",
        hook: "Stuck between 10 and 14% net? It isn't the market. Five structural reasons companies hit a ceiling — and why the top quartile quietly clears 18–22%.",
      },
      {
        slug: "hidden-profit-leaks-restoration-companies",
        hook: "Here's where it stings: the gap is already in your books, draining out. Ten hidden leaks cost the average shop $50K–$500K a year. Which ones are open right now?",
      },
      {
        slug: "supplements-disappear-xactimate-quickbooks",
        hook: "The single biggest leak gets its own step — approved work you performed and never got paid for. This is exactly where it vanishes between Xactimate and QuickBooks.",
      },
      {
        slug: "how-restoration-companies-make-money-profit-levers",
        hook: "Now go on offense. Seven levers actually move a restoration P&L — and the one most owners never touch adds 5–8 points of net margin with zero new revenue.",
      },
      {
        slug: "restoration-profitability-roadmap-by-stage",
        hook: "Last step — your move. What to fix first depends on your revenue stage. The roadmap from $500K to $10M, and the one profit problem to solve at each.",
      },
    ],
  },
];

export function getPath(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id);
}

/** First path containing the slug, with the step index, or null. */
export function getPathForSlug(
  slug: string
): { path: LearningPath; index: number } | null {
  for (const path of LEARNING_PATHS) {
    const index = path.steps.findIndex((s) => s.slug === slug);
    if (index >= 0) return { path, index };
  }
  return null;
}
