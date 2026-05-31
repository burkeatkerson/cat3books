"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import type { PostMeta } from "@/lib/field-notes";
import CategoryBar from "./CategoryBar";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";
import Container from "@/components/Container";
import { THEMES, CATEGORIES, matchesFilter } from "@/lib/field-notes-taxonomy";

/** A cover-art background class per theme, for the "Browse by topic" tiles. */
const THEME_COVER: Record<string, string> = {
  "t-profit": "cv-glow",
  "t-ops": "cv-grid",
  "t-people": "cv-vert",
  "t-software": "cv-dots",
  "t-industry": "cv-stripe",
  "t-reference": "cv-tape",
};

const VALID_KEYS = new Set<string>([
  "all",
  ...THEMES.map((t) => t.key),
  ...CATEGORIES.map((c) => c.key),
]);

const byPriorityThenDate = (a: PostMeta, b: PostMeta) =>
  (b.priority ?? 0.7) - (a.priority ?? 0.7) ||
  new Date(b.date).getTime() - new Date(a.date).getTime();

interface Props {
  featured: PostMeta;
  posts: PostMeta[];
}

export default function FieldNotesIndex({ featured, posts }: Props) {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);

  // Initialize from the URL once (after mount — avoids hydration mismatch).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const cat = sp.get("cat");
    const q = sp.get("q");
    if (cat && VALID_KEYS.has(cat)) setActive(cat);
    if (q) setSearch(q);
    setReady(true);
  }, []);

  // Keep the URL in sync so filtered views are shareable / back-able.
  useEffect(() => {
    if (!ready) return;
    const sp = new URLSearchParams();
    if (active !== "all") sp.set("cat", active);
    if (search.trim()) sp.set("q", search.trim());
    const qs = sp.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    );
  }, [active, search, ready]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of posts) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [posts]);

  const matches = useCallback(
    (post: PostMeta) => {
      const q = search.trim().toLowerCase();
      const searchMatch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.categoryLabel.toLowerCase().includes(q);
      return matchesFilter(post.category, active) && searchMatch;
    },
    [active, search]
  );

  const filtered = useMemo(() => posts.filter(matches), [posts, matches]);

  // Series sections: each theme with its standout posts (featured excluded).
  const sections = useMemo(() => {
    return THEMES.map((t) => {
      const themePosts = posts
        .filter((p) => t.cats.includes(p.category))
        .sort(byPriorityThenDate);
      const count = themePosts.length;
      const cards = themePosts.filter((p) => p.slug !== featured.slug).slice(0, 3);
      return { ...t, count, cards };
    }).filter((s) => s.cards.length > 0);
  }, [posts, featured.slug]);

  const isFiltered = active !== "all" || search.trim() !== "";

  return (
    <>
      <CategoryBar
        active={active}
        search={search}
        counts={counts}
        total={posts.length}
        resultCount={filtered.length}
        onSelect={setActive}
        onSearch={setSearch}
      />

      {isFiltered ? (
        /* ── Filtered / search view ─────────────────────────────────── */
        <section className="relative py-12 xl:py-[72px] bg-c3-dark">
          <Container>
            <div className="flex justify-between items-end gap-6 mb-8 flex-wrap">
              <h2 className="font-disp text-[clamp(34px,5vw,48px)] leading-none tracking-[0.025em]">
                {filtered.length} {filtered.length === 1 ? "post" : "posts"}
                <span className="text-c3-yellow">.</span>
              </h2>
              <button
                onClick={() => {
                  setActive("all");
                  setSearch("");
                }}
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-c3-mid hover:text-c3-yellow transition-colors duration-200 cursor-pointer"
              >
                ← Back to all topics
              </button>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[2px] bg-c3-border">
                {filtered.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="font-body text-[15px] text-c3-dim">No posts match that filter.</p>
                <button
                  onClick={() => {
                    setActive("all");
                    setSearch("");
                  }}
                  className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] uppercase text-c3-mid hover:text-c3-yellow transition-colors duration-200 cursor-pointer"
                >
                  ✕ Clear filters
                </button>
              </div>
            )}
          </Container>
        </section>
      ) : (
        /* ── Curated hub ────────────────────────────────────────────── */
        <>
          {/* Featured pillar */}
          <section className="relative py-10 xl:py-14 border-b border-c3-border">
            <Container>
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow inline-flex items-center gap-3 mb-2">
                <span className="w-7 h-px bg-c3-yellow" />
                This Week&rsquo;s Cover
              </div>
              <p className="font-cond font-light text-[clamp(16px,2vw,19px)] text-c3-mid max-w-[640px] leading-[1.45]">
                Short on time? Start here — the one breakdown most worth your next ten minutes.
              </p>
              <FeaturedPost post={featured} />
            </Container>
          </section>

          {/* Browse by topic — theme tiles */}
          <section className="relative py-12 xl:py-[72px] bg-c3-dark border-b border-c3-border">
            <Container>
              <div className="flex justify-between items-end gap-6 mb-3 flex-wrap">
                <h2 className="font-disp text-[clamp(34px,5vw,48px)] leading-none tracking-[0.025em]">
                  Browse by <span className="text-c3-yellow">topic.</span>
                </h2>
                <span className="font-mono text-[10px] tracking-[0.22em] text-c3-dim uppercase">
                  {posts.length} posts · {THEMES.length} topics
                </span>
              </div>
              <p className="font-cond font-light text-[clamp(16px,2vw,19px)] text-c3-mid max-w-[680px] leading-[1.45] mb-8">
                Six tracks, one question each. Pick the problem you&rsquo;re trying to solve right now — each tile says what you&rsquo;ll walk away knowing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-c3-border">
                {THEMES.map((t) => {
                  const count = t.cats.reduce((n, c) => n + (counts[c] ?? 0), 0);
                  return (
                    <button
                      key={t.key}
                      onClick={() => setActive(t.key)}
                      className="group relative min-h-[176px] overflow-hidden bg-c3-card text-left cursor-pointer p-5 flex flex-col"
                    >
                      <div className={`absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-300 ${THEME_COVER[t.key] ?? "cv-grid"}`} />
                      <div className="absolute inset-0 bg-gradient-to-tr from-c3-card via-c3-card/85 to-c3-card/55" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-disp text-[20px] leading-[1.0] tracking-[0.02em] text-c3-text group-hover:text-c3-yellow transition-colors duration-200 uppercase">
                            {t.label}
                          </span>
                          <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-c3-dim shrink-0">
                            {count}
                          </span>
                        </div>
                        <p className="font-body font-light text-[12.5px] text-c3-mid leading-[1.55] mt-3 flex-1">
                          {t.blurb}
                        </p>
                        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-yellow mt-3 group-hover:translate-x-0.5 transition-transform duration-200">
                          Explore {count} posts →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Container>
          </section>

          {/* One section per series */}
          {sections.map((s) => (
            <section key={s.key} className="relative py-10 xl:py-14 border-b border-c3-border last:border-b-0">
              <Container>
                <div className="flex justify-between items-end gap-6 mb-6 flex-wrap">
                  <div className="max-w-[620px]">
                    <div className="font-mono text-[10px] tracking-[0.26em] uppercase text-c3-yellow mb-2">
                      Series
                    </div>
                    <h3 className="font-disp text-[clamp(26px,3.5vw,38px)] leading-none tracking-[0.025em]">
                      {s.label}
                      <span className="font-mono text-[12px] tracking-[0.14em] text-c3-dim ml-3 align-middle">
                        {s.count} posts
                      </span>
                    </h3>
                    <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.6] mt-3">
                      {s.blurb}
                    </p>
                  </div>
                  <button
                    onClick={() => setActive(s.key)}
                    className="inline-flex items-center gap-2 font-cond font-bold text-[12px] tracking-[0.10em] uppercase px-[16px] py-[10px] border border-c3-b2 text-c3-mid hover:border-c3-yellow hover:text-c3-yellow transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    View all {s.count} →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[2px] bg-c3-border">
                  {s.cards.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </Container>
            </section>
          ))}
        </>
      )}
    </>
  );
}
