"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/field-notes";
import CategoryBar, { THEMES, CATEGORIES, matchesFilter } from "./CategoryBar";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";
import Container from "@/components/Container";

interface Props {
  featured: PostMeta | undefined;
  gridPosts: PostMeta[];
}

const VALID_KEYS = new Set<string>([
  "all",
  ...THEMES.map((t) => t.key),
  ...CATEGORIES.map((c) => c.key),
]);

export default function FilteredPostSection({ featured, gridPosts }: Props) {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);

  // Every post (featured + grid) — used for counts and the archive total.
  const allPosts = useMemo(
    () => (featured ? [featured, ...gridPosts] : gridPosts),
    [featured, gridPosts]
  );

  // Per-category counts for the filter bar.
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of allPosts) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [allPosts]);

  // Initialize filter state from the URL once, after mount (avoids hydration
  // mismatch — server always renders the unfiltered default).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const cat = sp.get("cat");
    const q = sp.get("q");
    if (cat && VALID_KEYS.has(cat)) setActive(cat);
    if (q) setSearch(q);
    setReady(true);
  }, []);

  // Keep the URL in sync with the filter so views are shareable / back-able.
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

  const matches = (post: PostMeta) => {
    const q = search.trim().toLowerCase();
    const searchMatch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.categoryLabel.toLowerCase().includes(q);
    return matchesFilter(post.category, active) && searchMatch;
  };

  const filtered = useMemo(
    () => gridPosts.filter(matches),
    [gridPosts, active, search]
  );

  const featuredVisible = featured && matches(featured);
  const resultCount = filtered.length + (featuredVisible ? 1 : 0);

  return (
    <>
      <CategoryBar
        active={active}
        search={search}
        counts={counts}
        total={allPosts.length}
        resultCount={resultCount}
        onSelect={setActive}
        onSearch={setSearch}
      />

      {/* Featured post */}
      {featuredVisible && (
        <section className="relative py-10 xl:py-14 border-b border-c3-border">
          <Container>
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow inline-flex items-center gap-3 mb-1">
              <span className="w-7 h-px bg-c3-yellow" />
              This Week&rsquo;s Cover
            </div>
            <FeaturedPost post={featured} />
          </Container>
        </section>
      )}

      {/* Post grid */}
      <section className="relative py-12 xl:py-[88px] bg-c3-dark">
        <Container>
          <div className="flex justify-between items-end gap-6 mb-8 flex-wrap">
            <h2 className="font-disp text-[48px] leading-none tracking-[0.025em]">
              Latest <span className="text-c3-yellow">lessons.</span>
            </h2>
            <span className="font-mono text-[10px] tracking-[0.22em] text-c3-dim uppercase">
              {resultCount} of {allPosts.length} in archive
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[2px] bg-c3-border">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="font-body text-[15px] text-c3-dim">
                No posts match that filter.
              </p>
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
    </>
  );
}
