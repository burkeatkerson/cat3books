import Container from "@/components/Container";
import { cn } from "@/lib/cn";

const platforms = [
  {
    name: "Xactimate",
    sub: "Verisk · The reference",
    scores: { export: "A−", supplements: "A", equipment: "B+", recon: "B" },
    verdict: { bold: "Still the floor.", rest: " If you're not on it, you're fighting the carriers' native language. Reconciliation needs help." },
    highlight: false,
  },
  {
    name: "Symbility",
    sub: "CoreLogic",
    scores: { export: "B", supplements: "B+", equipment: "B−", recon: "B−" },
    verdict: { bold: null, rest: "Strong with certain carriers. Export structure requires a custom map to QBO — set it up once and forget." },
    highlight: false,
  },
  {
    name: "Albi",
    sub: "Restoration-first",
    scores: { export: "A", supplements: "A−", equipment: "A", recon: "A−" },
    verdict: { bold: "Best-in-class for job costing.", rest: " Cost codes map cleanly. Equipment handling is native. We've recommended it 4 out of 5 new deployments this year." },
    highlight: true,
  },
  {
    name: "Dash",
    sub: "Next Gear Solutions",
    scores: { export: "B+", supplements: "A−", equipment: "B+", recon: "B+" },
    verdict: { bold: null, rest: "Solid all-rounder. TPA workflow is excellent. QBO integration matured significantly in 2025." },
    highlight: false,
  },
  {
    name: "JobNimbus",
    sub: "General contractor roots",
    scores: { export: "B−", supplements: "C+", equipment: "C", recon: "B" },
    verdict: { bold: null, rest: "Great pipeline UX. Cost-code structure isn't restoration-native — works, but needs aggressive customization to support job-level P&L." },
    highlight: false,
  },
  {
    name: "Encircle",
    sub: "Documentation + sketch",
    scores: { export: "—", supplements: "—", equipment: "A", recon: "—" },
    verdict: { bold: null, rest: "Not a job-management system — pairs with one. Best-in-class for moisture/equipment documentation that feeds equipment-day billing." },
    highlight: false,
  },
];

function ScoreChip({ score }: { score: string }) {
  const isYellow = score.startsWith("A");
  const isRed = score === "C" || score === "C+" || score === "C−";
  return (
    <span className={cn(
      "font-disp text-[28px] leading-none tracking-[0.02em] block text-center",
      isYellow ? "text-c3-yellow" : isRed ? "text-[#ff7a55]" : "text-c3-text"
    )}>
      {score}
    </span>
  );
}

export default function SoftwareScorecard() {
  return (
    <section className="relative py-16 xl:py-[88px] bg-c3-dark">
      <Container>
        <div className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow mb-4">
          <span className="w-7 h-px bg-c3-yellow" />
          Standing Review · Updated Quarterly
        </div>
        <h2 className="font-disp text-[48px] leading-none tracking-[0.025em]">
          The estimating &amp; job-mgmt scorecard.
        </h2>
        <p className="font-body font-light text-[16px] text-c3-mid mt-[18px] max-w-[680px] leading-[1.7]">
          How the major platforms score on the only four things we care about as bookkeepers: clean cost-code export, supplement workflow, equipment-day handling, and books reconciliation. Updated Q2 2026.
        </p>

        <div className="mt-6 bg-c3-card border border-c3-border overflow-hidden">
          {/* Header row */}
          <div className="hidden lg:grid grid-cols-[1.4fr_110px_110px_110px_110px_1fr] items-center px-[22px] py-[18px] border-b border-c3-b2 gap-[14px]">
            {["Platform", "Cost Export", "Supplements", "Equipment", "QBO Recon.", "Verdict"].map((h, i) => (
              <span key={h} className={cn("font-mono text-[9px] tracking-[0.22em] text-c3-dim uppercase", i > 0 && i < 5 && "text-center")}>
                {h}
              </span>
            ))}
          </div>

          {platforms.map((p) => (
            <div
              key={p.name}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-[1.4fr_110px_110px_110px_110px_1fr] items-center px-[22px] py-[18px] border-b border-dashed border-c3-border last:border-b-0 gap-[14px]",
                p.highlight && "bg-[rgba(240,190,0,0.025)]"
              )}
            >
              <div>
                <div className="font-cond font-bold text-[17px] uppercase tracking-[0.04em] text-c3-text">
                  {p.name}
                </div>
                <div className="font-mono text-[9px] tracking-[0.18em] text-c3-dim uppercase mt-1">{p.sub}</div>
              </div>

              {/* Mobile: show scores inline */}
              <div className="flex gap-6 lg:hidden font-mono text-[10px] tracking-[0.14em] text-c3-dim uppercase mt-1">
                <span>Export: <strong className="text-c3-text">{p.scores.export}</strong></span>
                <span>Suppl.: <strong className="text-c3-text">{p.scores.supplements}</strong></span>
                <span>Equip.: <strong className="text-c3-text">{p.scores.equipment}</strong></span>
                <span>QBO: <strong className="text-c3-text">{p.scores.recon}</strong></span>
              </div>

              {/* Desktop: individual score columns */}
              <div className="hidden lg:block"><ScoreChip score={p.scores.export} /></div>
              <div className="hidden lg:block"><ScoreChip score={p.scores.supplements} /></div>
              <div className="hidden lg:block"><ScoreChip score={p.scores.equipment} /></div>
              <div className="hidden lg:block"><ScoreChip score={p.scores.recon} /></div>

              <div className="font-body text-[13px] text-c3-mid leading-[1.55]">
                {p.verdict.bold && <strong className="text-c3-text font-medium">{p.verdict.bold}</strong>}
                {p.verdict.rest}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          <span className="font-mono text-[9px] tracking-[0.22em] text-c3-dim uppercase">
            Scoring methodology · 4 axes · weighted equally
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-2 font-cond font-bold text-[12px] tracking-[0.10em] uppercase px-[14px] py-[10px] border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
          >
            Read the full methodology →
          </a>
        </div>
      </Container>
    </section>
  );
}
