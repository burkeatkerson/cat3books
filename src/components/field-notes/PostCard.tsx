import Link from "next/link";
import type { PostMeta } from "@/lib/field-notes";
import PostCover from "./PostCover";

interface Props {
  post: PostMeta;
}

export default function PostCard({ post }: Props) {
  return (
    <article className="group bg-c3-card flex flex-col hover:bg-[rgba(255,255,255,0.02)] transition-all duration-[220ms]">
      {/* Cover */}
      <div className="relative h-[200px] border-b border-c3-border shrink-0">
        <PostCover
          coverStyle={post.coverStyle}
          coverGlyph={post.coverGlyph}
          coverSub={post.coverSub}
          issueNumber={post.issueNumber}
          categoryLabel={post.categoryLabel}
          className="absolute inset-0 h-full"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 gap-3 p-6">
        <div className="font-mono text-[9px] tracking-[0.24em] uppercase text-c3-yellow">
          {post.categoryLabel}
        </div>

        <h3 className="font-cond font-bold text-[21px] leading-[1.15] tracking-[0.005em] text-c3-text">
          <Link
            href={`/field-notes/${post.slug}`}
            className="group-hover:text-c3-yellow transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>

        <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.65]">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-dashed border-c3-border flex justify-between items-center font-mono text-[10px] tracking-[0.14em] text-c3-dim uppercase">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            {" · "}
            {post.readTime}
          </span>
          <span className="font-disp text-[16px] leading-none text-c3-yellow">→</span>
        </div>
      </div>
    </article>
  );
}
