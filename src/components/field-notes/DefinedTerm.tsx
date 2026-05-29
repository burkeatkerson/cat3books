import type { ReactNode } from "react";

interface DefinedTermProps {
  /**
   * The primary term name — abbreviation if the term has one (e.g., "ACV"),
   * or the full name if there is no abbreviation (e.g., "Depreciation").
   */
  term: string;
  /**
   * Full name when `term` is an abbreviation.
   * e.g., term="ACV" fullName="Actual Cash Value"
   */
  fullName?: string;
  /**
   * Optional plain-text summary for the schema.org DefinedTerm description.
   * Keep to 1–2 sentences. If omitted, the schema omits the description field.
   */
  summary?: string;
  /**
   * Comma-separated list of related terms that appear in this glossary.
   * Rendered as "See also:" cross-reference links.
   * e.g., seeAlso="RCV, Depreciation, Holdback"
   */
  seeAlso?: string;
  /** Full definition — rendered as children. Supports MDX/JSX. */
  children: ReactNode;
}

/** Convert a term name to a URL-safe anchor id. */
function toId(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Renders a single glossary term as a visually distinct definition card with:
 * - A URL anchor for deep-linking (href="#term-id")
 * - A yellow term name header
 * - The full definition as children
 * - Optional "See also" cross-references
 * - An inline schema.org DefinedTerm JSON-LD block for AI indexing
 */
export default function DefinedTerm({
  term,
  fullName,
  summary,
  seeAlso,
  children,
}: DefinedTermProps) {
  const id = toId(term);
  const displayName = fullName ? `${term} — ${fullName}` : term;

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: fullName ?? term,
    ...(term !== fullName && fullName ? { termCode: term } : {}),
    ...(summary ? { description: summary } : {}),
  };

  return (
    <div id={id} className="not-prose border-l-2 border-c3-border pl-5 py-1 my-6 scroll-mt-20">
      {/* Anchor target */}
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-[13px] font-semibold text-c3-yellow tracking-wide">
          {displayName}
        </span>
        <a
          href={`#${id}`}
          aria-label={`Permalink to ${term}`}
          className="font-mono text-[9px] text-c3-dim hover:text-c3-yellow transition-colors"
        >
          #
        </a>
      </div>

      {/* Definition body */}
      <div className="font-body font-light text-[15px] text-c3-text leading-relaxed space-y-2">
        {children}
      </div>

      {/* See also */}
      {seeAlso && (
        <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-c3-dim mt-3">
          See also:{" "}
          {seeAlso.split(",").map((t, i, arr) => {
            const label = t.trim();
            return (
              <span key={label}>
                <a
                  href={`#${toId(label)}`}
                  className="text-c3-mid hover:text-c3-yellow transition-colors"
                >
                  {label}
                </a>
                {i < arr.length - 1 && ", "}
              </span>
            );
          })}
        </p>
      )}

      {/* Inline DefinedTerm schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
