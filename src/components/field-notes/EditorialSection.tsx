import Link from "next/link";
import type { PostMeta } from "@/lib/field-notes";
import Container from "@/components/Container";

const seriesParts = [
  "Triage the chart of accounts (look for the 8 telltale leaks)",
  "Reclassify last 90 days of transactions to restoration cost codes",
  "Rebuild the supplement tracking workflow from submission to paid",
  "Split TPA program revenue and reconcile takedowns",
  "Stand up equipment-day reconciliation as a weekly habit",
  "Issue job-coded expense cards and roll the field onto them",
];

interface Props {
  posts: PostMeta[];
}

export default function EditorialSection({ posts }: Props) {
  const mostRead = [
    { slug: "owners-reading-order-monthly-pl",       label: "P&L Management",  time: "5 min",  reads: "3,200" },
    { slug: "supplements-disappear-xactimate-quickbooks", label: "Supplements", time: "7 min",  reads: "2,840" },
    { slug: "code-blue-test-tpa-programs",            label: "Profitability",   time: "8 min",  reads: "2,610" },
    { slug: "qbo-class-tracking-restoration",         label: "QuickBooks",      time: "11 min", reads: "2,140" },
    { slug: "13-week-cash-forecast-restoration",      label: "Cash Flow",       time: "10 min", reads: "1,980" },
  ];

  const postMap = Object.fromEntries(posts.map((p) => [p.slug, p]));

  return (
    <section className="relative py-16 xl:py-[88px]">
      <Container>
        <div className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow mb-4">
          <span className="w-7 h-px bg-c3-yellow" />
          Editorial
        </div>
        <h2 className="font-disp text-[48px] leading-none tracking-[0.025em] mb-6">
          If you only read <span className="text-c3-yellow">a few things.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-[48px] mt-6">
          {/* Most read */}
          <div className="bg-c3-card border border-c3-border p-8">
            <h3 className="font-cond font-bold text-[20px] uppercase tracking-[0.04em] mb-[18px] text-c3-text">
              Most read · last 90 days
            </h3>
            <div className="flex flex-col">
              {mostRead.map(({ slug, label, time, reads }, i) => {
                const post = postMap[slug];
                return (
                  <Link
                    key={slug}
                    href={`/field-notes/${slug}`}
                    className="group grid grid-cols-[48px_1fr] gap-4 py-4 border-b border-dashed border-c3-border last:border-b-0 items-start"
                  >
                    <div className="font-disp text-[32px] text-c3-yellow leading-[0.9] tracking-[0.02em]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.22em] text-c3-dim uppercase mb-[6px]">
                        {label} · {time}
                      </div>
                      <h4 className="font-cond font-semibold text-[16px] text-c3-text leading-[1.25] tracking-[0.005em] group-hover:text-c3-yellow transition-colors duration-200">
                        {post?.title ?? slug}
                      </h4>
                      <div className="font-mono text-[10px] tracking-[0.14em] text-c3-mid mt-[6px] uppercase">
                        {reads} reads
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Series card */}
          <div className="bg-c3-card border border-c3-border p-8 flex flex-col">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow mb-[10px]">
              ★ Series · 6 parts
            </div>
            <h3 className="font-cond font-bold text-[24px] uppercase tracking-[0.04em] leading-[1.1] text-c3-text">
              The Cat3 Cleanup Playbook
            </h3>
            <p className="font-body font-light text-[13.5px] text-c3-mid mt-[14px] leading-[1.7]">
              The exact diagnostic-to-remediation sequence we run on every new engagement. Read it as a guide to fix your own books — or use it as the brief for the bookkeeper already in your seat.
            </p>

            <ol className="list-none mt-[22px] p-0 flex-1" style={{ counterReset: "step" }}>
              {seriesParts.map((part, i) => (
                <li
                  key={i}
                  className="relative pl-[38px] py-3 border-b border-dashed border-c3-border last:border-b-0 font-cond font-semibold text-[15px] text-c3-text leading-[1.3] tracking-[0.005em] hover:text-c3-yellow transition-colors duration-200 cursor-default"
                >
                  <span className="absolute left-0 top-3 font-mono text-[11px] tracking-[0.18em] text-c3-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {part}
                </li>
              ))}
            </ol>

            <div className="mt-[18px] pt-[14px] border-t border-c3-border">
              <div className="flex justify-between font-mono text-[10px] tracking-[0.18em] text-c3-dim uppercase mb-2">
                <span>Average reader progress</span>
                <span className="text-c3-yellow">2 of 6</span>
              </div>
              <div className="h-[3px] bg-c3-b2 relative">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-c3-yellow" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
