import Link from "next/link";
import type { PostMeta } from "@/lib/field-notes";
import PostCover from "./PostCover";

interface Props {
  post: PostMeta;
}

export default function FeaturedPost({ post }: Props) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] border border-c3-border bg-c3-card mt-6">
      {/* Cover */}
      <div className="relative min-h-[320px] md:min-h-[440px] border-b md:border-b-0 md:border-r border-c3-border">
        <PostCover
          coverStyle={post.coverStyle}
          coverGlyph={post.coverGlyph}
          coverSub={post.coverSub}
          issueNumber={post.issueNumber}
          categoryLabel={post.categoryLabel}
          className="absolute inset-0 h-full"
        />
      </div>

      {/* Meta */}
      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-[48px_44px]">
        <div className="flex items-center gap-[10px] mb-[18px]">
          <span className="font-mono text-[9px] tracking-[0.24em] uppercase bg-c3-yellow text-[#111] py-[5px] px-[8px]">
            ★ Featured
          </span>
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
            {post.categoryLabel}
          </span>
        </div>

        <h2 className="font-cond font-bold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[0.005em] text-c3-text">
          <Link
            href={`/field-notes/${post.slug}`}
            className="hover:text-c3-yellow transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h2>

        <p className="font-body font-light text-[15px] text-c3-mid mt-4 leading-[1.7] max-w-[560px]">
          {post.excerpt}
        </p>

        <div className="mt-7 pt-[18px] border-t border-dashed border-c3-border flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 border border-c3-yellow text-c3-yellow flex items-center justify-center font-disp text-[14px] tracking-[0.02em]">
              {(post.author ?? "C3").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="font-mono text-[10px] tracking-[0.16em] text-c3-mid uppercase leading-[1.5]">
              <span className="text-c3-text">{post.author ?? "Cat3 Books"}</span>
              <br />
              {post.readTime} read
            </div>
          </div>

          <Link
            href={`/field-notes/${post.slug}`}
            className="inline-flex items-center gap-2 font-cond font-bold text-[12px] tracking-[0.10em] uppercase px-[18px] py-[10px] bg-c3-yellow text-[#111] hover:bg-[#FFD000] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
          >
            Read the breakdown →
          </Link>
        </div>
      </div>
    </article>
  );
}
