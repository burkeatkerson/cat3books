import SchoolContainer from "./SchoolContainer";
import { carryforward } from "@/lib/companion";

/**
 * The companion-publication band. Presents The Carryforward as a sibling
 * reference that shares the School's editorial standards — the association is
 * the point, so the standards list is what does the credibility work, not the
 * link itself. Rendered on the School home page and available for subject pages
 * where the topic boundary (tax) is closest.
 */
export default function CompanionBand({
  variant = "full",
}: {
  /** "full" = home page section with standards; "slim" = one-line pointer. */
  variant?: "full" | "slim";
}) {
  if (variant === "slim") {
    return (
      <div className="border border-school-line2 bg-school-raised p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-faint mb-1">
            {carryforward.relationship}
          </p>
          <p className="font-cond font-semibold text-[16px] leading-[1.3] text-school-ink">
            {carryforward.name} — {carryforward.tagline}
          </p>
          <p className="mt-1 font-body text-[13px] leading-[1.55] text-school-muted">
            {carryforward.boundary}
          </p>
        </div>
        <a
          href={carryforward.url}
          target="_blank"
          rel="noopener"
          className="shrink-0 inline-flex items-center gap-2 font-cond font-bold text-[12px] tracking-[0.08em] uppercase px-4 py-3 border border-school-line2 text-school-body hover:border-school-navy hover:text-school-navy transition-colors duration-150"
        >
          Visit {carryforward.name} ↗
        </a>
      </div>
    );
  }

  return (
    <section className="border-t border-school-line bg-school-ink text-school-paper">
      <SchoolContainer className="py-14 lg:py-18">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-school-sun mb-4">
              {carryforward.relationship}
            </p>
            <h2 className="font-cond font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] uppercase tracking-[0.01em]">
              Where the books end,
              <br />
              the tax code begins.
            </h2>
            <p className="mt-5 font-serif text-[18px] leading-[1.7] text-[#D8D4C6]">
              {carryforward.boundary} <strong className="text-school-paper font-semibold">{carryforward.name}</strong> is
              a separate, independent reference for the specialty corners of the
              tax code — {carryforward.tagline.toLowerCase()}
            </p>

            <a
              href={carryforward.url}
              target="_blank"
              rel="noopener"
              className="mt-7 inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.08em] uppercase px-6 py-4 bg-school-sun text-[#111] hover:bg-[#FFD000] transition-colors duration-150"
            >
              Read {carryforward.name} ↗
            </a>
            <p className="mt-4 font-mono text-[10px] tracking-[0.14em] uppercase text-[#8B8778]">
              thecarryforward.com · Free · Educational only
            </p>
          </div>

          {/* Shared standards — this is what transfers credibility both ways. */}
          <div className="lg:pt-2">
            <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#8B8778] mb-4">
              Held to the same standard as this School
            </p>
            <ul className="flex flex-col gap-4">
              {carryforward.standards.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-[7px] w-[7px] h-[7px] shrink-0 bg-school-sun" aria-hidden="true" />
                  <span className="font-body text-[15px] leading-[1.6] text-[#D8D4C6]">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-white/12 flex flex-wrap gap-x-5 gap-y-2">
              {carryforward.topics.map((t) => (
                <span key={t.label} className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[#B7B3A4]">
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SchoolContainer>
    </section>
  );
}
