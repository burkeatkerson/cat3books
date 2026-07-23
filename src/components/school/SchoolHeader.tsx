"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SchoolContainer from "./SchoolContainer";
import { SUBJECTS, schoolPaths } from "@/lib/school/taxonomy";

const navLinks = [
  { label: "All Lessons", href: schoolPaths.library },
  { label: "Courses", href: schoolPaths.courses },
];

/**
 * The School's own header. Intentionally shares nothing with SiteHeader beyond
 * the wordmark — light, taller, search-first, with a subject drawer. The one
 * link back to cat3books.com sits on the far right so the School reads as a
 * separate property rather than a page of the marketing site.
 */
export default function SchoolHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? schoolPaths.filtered({ q }) : schoolPaths.library);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-school-paper/95 backdrop-blur-[10px] border-b border-school-line">
      <SchoolContainer className="flex items-center gap-5 h-[72px]">
        {/* Wordmark */}
        <Link
          href={schoolPaths.home}
          className="flex items-center gap-3 shrink-0 group"
          onClick={() => setMenuOpen(false)}
        >
          <span className="inline-flex items-baseline font-disp text-[19px] tracking-[0.04em] leading-none text-school-ink">
            CAT
            <span className="inline-flex items-center justify-center bg-school-sun text-[#111] w-[17px] h-[17px] text-[15px] mx-0.5 translate-y-0.5">
              3
            </span>
          </span>
          <span className="hidden sm:block h-6 w-px bg-school-line2" />
          <span className="hidden sm:block font-cond font-semibold text-[13px] leading-[1.15] tracking-[0.04em] uppercase text-school-ink group-hover:text-school-navy transition-colors duration-150">
            Small Business
            <br />
            <span className="text-school-navy group-hover:text-school-ink">Bookkeeping School</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label="School">
          <button
            onClick={() => setSubjectsOpen((v) => !v)}
            aria-expanded={subjectsOpen}
            className="inline-flex items-center gap-1.5 px-3 py-2 font-cond font-semibold text-[13px] tracking-[0.06em] uppercase text-school-body hover:text-school-navy transition-colors duration-150 cursor-pointer"
          >
            Subjects
            <span className={`text-[9px] transition-transform duration-200 ${subjectsOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 font-cond font-semibold text-[13px] tracking-[0.06em] uppercase text-school-body hover:text-school-navy transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={submitSearch} className="hidden md:flex ml-auto items-center" role="search">
          <label htmlFor="school-search" className="sr-only">
            Search lessons
          </label>
          <input
            id="school-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons…"
            className="w-[190px] lg:w-[230px] bg-school-raised border border-school-line2 px-3 py-2 font-body text-[13px] text-school-ink placeholder:text-school-faint focus:outline-none focus:border-school-navy transition-colors duration-150"
          />
          <button
            type="submit"
            className="border border-l-0 border-school-line2 px-3 py-2 font-mono text-[11px] text-school-muted hover:text-school-navy hover:border-school-navy transition-colors duration-150 cursor-pointer"
            aria-label="Search"
          >
            ↵
          </button>
        </form>

        {/* Back to the firm */}
        <Link
          href="/"
          className="hidden xl:inline-flex items-center gap-1.5 ml-3 font-mono text-[10px] tracking-[0.14em] uppercase text-school-faint hover:text-school-navy transition-colors duration-150 whitespace-nowrap"
        >
          Cat3 Books ↗
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-auto flex flex-col justify-center items-center gap-[5px] w-11 h-11 shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="school-mobile-nav"
        >
          <span className={`block w-6 h-[2px] bg-school-ink transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-school-ink transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-school-ink transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </SchoolContainer>

      {/* Desktop subject drawer */}
      {subjectsOpen && (
        <div className="hidden lg:block border-t border-school-line bg-school-raised shadow-[0_18px_40px_-24px_rgba(20,22,26,0.35)]">
          <SchoolContainer className="py-7">
            <div className="grid grid-cols-4 gap-x-8 gap-y-5">
              {SUBJECTS.map((s) => (
                <Link
                  key={s.key}
                  href={schoolPaths.subject(s.key)}
                  onClick={() => setSubjectsOpen(false)}
                  className="group"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-school-faint">{s.code}</span>
                    <span className="font-cond font-semibold text-[15px] uppercase tracking-[0.03em] text-school-ink group-hover:text-school-navy transition-colors duration-150">
                      {s.label}
                    </span>
                  </div>
                  <p className="mt-1 font-body text-[12.5px] leading-[1.5] text-school-muted">
                    {s.blurb}
                  </p>
                </Link>
              ))}
            </div>
          </SchoolContainer>
        </div>
      )}

      {/* Mobile drawer */}
      {menuOpen && (
        <div id="school-mobile-nav" className="lg:hidden border-t border-school-line bg-school-raised">
          <SchoolContainer className="py-5">
            <form onSubmit={submitSearch} className="flex mb-5" role="search">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons…"
                aria-label="Search lessons"
                className="flex-1 bg-school-paper border border-school-line2 px-3 py-3 font-body text-[15px] text-school-ink placeholder:text-school-faint focus:outline-none focus:border-school-navy"
              />
              <button
                type="submit"
                className="bg-school-navy text-school-paper px-4 font-cond font-bold text-[12px] tracking-[0.08em] uppercase"
              >
                Go
              </button>
            </form>

            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 border-b border-school-line font-cond font-semibold text-[15px] tracking-[0.05em] uppercase text-school-ink"
              >
                {label}
              </Link>
            ))}

            <div className="pt-5 pb-2 font-mono text-[10px] tracking-[0.2em] uppercase text-school-faint">
              Subjects
            </div>
            {SUBJECTS.map((s) => (
              <Link
                key={s.key}
                href={schoolPaths.subject(s.key)}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-2 py-2.5 border-b border-school-line last:border-b-0"
              >
                <span className="font-mono text-[10px] text-school-faint">{s.code}</span>
                <span className="font-body text-[15px] text-school-body">{s.label}</span>
              </Link>
            ))}

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block mt-5 font-mono text-[10px] tracking-[0.14em] uppercase text-school-faint"
            >
              ← Back to Cat3 Books
            </Link>
          </SchoolContainer>
        </div>
      )}
    </header>
  );
}
