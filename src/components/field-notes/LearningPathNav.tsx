import Link from "next/link";
import { getAllPosts } from "@/lib/field-notes";
import type { LearningPath } from "@/lib/learning-paths";

function titleFor(slug: string): string {
  const post = getAllPosts().find((p) => p.slug === slug);
  return post?.title ?? slug;
}

/** Slim banner at the top of a post that belongs to a course. */
export function PathBanner({ path, index }: { path: LearningPath; index: number }) {
  const total = path.steps.length;
  const pct = Math.round(((index + 1) / total) * 100);
  return (
    <Link
      href={`/learn/${path.id}`}
      className="group not-prose block border border-c3-border bg-c3-card hover:border-c3-yellow transition-colors duration-200 px-5 py-4 mb-10"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="font-mono text-[9px] tracking-[0.24em] uppercase text-c3-yellow">
          ◆ {path.title}
        </div>
        <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim group-hover:text-c3-mid transition-colors duration-200">
          Lesson {index + 1} of {total} · view the full course →
        </div>
      </div>
      <div className="mt-3 h-[3px] bg-c3-b2 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-c3-yellow" style={{ width: `${pct}%` }} />
      </div>
    </Link>
  );
}

/** "Next lesson" card after the article (or a completion CTA on the last lesson). */
export function PathNext({ path, index }: { path: LearningPath; index: number }) {
  const total = path.steps.length;
  const isLast = index >= total - 1;

  if (isLast) {
    return (
      <div className="not-prose my-12 border border-c3-yellow bg-[rgba(240,190,0,0.04)] px-7 py-7">
        <div className="font-mono text-[9px] tracking-[0.24em] uppercase text-c3-yellow mb-2">
          ◆ {path.title} · Complete
        </div>
        <p className="font-disp text-[clamp(22px,3vw,30px)] leading-[1.05] tracking-[0.02em] text-c3-text mb-3">
          You&rsquo;ve finished the course.
        </p>
        <p className="font-body font-light text-[14.5px] text-c3-mid leading-[1.7] max-w-[620px] mb-6">
          You now know how to read your numbers, where the money leaks, and which
          levers move your margin. Want us to run this on your actual books? We&rsquo;ll
          find three specific leaks in 30 minutes — no pitch.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 bg-c3-yellow text-[#111] hover:bg-[#FFD000] hover:-translate-y-0.5 transition-all duration-[220ms]"
          >
            Free Books Audit →
          </Link>
          <Link
            href={`/learn/${path.id}`}
            className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 border border-c3-b2 text-c3-mid hover:border-c3-yellow hover:text-c3-yellow transition-all duration-200"
          >
            Revisit the course
          </Link>
        </div>
      </div>
    );
  }

  const next = path.steps[index + 1];
  const nextHref = `/field-notes/${next.slug}`;
  return (
    <div className="not-prose my-12 border border-c3-yellow border-l-[4px] bg-[rgba(240,190,0,0.05)] p-7">
      <div className="font-mono text-[9px] tracking-[0.24em] uppercase text-c3-yellow mb-2">
        ▸ Next Lesson · {index + 2} of {total} in {path.title}
      </div>
      <Link href={nextHref} className="group block">
        <h3 className="font-cond font-bold text-[clamp(20px,2.8vw,28px)] leading-[1.1] tracking-[0.01em] text-c3-text group-hover:text-c3-yellow transition-colors duration-200">
          {titleFor(next.slug)}
        </h3>
      </Link>
      <p className="font-body font-light text-[14px] text-c3-mid leading-[1.7] mt-3 max-w-[640px]">
        {next.hook}
      </p>
      <Link
        href={nextHref}
        className="group mt-6 inline-flex items-center gap-2.5 font-cond font-bold text-[15px] tracking-[0.10em] uppercase px-[28px] py-[16px] bg-c3-yellow text-[#111] hover:bg-[#FFD000] hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(240,190,0,0.22)] transition-all duration-[220ms]"
      >
        Continue to Lesson {index + 2}
        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
      </Link>
    </div>
  );
}
