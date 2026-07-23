/**
 * Small Business Bookkeeping School — taxonomy.
 *
 * Single source of truth for the School's subjects, levels and lesson types.
 * Plain data + pure helpers only (no React, no "use client") so it is safe to
 * import from both server components and client components.
 *
 * The School is built to hold hundreds of lessons. Everything a lesson declares
 * in frontmatter (`subject`, `level`, `type`) must resolve against this file —
 * `validateLesson()` in ./lessons.ts fails the build otherwise, so a typo in one
 * of 500 MDX files surfaces immediately instead of silently orphaning a lesson.
 */

export interface SubjectDef {
  key: string;
  /** Full display name, e.g. "Reading Your Numbers". */
  label: string;
  /** Compact label for chips/breadcrumbs where space is tight. */
  short: string;
  /** Two-digit department number shown as the subject's "course code". */
  code: string;
  /** One-line owner-facing hook — what you walk away able to do. */
  blurb: string;
  /** Longer intro rendered at the top of the subject page. */
  description: string;
  /** The question a searcher is actually asking when they land here. */
  question: string;
}

/**
 * Subjects are the School's departments. Keep this list short and stable —
 * hundreds of lessons are filed underneath, so adding a subject is a real
 * information-architecture decision, not a tagging one. Use `tags` in lesson
 * frontmatter for the long tail.
 */
export const SUBJECTS: SubjectDef[] = [
  {
    key: "foundations",
    label: "Bookkeeping Foundations",
    short: "Foundations",
    code: "101",
    blurb:
      "The vocabulary and the mental model — accounts, debits and credits, cash vs. accrual — explained without accounting-school jargon.",
    description:
      "Start here if bookkeeping still feels like a foreign language. These lessons build the mental model everything else rests on: what an account actually is, why every entry has two sides, what the chart of accounts is really for, and the difference between cash and accrual that trips up almost every new business owner.",
    question: "What is bookkeeping actually doing, and why does it work that way?",
  },
  {
    key: "quickbooks",
    label: "QuickBooks",
    short: "QuickBooks",
    code: "110",
    blurb:
      "Setting up and running QuickBooks Online the way a bookkeeper would — click by click, with the settings that matter called out.",
    description:
      "QuickBooks does not stop you from setting it up badly. These lessons walk through the setup decisions, features and day-to-day workflows in QuickBooks Online, in the order you actually meet them — and flag the handful of settings that are painful to change later.",
    question: "How do I set up and run QuickBooks correctly for my business?",
  },
  {
    key: "daily-books",
    label: "Running the Books",
    short: "Daily Books",
    code: "120",
    blurb:
      "The repeatable weekly and monthly rhythm: categorizing, reconciling, invoicing, paying bills, closing the month.",
    description:
      "Bookkeeping is a rhythm, not a project. These lessons cover the recurring work — bank feeds and categorization, reconciliation, invoicing and bills, receipts and documentation — and the month-end close checklist that turns a pile of transactions into numbers you can trust.",
    question: "What do I need to do every week and every month to stay current?",
  },
  {
    key: "reading-numbers",
    label: "Reading Your Numbers",
    short: "Your Numbers",
    code: "200",
    blurb:
      "How to read a P&L, a balance sheet and a cash flow statement — and what each one is actually telling you to do.",
    description:
      "Clean books are worthless if nobody reads them. These lessons teach you to read the three core financial statements line by line, connect them to each other, and pull the handful of numbers that should drive your decisions this month.",
    question: "What do my financial statements mean, and what should I do about them?",
  },
  {
    key: "cash-flow",
    label: "Cash Flow & Getting Paid",
    short: "Cash Flow",
    code: "210",
    blurb:
      "Why a profitable business runs out of money — and the receivables, payables and forecasting habits that fix it.",
    description:
      "Profit is an opinion; cash is a fact. These lessons cover the gap between the two: accounts receivable and collections, managing payables and timing, deposits and retainers, and building a simple forecast that tells you what your bank balance will be six weeks from now.",
    question: "Why am I profitable on paper but short on cash?",
  },
  {
    key: "payroll-taxes",
    label: "Payroll & Taxes",
    short: "Payroll & Tax",
    code: "220",
    blurb:
      "Payroll, contractors and 1099s, sales tax, and how to hand your accountant a clean year instead of a shoebox.",
    description:
      "The compliance half of the job, in plain English. These lessons cover running payroll and what those withholdings actually are, employee vs. contractor and 1099s, sales tax mechanics, estimated taxes, and exactly what your CPA needs from you at year end.",
    question: "What do I owe, to whom, and when — and how do I not get it wrong?",
  },
  {
    key: "troubleshooting",
    label: "Common Problems & Fixes",
    short: "Fixes",
    code: "300",
    blurb:
      "The specific messes every set of books develops — negative balances, stale AR, undeposited funds — and the fix for each.",
    description:
      "The largest and fastest-growing department in the School: one lesson per specific problem, each with the symptom, the cause, and the step-by-step fix. If something in your books looks wrong, start here and search the symptom.",
    question: "Something in my books looks wrong — how do I fix it?",
  },
  {
    key: "business-decisions",
    label: "Bookkeeping for Decisions",
    short: "Decisions",
    code: "400",
    blurb:
      "Using your books to price work, decide on a hire, choose an entity, or make the case to a lender.",
    description:
      "Where bookkeeping stops being paperwork and starts being leverage. These lessons connect the numbers in your books to the decisions on your desk: what to charge, whether you can afford the hire, how to read your own break-even, and what a bank or a buyer will look at first.",
    question: "How do I use my numbers to make a better business decision?",
  },
];

export const SUBJECT_KEYS = SUBJECTS.map((s) => s.key);

export const SUBJECT_BY_KEY: Record<string, SubjectDef> = Object.fromEntries(
  SUBJECTS.map((s) => [s.key, s])
);

export function getSubject(key: string): SubjectDef | undefined {
  return SUBJECT_BY_KEY[key];
}

/** Display label for a subject key, falling back to the raw key. */
export function subjectLabel(key: string): string {
  return SUBJECT_BY_KEY[key]?.label ?? key;
}

// ── Levels ─────────────────────────────────────────────────────────────────

export interface LevelDef {
  key: string;
  label: string;
  /** Who this level is written for. */
  blurb: string;
}

export const LEVELS: LevelDef[] = [
  {
    key: "beginner",
    label: "Beginner",
    blurb: "No accounting background assumed. Every term is defined the first time it appears.",
  },
  {
    key: "intermediate",
    label: "Intermediate",
    blurb: "You know the vocabulary and keep your own books. This is the next layer of craft.",
  },
  {
    key: "advanced",
    label: "Advanced",
    blurb: "Edge cases, judgment calls, and the things that separate clean books from correct ones.",
  },
];

export const LEVEL_KEYS = LEVELS.map((l) => l.key);

export const LEVEL_BY_KEY: Record<string, LevelDef> = Object.fromEntries(
  LEVELS.map((l) => [l.key, l])
);

// ── Lesson types ───────────────────────────────────────────────────────────

export interface LessonTypeDef {
  key: string;
  label: string;
  /** Short verb phrase describing the shape of the piece. */
  blurb: string;
}

/**
 * The *shape* of a lesson, independent of its subject. Drives the badge on
 * cards, the schema.org type emitted, and the "what am I about to read"
 * expectation. A troubleshooting subject can still contain a `concept` lesson.
 */
export const LESSON_TYPES: LessonTypeDef[] = [
  { key: "concept", label: "Concept", blurb: "Explains an idea and the model behind it." },
  { key: "walkthrough", label: "Walkthrough", blurb: "Numbered steps you follow along with, click by click." },
  { key: "fix", label: "Fix", blurb: "A specific symptom, its cause, and the repair." },
  { key: "checklist", label: "Checklist", blurb: "A recurring routine you work through and tick off." },
  { key: "reference", label: "Reference", blurb: "Definitions, tables and lookups you come back to." },
  { key: "example", label: "Worked Example", blurb: "One real scenario carried all the way through the numbers." },
];

export const LESSON_TYPE_KEYS = LESSON_TYPES.map((t) => t.key);

export const LESSON_TYPE_BY_KEY: Record<string, LessonTypeDef> = Object.fromEntries(
  LESSON_TYPES.map((t) => [t.key, t])
);

// ── Route helpers ──────────────────────────────────────────────────────────

export const SCHOOL_BASE = "/school";

export const schoolPaths = {
  home: SCHOOL_BASE,
  library: `${SCHOOL_BASE}/library`,
  courses: `${SCHOOL_BASE}/courses`,
  subject: (key: string) => `${SCHOOL_BASE}/subjects/${key}`,
  course: (id: string) => `${SCHOOL_BASE}/courses/${id}`,
  lesson: (slug: string) => `${SCHOOL_BASE}/${slug}`,
  /** Library pre-filtered by a facet — used by cards, chips and the footer. */
  filtered: (params: { subject?: string; level?: string; type?: string; q?: string }) => {
    const sp = new URLSearchParams();
    if (params.subject) sp.set("subject", params.subject);
    if (params.level) sp.set("level", params.level);
    if (params.type) sp.set("type", params.type);
    if (params.q) sp.set("q", params.q);
    const qs = sp.toString();
    return qs ? `${SCHOOL_BASE}/library?${qs}` : `${SCHOOL_BASE}/library`;
  },
} as const;

/**
 * Slugs that would collide with a static child route under /school. A lesson
 * using one of these would be shadowed by the static page and become
 * unreachable, so the loader rejects them at build time.
 */
export const RESERVED_SLUGS = new Set([
  "library",
  "courses",
  "subjects",
  "search-index.json",
  "opengraph-image",
]);
