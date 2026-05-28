"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/field-notes";
import CategoryBar from "./CategoryBar";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";
import Container from "@/components/Container";

interface Props {
  featured: PostMeta | undefined;
  gridPosts: PostMeta[];
}

export default function FilteredPostSection({ featured, gridPosts }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return gridPosts.filter((post) => {
      const catMatch =
        activeCategory === "all" || post.category === activeCategory;
      const q = search.toLowerCase();
      const searchMatch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.categoryLabel.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [gridPosts, activeCategory, search]);

  const featuredVisible =
    featured &&
    (activeCategory === "all" || featured.category === activeCategory) &&
    (!search ||
      featured.title.toLowerCase().includes(search.toLowerCase()) ||
      featured.excerpt.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <CategoryBar
        active={activeCategory}
        search={search}
        onCategory={setActiveCategory}
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
              {filtered.length} of 128 in archive
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[2px] bg-c3-border">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="font-body text-[15px] text-c3-dim py-16 text-center">
              No posts match that filter.
            </p>
          )}

          <div className="flex justify-center mt-12">
            <Link
              href="#"
              className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
            >
              Load older lessons →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
