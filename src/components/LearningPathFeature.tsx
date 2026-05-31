import Link from "next/link";
import Container from "./Container";
import { getPath } from "@/lib/learning-paths";
import { getAllPosts } from "@/lib/field-notes";

/**
 * Homepage feature for a guided learning path. Curiosity-driven: leads with the
 * problem/benefit promise, previews all steps as a numbered journey, and pushes
 * the reader into "Start here" or the full path overview.
 */
export default function LearningPathFeature({ pathId }: { pathId: string }) {
  const path = getPath(pathId);
  if (!path) return null;

  const postMap = Object.fromEntries(getAllPosts().map((p) => [p.slug, p]));
  const steps = path.steps
    .map((s) => ({ ...s, title: postMap[s.slug]?.title }))
    .filter((s) => s.title) as { slug: string; hook: string; title: string }[];

  if (steps.length === 0) return null;
  const firstSlug = steps[0].slug;

  return (
    <section id="learning-path" className="relative bg-c3-dark border-y border-c3-border py-16 xl:py-[100px] overflow-hidden">
      {/* Ghost watermark */}
      <div
        className="absolute left-[-3%] bottom-[-18%] font-disp text-[300px] leading-[0.8] text-c3-yellow opacity-[0.035] pointer-events-none select-none tracking-[0.02em]"
        aria-hidden
      >
        $
      </div>

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left — the hook */}
          <div>
            <div className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow mb-5">
              <span className="w-7 h-px bg-c3-yellow" />
              Free Guided Path · No Sign-Up
            </div>

            <h2 className="font-disp text-[clamp(40px,5.5vw,72px)] leading-[0.9] tracking-[0.025em]">
              You&rsquo;re leaving money
              <br />
              on the table.
              <br />
              <span className="text-c3-yellow">Here&rsquo;s where.</span>
            </h2>

            <p className="font-cond font-light text-[clamp(17px,2.2vw,21px)] text-c3-mid mt-6 leading-[1.5] max-w-[520px]">
              {path.promise}
            </p>

            <div className="flex gap-3 flex-wrap mt-8">
              <Link
                href={`/field-notes/${firstSlug}`}
                className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] bg-c3-yellow text-[#111] hover:bg-[#FFD000] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
              >
                Start the path →
              </Link>
              <Link
                href={`/learn/${path.id}`}
                className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] border border-c3-b2 text-c3-mid hover:border-c3-yellow hover:text-c3-yellow transition-all duration-200"
              >
                See all {steps.length} steps →
              </Link>
            </div>
          </div>

          {/* Right — the journey */}
          <div className="bg-c3-card border border-c3-border">
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-c3-border">
              <span className="font-cond font-bold text-[16px] uppercase tracking-[0.04em] text-c3-text">
                {path.title}
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim">
                {steps.length} steps
              </span>
            </div>

            <ol className="list-none m-0 p-0">
              {steps.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/field-notes/${s.slug}`}
                  className="group grid grid-cols-[40px_1fr] gap-4 px-6 py-[14px] border-b border-dashed border-c3-border last:border-b-0 items-center"
                >
                  <span className="font-disp text-[24px] leading-none text-c3-yellow tracking-[0.02em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-cond font-semibold text-[15px] leading-[1.2] tracking-[0.005em] text-c3-text group-hover:text-c3-yellow transition-colors duration-200 block">
                      {s.title}
                    </span>
                    {i === 0 && (
                      <span className="font-mono text-[8.5px] tracking-[0.22em] uppercase text-c3-yellow">
                        ◆ Start here
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
