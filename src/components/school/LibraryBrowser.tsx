"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { SearchRecord } from "@/lib/school/lessons";
import {
  LESSON_TYPES,
  LEVELS,
  SUBJECTS,
  SUBJECT_BY_KEY,
  schoolPaths,
} from "@/lib/school/taxonomy";

/** Results rendered per page. The rest load on demand. */
const PAGE_SIZE = 24;

type Facet = "subject" | "level" | "type";

interface Props {
  records: SearchRecord[];
  /** Server-parsed initial state from the query string. */
  initial?: { q?: string; subject?: string; level?: string; type?: string };
}

/**
 * The School's library: search + faceted filtering over every lesson.
 *
 * Scale notes — this is the one component that has to survive several hundred
 * lessons in the browser:
 *   • it receives the compact `SearchRecord` shape (~150 bytes/lesson), not
 *     full metadata, so a 500-lesson index is well under a 100 KB payload;
 *   • matching is a single linear scan over pre-lowercased haystacks built once
 *     per index, not per keystroke;
 *   • only PAGE_SIZE results mount at a time.
 * If the library ever outgrows client-side search, the same `SearchRecord`
 * shape is what a server search endpoint would return — nothing else changes.
 */
export default function LibraryBrowser({ records, initial }: Props) {
  const [query, setQuery] = useState(initial?.q ?? "");
  const [subject, setSubject] = useState(initial?.subject ?? "");
  const [level, setLevel] = useState(initial?.level ?? "");
  const [type, setType] = useState(initial?.type ?? "");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Pre-lowercase every searchable field once, keyed by array position.
  const haystacks = useMemo(
    () =>
      records.map((r) =>
        `${r.t} ${r.e} ${r.q ?? ""} ${r.g.join(" ")} ${SUBJECT_BY_KEY[r.u]?.label ?? ""}`.toLowerCase()
      ),
    [records]
  );

  const terms = useMemo(
    () => query.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query]
  );

  const results = useMemo(() => {
    const out: SearchRecord[] = [];
    for (let i = 0; i < records.length; i++) {
      const r = records[i];
      if (subject && r.u !== subject) continue;
      if (level && r.l !== level) continue;
      if (type && r.y !== type) continue;
      if (terms.length && !terms.every((t) => haystacks[i].includes(t))) continue;
      out.push(r);
    }
    // With an active query, exact title hits float to the top.
    if (terms.length) {
      const first = terms[0];
      out.sort(
        (a, b) =>
          Number(b.t.toLowerCase().includes(first)) - Number(a.t.toLowerCase().includes(first))
      );
    }
    return out;
  }, [records, haystacks, terms, subject, level, type]);

  // Any change to the criteria collapses back to the first page.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, subject, level, type]);

  // Keep the URL shareable and back-navigable.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (query.trim()) sp.set("q", query.trim());
    if (subject) sp.set("subject", subject);
    if (level) sp.set("level", level);
    if (type) sp.set("type", type);
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [query, subject, level, type]);

  const setFacet = useCallback((facet: Facet, value: string) => {
    const setter = { subject: setSubject, level: setLevel, type: setType }[facet];
    setter((current) => (current === value ? "" : value));
  }, []);

  const clearAll = () => {
    setQuery("");
    setSubject("");
    setLevel("");
    setType("");
  };

  const isFiltered = Boolean(query.trim() || subject || level || type);

  // Counts reflect the *other* active facets, so the numbers never lie.
  const subjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (let i = 0; i < records.length; i++) {
      const r = records[i];
      if (level && r.l !== level) continue;
      if (type && r.y !== type) continue;
      if (terms.length && !terms.every((t) => haystacks[i].includes(t))) continue;
      counts[r.u] = (counts[r.u] ?? 0) + 1;
    }
    return counts;
  }, [records, haystacks, terms, level, type]);

  return (
    <div className="grid lg:grid-cols-[232px_1fr] gap-8 lg:gap-12">
      {/* ── Facets ──────────────────────────────────────────────────────── */}
      <aside className="lg:sticky lg:top-[96px] lg:self-start">
        <FacetGroup label="Subject">
          {SUBJECTS.map((s) => (
            <FacetButton
              key={s.key}
              active={subject === s.key}
              count={subjectCounts[s.key] ?? 0}
              onClick={() => setFacet("subject", s.key)}
            >
              {s.short}
            </FacetButton>
          ))}
        </FacetGroup>

        <FacetGroup label="Level">
          {LEVELS.map((l) => (
            <FacetButton key={l.key} active={level === l.key} onClick={() => setFacet("level", l.key)}>
              {l.label}
            </FacetButton>
          ))}
        </FacetGroup>

        <FacetGroup label="Format">
          {LESSON_TYPES.map((t) => (
            <FacetButton key={t.key} active={type === t.key} onClick={() => setFacet("type", t.key)}>
              {t.label}
            </FacetButton>
          ))}
        </FacetGroup>

        {isFiltered && (
          <button
            onClick={clearAll}
            className="mt-2 font-mono text-[10px] tracking-[0.16em] uppercase text-school-muted hover:text-school-red transition-colors duration-150 cursor-pointer"
          >
            ✕ Clear all
          </button>
        )}
      </aside>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-0 mb-6">
          <label htmlFor="library-search" className="sr-only">
            Search lessons
          </label>
          <input
            id="library-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by problem, term, or question — e.g. “undeposited funds”"
            className="flex-1 bg-school-raised border border-school-line2 px-4 py-3 font-body text-[15px] text-school-ink placeholder:text-school-faint focus:outline-none focus:border-school-navy transition-colors duration-150"
          />
        </div>

        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-5 pb-3 border-b border-school-line">
          <p className="font-cond font-semibold text-[17px] text-school-ink">
            {results.length} {results.length === 1 ? "lesson" : "lessons"}
            {isFiltered && (
              <span className="text-school-muted font-normal">
                {results.length === 1 ? " matches" : " match"} your filters
              </span>
            )}
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-school-faint">
            Showing {Math.min(visible, results.length)} of {results.length}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-school-line2 bg-school-raised">
            <p className="font-cond font-semibold text-[18px] text-school-ink">
              Nothing matches that yet.
            </p>
            <p className="mt-2 font-body text-[14px] text-school-muted max-w-[420px] mx-auto">
              Try a shorter phrase, or clear a filter. The School is growing every week —
              if a topic is missing, it is probably next.
            </p>
            <button
              onClick={clearAll}
              className="mt-5 font-mono text-[10px] tracking-[0.16em] uppercase text-school-navy hover:text-school-navy2 transition-colors duration-150 cursor-pointer"
            >
              ✕ Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              {results.slice(0, visible).map((r) => (
                <ResultCard key={r.s} record={r} />
              ))}
            </div>

            {visible < results.length && (
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="mt-8 w-full border border-school-line2 bg-school-raised py-4 font-cond font-bold text-[13px] tracking-[0.08em] uppercase text-school-navy hover:border-school-navy hover:bg-school-wash transition-colors duration-150 cursor-pointer"
              >
                Load {Math.min(PAGE_SIZE, results.length - visible)} more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Pieces ─────────────────────────────────────────────────────────────────

function FacetGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-school-navy mb-3">
        {label}
      </h2>
      <div className="flex flex-wrap lg:flex-col gap-1.5">{children}</div>
    </div>
  );
}

function FacetButton({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count?: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-between gap-2 px-2.5 py-1.5 text-left font-body text-[13.5px] border transition-colors duration-150 cursor-pointer ${
        active
          ? "border-school-navy bg-school-navy text-school-paper"
          : "border-transparent text-school-body hover:bg-school-wash hover:border-school-line2"
      }`}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span
          className={`font-mono text-[10px] tabular-nums ${
            active ? "text-school-paper/70" : "text-school-faint"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function ResultCard({ record }: { record: SearchRecord }) {
  const subject = SUBJECT_BY_KEY[record.u];
  return (
    <Link
      href={schoolPaths.lesson(record.s)}
      className="group flex flex-col bg-school-raised border border-school-line hover:border-school-navy/45 transition-colors duration-200 p-4"
    >
      <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-school-faint">
        {subject?.code} · {subject?.short}
      </span>
      <h3 className="mt-1.5 font-cond font-semibold text-[17.5px] leading-[1.2] text-school-ink group-hover:text-school-navy transition-colors duration-150">
        {record.t}
      </h3>
      <p className="mt-1.5 font-body text-[13px] leading-[1.55] text-school-muted flex-1">
        {record.e}
      </p>
      <span className="mt-3 font-mono text-[9.5px] tracking-[0.14em] uppercase text-school-faint">
        {record.r} read
      </span>
    </Link>
  );
}
