import Link from "next/link";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/field-notes";
import { THEMES } from "@/lib/field-notes-taxonomy";
import { carryforward } from "@/lib/companion";
import Container from "./Container";

/** Curated, binge-able collections surfaced under "Series" (counts are dynamic). */
const SERIES: { label: string; cat: string }[] = [
  { label: "Definitive Guides", cat: "guides" },
  { label: "Standard Operating Procedures", cat: "sop" },
  { label: "Industry Benchmarks", cat: "benchmarks" },
  { label: "Cash Flow & Working Capital", cat: "cashflow" },
  { label: "Decision Frameworks", cat: "frameworks" },
  { label: "Generic vs. Specialist", cat: "comparisons" },
  { label: "Exit & Valuation", cat: "exit" },
  { label: "Reference & Glossaries", cat: "reference" },
];

/** Editorially curated flagship posts surfaced under "Must-reads". */
const MUST_READS: { label: string; slug: string }[] = [
  { label: "The Complete Bookkeeping Guide", slug: "complete-guide-bookkeeping-restoration-companies" },
  { label: "The Complete Job-Costing Guide", slug: "complete-guide-job-costing-restoration-mitigation" },
  { label: "The 7 Profit Levers", slug: "how-restoration-companies-make-money-profit-levers" },
  { label: "Financial Benchmarks by Revenue Tier", slug: "restoration-company-financial-benchmarks" },
  { label: "The 10 Hidden Profit Leaks", slug: "hidden-profit-leaks-restoration-companies" },
  { label: "Selling a Restoration Business", slug: "complete-guide-selling-restoration-business" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-yellow mb-[14px]">
      {children}
    </h5>
  );
}

/** Small dim post-count badge shown after a topic/series link. */
function Count({ n }: { n: number }) {
  return <span className="ml-1.5 text-[9px] tabular-nums text-c3-dim">{n}</span>;
}

export default function SiteFooter() {
  const posts = getAllPosts();

  // Post counts per category (plain object — no Map iteration).
  const counts: Record<string, number> = {};
  for (const p of posts) counts[p.category] = (counts[p.category] ?? 0) + 1;
  const themeCount = (cats: string[]) =>
    cats.reduce((n, c) => n + (counts[c] ?? 0), 0);

  const latest = posts.slice(0, 5); // getAllPosts() is sorted newest-first

  const linkBase =
    "block font-mono text-[11px] leading-[1.4] text-c3-mid hover:text-c3-yellow transition-colors duration-200";

  return (
    <footer className="bg-c3-dark">
      {/* ── Field Notes discovery band ─────────────────────────────── */}
      <div className="border-b border-c3-border pt-10 lg:pt-[60px] pb-10 lg:pb-14">
        <Container>
          {/* Band header */}
          <div className="flex items-end justify-between gap-4 mb-8 lg:mb-10 flex-wrap">
            <div>
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-c3-dim mb-2">
                The Field Notes Library
              </div>
              <p className="font-disp text-[clamp(28px,3.5vw,40px)] leading-[0.95] tracking-[0.02em] text-c3-text">
                Find your way in.
              </p>
            </div>
            <Link
              href="/field-notes"
              className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 border border-c3-b2 text-c3-mid hover:border-c3-yellow hover:text-c3-yellow transition-all duration-200"
            >
              Browse all {posts.length} posts →
            </Link>
          </div>

          {/* Four discovery lenses */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Topics — browse by theme */}
            <nav aria-label="Browse by topic">
              <ColumnHeading>Topics</ColumnHeading>
              {THEMES.map((t) => (
                <Link key={t.key} href={`/field-notes?cat=${t.key}`} className={`${linkBase} py-[6px]`}>
                  {t.label}
                  <Count n={themeCount(t.cats)} />
                </Link>
              ))}
            </nav>

            {/* Series — binge-able collections */}
            <nav aria-label="Browse by series">
              <ColumnHeading>Series</ColumnHeading>
              {SERIES.map((s) => (
                <Link key={s.cat} href={`/field-notes?cat=${s.cat}`} className={`${linkBase} py-[6px]`}>
                  {s.label}
                  <Count n={counts[s.cat] ?? 0} />
                </Link>
              ))}
            </nav>

            {/* Must-reads — curated flagship posts */}
            <nav aria-label="Must-read posts">
              <ColumnHeading>Must-reads</ColumnHeading>
              {MUST_READS.map((m) => (
                <Link
                  key={m.slug}
                  href={`/field-notes/${m.slug}`}
                  className={`${linkBase} py-[6px] line-clamp-1`}
                >
                  {m.label}
                </Link>
              ))}
            </nav>

            {/* Latest — most recent posts */}
            <nav aria-label="Latest posts">
              <ColumnHeading>Latest</ColumnHeading>
              {latest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/field-notes/${p.slug}`}
                  className="block group py-[6px]"
                >
                  <span className="block font-mono text-[11px] leading-[1.4] text-c3-mid group-hover:text-c3-yellow transition-colors duration-200 line-clamp-2">
                    {p.title}
                  </span>
                  <span className="block font-mono text-[9px] tracking-[0.12em] uppercase text-c3-dim mt-1">
                    {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </div>

      {/* ── Company band ───────────────────────────────────────────── */}
      <div className="pt-10 lg:pt-[60px] pb-8 lg:pb-[30px]">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-8 lg:gap-12">
            {/* Brand */}
            <div>
              <Link
                href="/"
                aria-label="Cat3 Books home"
                className="inline-flex items-baseline font-disp text-[22px] tracking-[0.04em] leading-none"
              >
                CAT
                <span className="inline-flex items-center justify-center bg-c3-yellow text-[#111] w-5 h-5 text-[18px] mx-0.5 translate-y-0.5">
                  3
                </span>
                <span className="text-c3-dim">BOOKS</span>
              </Link>
              <p className="font-body text-[13px] text-c3-mid mt-4 leading-[1.75] max-w-[320px]">
                The only bookkeeping firm built from the ground up for restoration
                contractors. Restoration only. Always.
              </p>
              <Link
                href="/field-notes"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-c3-yellow mt-5 hover:opacity-70 transition-opacity duration-200"
              >
                Read the Field Notes →
              </Link>
            </div>

            {/* Cat3 Books nav */}
            <div>
              <h5 className="font-mono text-[10px] tracking-[0.22em] text-c3-dim mb-[18px] uppercase">
                Cat3 Books
              </h5>
              {[
                ["Restoration Bookkeeping", "/restoration-bookkeeping"],
                ["Bookkeeping School ↗", "/school"],
                ["Services", "/#services"],
                ["Pricing", "/#pricing"],
                ["About", "/#founder"],
                ["Contact", "/#contact"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-yellow transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Get in Touch */}
            <div>
              <h5 className="font-mono text-[10px] tracking-[0.22em] text-c3-dim mb-[18px] uppercase">
                Get in Touch
              </h5>
              <a
                href={`mailto:${site.email}`}
                className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-yellow transition-colors duration-200"
              >
                {site.email}
              </a>
              <Link
                href="/#contact"
                className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-yellow transition-colors duration-200"
              >
                Schedule a Call
              </Link>
              <a
                href="https://quickbooks.intuit.com/find-an-accountant/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-yellow transition-colors duration-200"
              >
                QuickBooks ProAdvisor ↗
              </a>
              <a
                href="https://www.restorationindustry.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-[11px] text-c3-mid py-[7px] hover:text-c3-yellow transition-colors duration-200"
              >
                RIA Member ↗
              </a>
            </div>
          </div>

          {/* Companion publications — the two free, independent references we
              publish. Association with a primary-source tax reference and a
              plain-English bookkeeping school signals editorial seriousness. */}
          <div className="mt-12 pt-8 border-t border-c3-border grid sm:grid-cols-2 gap-6">
            <a
              href="/school"
              className="group block border border-c3-border hover:border-c3-yellow/50 transition-colors duration-200 p-5"
            >
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mb-2">
                Free companion · Education
              </div>
              <div className="font-cond font-bold text-[16px] uppercase tracking-[0.02em] text-c3-text group-hover:text-c3-yellow transition-colors duration-200">
                Small Business Bookkeeping School ↗
              </div>
              <p className="mt-1.5 font-body text-[12.5px] leading-[1.6] text-c3-mid">
                Plain-English lessons on bookkeeping, QuickBooks and reading your own numbers.
              </p>
            </a>
            <a
              href={carryforward.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-c3-border hover:border-c3-yellow/50 transition-colors duration-200 p-5"
            >
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mb-2">
                Companion publication · Tax
              </div>
              <div className="font-cond font-bold text-[16px] uppercase tracking-[0.02em] text-c3-text group-hover:text-c3-yellow transition-colors duration-200">
                {carryforward.name} ↗
              </div>
              <p className="mt-1.5 font-body text-[12.5px] leading-[1.6] text-c3-mid">
                {carryforward.tagline} An independent reference for tax professionals and investors.
              </p>
            </a>
          </div>

          {/* Legal */}
          <div className="mt-12 pt-6 border-t border-c3-border flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              ["Privacy Policy", "/privacy"],
              ["Terms of Use", "/terms"],
              ["Disclaimers", "/disclaimer"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-c3-mid hover:text-c3-yellow transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-6 pt-6 border-t border-c3-border flex justify-between flex-wrap gap-6 font-mono text-[10px] tracking-[0.18em] text-c3-dim uppercase">
            <div>© 2026 Cat3 Books · All Rights Reserved · Restoration Bookkeeping Specialists</div>
            <div>QuickBooks ProAdvisor · Xactimate Fluent · RIA Member</div>
          </div>

          {/* Standing disclaimer — the whole site is educational unless engaged */}
          <p className="mt-6 font-body font-light text-[11px] leading-[1.7] text-c3-dim max-w-[880px]">
            The information on this website is provided for general educational
            purposes only and is not tax, legal, accounting, or financial advice. Using
            this site does not create a professional relationship. See our{" "}
            <Link href="/disclaimer" className="text-c3-mid hover:text-c3-yellow transition-colors duration-200">
              Disclaimers
            </Link>{" "}
            for details.
          </p>
        </Container>
      </div>
    </footer>
  );
}
