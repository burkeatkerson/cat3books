/**
 * MDX component kit for Bookkeeping School lessons.
 *
 * Every component here is available in every lesson without an import — the map
 * at the bottom is handed to <MDXRemote>. This is deliberately a *teaching* kit
 * rather than a marketing one: define a term, show the entry, warn about the
 * classic mistake, work an example, tick off a checklist.
 *
 * All server components (no "use client"), so lessons stay fully static.
 */

import Link from "next/link";
import type { DefinedTerm as DefinedTermSchema, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import { schoolPaths } from "@/lib/school/taxonomy";
import { carryforward } from "@/lib/companion";

// ── Quick answer ───────────────────────────────────────────────────────────

/**
 * The short, quotable answer to the lesson's question. Marked `.speakable-answer`
 * so the lesson page's schema can point AI engines at the canonical answer.
 */
export function QuickAnswer({
  question,
  children,
}: {
  question?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose my-8 border-l-[3px] border-school-sun bg-[#FFFDF5] border border-l-[3px] border-school-line p-5">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8a6d00] mb-2">
        The short answer
      </p>
      {question && (
        <p className="font-cond font-semibold text-[17px] leading-[1.3] text-school-ink mb-2">
          {question}
        </p>
      )}
      <div className="speakable-answer font-serif text-[17px] leading-[1.7] text-school-body [&>p]:m-0 [&>p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}

// ── Key term ───────────────────────────────────────────────────────────────

/**
 * Defines a term the first time a lesson uses it, and emits DefinedTerm schema
 * so the definition is machine-readable. `also` lists synonyms an owner might
 * search for instead.
 */
export function KeyTerm({
  term,
  also,
  children,
}: {
  term: string;
  also?: string;
  children: React.ReactNode;
}) {
  const schema: WithContext<DefinedTermSchema> = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: typeof children === "string" ? children : term,
    ...(also ? { alternateName: also } : {}),
  };

  return (
    <div className="not-prose my-7 border border-school-line bg-school-raised">
      <JsonLd schema={schema} />
      <div className="flex items-baseline gap-3 px-5 pt-4 pb-2 border-b border-school-line bg-school-wash/60">
        <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-navy">
          Key term
        </span>
        <span className="font-cond font-bold text-[17px] tracking-[0.01em] text-school-ink">
          {term}
        </span>
        {also && (
          <span className="font-body text-[12px] italic text-school-faint">also: {also}</span>
        )}
      </div>
      <div className="px-5 py-4 font-serif text-[16px] leading-[1.7] text-school-body [&>p]:m-0 [&>p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}

// ── Callouts ───────────────────────────────────────────────────────────────

type CalloutVariant = "note" | "tip" | "warning" | "mistake" | "rule";

const CALLOUT: Record<CalloutVariant, { label: string; bar: string; bg: string; text: string }> = {
  note: { label: "Note", bar: "bg-school-navy", bg: "bg-school-wash", text: "text-school-navy" },
  tip: { label: "Do this", bar: "bg-school-green", bg: "bg-school-green/[0.05]", text: "text-school-green" },
  warning: { label: "Careful", bar: "bg-school-sun", bg: "bg-[#FFFBEC]", text: "text-[#8a6d00]" },
  mistake: { label: "Common mistake", bar: "bg-school-red", bg: "bg-school-red/[0.04]", text: "text-school-red" },
  rule: { label: "The rule", bar: "bg-school-ink", bg: "bg-school-sand", text: "text-school-ink" },
};

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const style = CALLOUT[variant] ?? CALLOUT.note;
  return (
    <div className={`not-prose my-7 flex ${style.bg} border border-school-line`}>
      <div className={`w-[3px] shrink-0 ${style.bar}`} aria-hidden="true" />
      <div className="px-5 py-4">
        <p className={`font-mono text-[9.5px] tracking-[0.2em] uppercase mb-1.5 ${style.text}`}>
          {title ?? style.label}
        </p>
        <div className="font-serif text-[16px] leading-[1.7] text-school-body [&>p]:m-0 [&>p+p]:mt-3 [&>ul]:mt-2 [&>ul]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Steps ──────────────────────────────────────────────────────────────────

/**
 * A numbered walkthrough step. `id` gives the step a stable anchor so the
 * lesson's HowTo schema can deep-link to it (see `steps[].url` in frontmatter).
 */
export function Step({
  n,
  title,
  id,
  children,
}: {
  n: number;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  const anchor = id ?? `step-${n}`;
  return (
    <section id={anchor} className="not-prose my-6 flex gap-4 scroll-mt-24">
      <div className="shrink-0 flex flex-col items-center">
        <span className="flex items-center justify-center w-9 h-9 border border-school-navy bg-school-navy text-school-paper font-cond font-bold text-[16px]">
          {n}
        </span>
        <span className="flex-1 w-px bg-school-line mt-2" aria-hidden="true" />
      </div>
      <div className="pb-2 min-w-0">
        <h3 className="font-cond font-bold text-[19px] leading-[1.2] text-school-ink m-0">
          <a href={`#${anchor}`} className="no-underline hover:text-school-navy">
            {title}
          </a>
        </h3>
        <div className="mt-2 font-serif text-[16.5px] leading-[1.72] text-school-body [&>p]:m-0 [&>p+p]:mt-3">
          {children}
        </div>
      </div>
    </section>
  );
}

// ── Worked example ─────────────────────────────────────────────────────────

export function Example({
  title = "Worked example",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose my-8 border border-school-line2 bg-school-raised">
      <div className="px-5 py-2.5 border-b border-school-line bg-school-sand font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-muted">
        {title}
      </div>
      <div className="px-5 py-4 font-serif text-[16px] leading-[1.7] text-school-body [&>p]:m-0 [&>p+p]:mt-3 [&_table]:my-3">
        {children}
      </div>
    </div>
  );
}

/**
 * A journal-entry table — the canonical way to show a transaction hitting two
 * accounts. `entries` is [account, debit, credit].
 */
export function JournalEntry({
  caption,
  entries,
}: {
  caption?: string;
  entries: [string, string, string][];
}) {
  return (
    <div className="not-prose my-7">
      {caption && (
        <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-muted mb-2">
          {caption}
        </p>
      )}
      <table className="w-full border-collapse bg-school-raised border border-school-line">
        <thead>
          <tr>
            <th className="text-left font-body font-semibold text-[11px] tracking-[0.14em] uppercase text-school-muted px-4 py-2.5 border-b border-school-line bg-school-sand">
              Account
            </th>
            <th className="text-right font-body font-semibold text-[11px] tracking-[0.14em] uppercase text-school-muted px-4 py-2.5 border-b border-school-line bg-school-sand w-[110px]">
              Debit
            </th>
            <th className="text-right font-body font-semibold text-[11px] tracking-[0.14em] uppercase text-school-muted px-4 py-2.5 border-b border-school-line bg-school-sand w-[110px]">
              Credit
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([account, debit, credit], i) => (
            <tr key={i}>
              <td className="px-4 py-2.5 border-b border-school-line/70 font-body text-[14px] text-school-ink last:border-b-0">
                {account}
              </td>
              <td className="px-4 py-2.5 border-b border-school-line/70 font-mono text-[13px] text-right tabular-nums text-school-body">
                {debit}
              </td>
              <td className="px-4 py-2.5 border-b border-school-line/70 font-mono text-[13px] text-right tabular-nums text-school-body">
                {credit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A named formula with its plain-English reading underneath. */
export function Formula({
  name,
  expression,
  children,
}: {
  name?: string;
  expression: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="not-prose my-7 border border-school-line bg-school-ink text-school-paper px-5 py-4">
      {name && (
        <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-sun mb-2">
          {name}
        </p>
      )}
      <p className="font-mono text-[15px] leading-[1.6] text-[#EAE6D8]">{expression}</p>
      {children && (
        <div className="mt-3 pt-3 border-t border-white/10 font-body text-[13.5px] leading-[1.6] text-[#B7BCC5] [&>p]:m-0">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Checklist ──────────────────────────────────────────────────────────────

export function Checklist({
  title = "Checklist",
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className="not-prose my-8 border border-school-line bg-school-raised">
      <div className="px-5 py-2.5 border-b border-school-line bg-school-sand font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-muted">
        {title}
      </div>
      <ul className="px-5 py-4 flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-[3px] w-[15px] h-[15px] shrink-0 border border-school-line2 bg-school-paper"
              aria-hidden="true"
            />
            <span className="font-body text-[15px] leading-[1.6] text-school-body">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Side-by-side comparison — "what most owners do" vs "what to do instead". */
export function Compare({
  leftTitle = "Common approach",
  rightTitle = "Better approach",
  left,
  right,
}: {
  leftTitle?: string;
  rightTitle?: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="not-prose my-8 grid sm:grid-cols-2 border border-school-line bg-school-raised">
      <div className="p-5 border-b sm:border-b-0 sm:border-r border-school-line">
        <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-red mb-2">
          {leftTitle}
        </p>
        <div className="font-serif text-[15.5px] leading-[1.68] text-school-body [&>p]:m-0 [&>p+p]:mt-2">
          {left}
        </div>
      </div>
      <div className="p-5">
        <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-green mb-2">
          {rightTitle}
        </p>
        <div className="font-serif text-[15.5px] leading-[1.68] text-school-body [&>p]:m-0 [&>p+p]:mt-2">
          {right}
        </div>
      </div>
    </div>
  );
}

// ── Wrap-up ────────────────────────────────────────────────────────────────

export function Takeaways({ items }: { items: string[] }) {
  return (
    <div className="not-prose my-9 border-t-2 border-school-ink pt-5">
      <p className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-school-ink mb-3">
        What to remember
      </p>
      <ol className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="font-mono text-[11px] text-school-navy tabular-nums mt-[3px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-body text-[15.5px] leading-[1.6] text-school-body">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** In-lesson pointer to another lesson — the School's internal-link primitive. */
export function NextUp({ slug, label, children }: { slug: string; label?: string; children?: React.ReactNode }) {
  return (
    <Link
      href={schoolPaths.lesson(slug)}
      className="not-prose my-6 flex items-center gap-4 border border-school-line bg-school-wash px-5 py-4 no-underline group"
    >
      <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-navy shrink-0">
        {label ?? "Go deeper"}
      </span>
      <span className="font-cond font-semibold text-[16px] leading-[1.25] text-school-ink group-hover:text-school-navy transition-colors duration-150">
        {children}
      </span>
      <span className="ml-auto text-school-navy" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

/** Bridge from a lesson to the firm. Used sparingly — the School teaches first. */
export function ServiceNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-9 border border-dashed border-school-line2 bg-school-sand px-5 py-4">
      <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-faint mb-2">
        If you would rather not do this yourself
      </p>
      <div className="font-body text-[14px] leading-[1.65] text-school-body [&>p]:m-0 [&_a]:text-school-navy [&_a]:underline">
        {children}
      </div>
    </aside>
  );
}

/**
 * Hands a reader off to The Carryforward when a lesson brushes up against
 * specialty tax. Use it exactly where our scope ends and theirs begins — a
 * lesson on capitalizing R&D costs, say — so the pointer reads as helpful
 * rather than promotional. `children` is the one-line reason to follow it.
 */
export function CarryforwardNote({
  topic,
  href,
  children,
}: {
  /** Short label for what they cover on this, e.g. "Section 174". */
  topic?: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="not-prose my-8 border-l-[3px] border-school-ink bg-school-sand px-5 py-4">
      <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-muted mb-1.5">
        Companion reference · {carryforward.name}
      </p>
      <div className="font-body text-[15px] leading-[1.65] text-school-body [&>p]:m-0">
        {children}
      </div>
      <a
        href={href ?? carryforward.url}
        target="_blank"
        rel="noopener"
        className="mt-2.5 inline-flex items-center gap-1.5 font-cond font-semibold text-[13.5px] text-school-navy hover:text-school-navy2 transition-colors duration-150"
      >
        {topic ? `${topic} on ${carryforward.name}` : `Read it on ${carryforward.name}`} ↗
      </a>
    </aside>
  );
}

/** Wraps a wide markdown table so it scrolls instead of breaking the layout. */
export function TableScroll({ children }: { children: React.ReactNode }) {
  return <div className="table-scroll not-prose my-7">{children}</div>;
}

/** In-lesson table of contents. `items` is [{ id, label }]. */
export function Contents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="not-prose my-8 border border-school-line bg-school-raised px-5 py-4">
      <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-muted mb-3">
        On this page
      </p>
      <ol className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] text-school-faint tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${item.id}`}
              className="font-body text-[14.5px] leading-[1.5] text-school-body hover:text-school-navy transition-colors duration-150"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The map handed to MDXRemote — every lesson gets all of these for free. */
export const schoolMdxComponents = {
  Callout,
  CarryforwardNote,
  Checklist,
  Compare,
  Contents,
  Example,
  Formula,
  JournalEntry,
  KeyTerm,
  NextUp,
  QuickAnswer,
  ServiceNote,
  Step,
  TableScroll,
  Takeaways,
};
