/**
 * Small Business Bookkeeping School — courses.
 *
 * A course is an *ordered* reading path through lessons that already exist in
 * `src/content/school`. Ordering lives here rather than in frontmatter for two
 * reasons: a lesson can appear in more than one course, and re-sequencing a
 * course should be a one-file edit, not a sweep across twenty MDX files.
 *
 * Courses may reference lessons that have not been written yet. `getCourse()`
 * in ./lessons.ts resolves the list against the content directory and silently
 * drops unresolved slugs, so a course can be planned in full and fill in as the
 * lessons land.
 */

export interface CourseLessonRef {
  /** Slug of an MDX file in src/content/school (without the .mdx extension). */
  slug: string;
  /**
   * Open-loop hook shown on the course outline and the "next lesson" card —
   * the reason to keep going, written from the reader's problem, not ours.
   */
  hook: string;
}

export interface CourseDef {
  id: string;
  title: string;
  /** Eyebrow shown above the title, e.g. "Free Course · 8 Lessons · ~90 min". */
  eyebrow: string;
  /** One-sentence summary used on cards and in metadata. */
  summary: string;
  /** The problem-plus-payoff paragraph that opens the course page. */
  promise: string;
  /** Primary subject key — used for cross-linking and colour. */
  subject: string;
  /** Level key from LEVELS. */
  level: string;
  /** "By the end you can…" bullets. Rendered as the syllabus outcomes. */
  outcomes: string[];
  /** Ordered lessons. Unwritten slugs are dropped at read time. */
  lessons: CourseLessonRef[];
  /** Featured courses are surfaced on the School home page. */
  featured?: boolean;
}

export const COURSES: CourseDef[] = [
  {
    id: "bookkeeping-from-scratch",
    title: "Bookkeeping From Scratch",
    eyebrow: "Free Course",
    summary:
      "The complete beginner's path: what bookkeeping is, how the accounts fit together, and how to get your first month closed.",
    promise:
      "Most owners learn bookkeeping in the worst possible order — they open QuickBooks first and try to reverse-engineer the concepts from the buttons. This course runs the other way. You will learn what the books are actually modelling, then set them up once, correctly, and close your first month with numbers you trust.",
    subject: "foundations",
    level: "beginner",
    outcomes: [
      "Explain what an account, a debit and a credit actually are — without memorising rules",
      "Choose between cash and accrual basis for your business, and say why",
      "Build a chart of accounts that produces a P&L you can read",
      "Close a month end to end and know that it is right",
    ],
    lessons: [
      {
        slug: "what-is-bookkeeping",
        hook: "Start with the thing nobody explains: bookkeeping is not data entry. It is a model of your business, and once you see the model the rest stops being memorisation.",
      },
      {
        slug: "debits-and-credits-explained",
        hook: "The single concept that makes every other lesson easy — and the reason your accountant's software never lets a number go missing.",
      },
      {
        slug: "cash-vs-accrual-accounting",
        hook: "This one choice decides whether your P&L tells you the truth about a good month. Most small businesses pick by accident. Pick on purpose.",
      },
      {
        slug: "chart-of-accounts-small-business",
        hook: "Your chart of accounts is the outline of every report you will ever read. Set it up wrong and your P&L stays useless no matter how clean the entries are.",
      },
      {
        slug: "month-end-close-checklist",
        hook: "Now put it together: the repeatable close that turns a month of transactions into a statement you would show a lender.",
      },
    ],
    featured: true,
  },
  {
    id: "quickbooks-setup",
    title: "QuickBooks Online, Set Up Right",
    eyebrow: "Free Course",
    summary:
      "The setup decisions that are painful to undo, made correctly the first time — then the daily workflow that keeps it clean.",
    promise:
      "Nearly every messy QuickBooks file we see was set up in twenty rushed minutes. A handful of those early settings — start date, opening balances, products and services, bank feed rules — quietly decide how much cleanup you pay for later. This course walks the setup in the right order and stops at each decision that is expensive to reverse.",
    subject: "quickbooks",
    level: "beginner",
    outcomes: [
      "Set a start date and opening balances that reconcile on day one",
      "Connect bank feeds and write rules that categorise correctly, not just quickly",
      "Set up products, services and invoices so your P&L is readable by line of business",
      "Run the three reports that tell you whether the file is healthy",
    ],
    lessons: [
      {
        slug: "quickbooks-online-setup-guide",
        hook: "The setup screens in order, with the four decisions that are painful to undo flagged before you click past them.",
      },
      {
        slug: "connect-bank-feeds-quickbooks",
        hook: "Bank feeds save hours or create months of cleanup, depending entirely on how you write the rules. Here is the difference.",
      },
      {
        slug: "how-to-reconcile-bank-account",
        hook: "Reconciliation is the proof your books match reality. Do it monthly and nothing hides; skip it and everything does.",
      },
    ],
    featured: true,
  },
  {
    id: "read-your-financials",
    title: "Read Your Own Financials",
    eyebrow: "Free Course",
    summary:
      "Line by line through the P&L, balance sheet and cash flow statement — and the decisions each one is asking you to make.",
    promise:
      "You can have perfectly clean books and still run the business blind. This course takes the three statements apart line by line, shows how they connect, and ends with the short list of numbers worth checking every single month.",
    subject: "reading-numbers",
    level: "intermediate",
    outcomes: [
      "Read a P&L top to bottom and say what each section is telling you",
      "Explain what your balance sheet says about risk and what you actually own",
      "Trace why profit and cash disagree in any given month",
      "Pick the five numbers to review monthly for your specific business",
    ],
    lessons: [
      {
        slug: "how-to-read-profit-and-loss",
        hook: "Revenue at the top, net at the bottom, and six lines in between that decide whether you had a good month. Start with the one most owners misread.",
      },
      {
        slug: "how-to-read-balance-sheet",
        hook: "The statement owners skip — and the only one that shows what the business is actually worth and how exposed you are.",
      },
      {
        slug: "profit-vs-cash-flow",
        hook: "You made $40,000 in profit and your account is down $6,000. This lesson shows exactly where it went, in order.",
      },
    ],
    featured: true,
  },
];

export const COURSE_IDS = COURSES.map((c) => c.id);

export function getCourseDef(id: string): CourseDef | undefined {
  return COURSES.find((c) => c.id === id);
}

/** Every course that includes this lesson slug, with the lesson's position. */
export function coursesContaining(
  slug: string
): { course: CourseDef; index: number }[] {
  const out: { course: CourseDef; index: number }[] = [];
  for (const course of COURSES) {
    const index = course.lessons.findIndex((l) => l.slug === slug);
    if (index >= 0) out.push({ course, index });
  }
  return out;
}
