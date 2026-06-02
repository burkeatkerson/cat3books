import Link from "next/link";
import { cn } from "@/lib/cn";
import StaggerGroup from "./motion/StaggerGroup";
import StaggerItem from "./motion/StaggerItem";
import { PRICING_TIERS, formatUsd } from "@/lib/pricing";

/**
 * The three flat-rate package cards, rendered straight from PRICING_TIERS.
 * Shared by the homepage PricingSection and the landing LandingPricing so the
 * model lives in exactly one place.
 */
export default function PricingTierCards() {
  return (
    <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-[3px] bg-c3-border">
      {PRICING_TIERS.map((t) => (
        <StaggerItem key={t.id}>
          <div
            className={cn(
              "bg-c3-card p-5 sm:p-8 border h-full relative flex flex-col",
              t.featured ? "border-c3-yellow" : "border-c3-border"
            )}
          >
            {t.featured && (
              <span className="absolute top-[-1px] right-[-1px] bg-c3-yellow text-[#111] font-cond font-bold text-[11px] tracking-[0.12em] uppercase py-[7px] px-3">
                Most Popular
              </span>
            )}

            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
              {t.kicker}
            </div>
            <h3
              className={cn(
                "font-cond font-bold text-[26px] uppercase tracking-[0.04em] mt-1.5 leading-[1.05]",
                t.featured ? "text-c3-yellow" : "text-c3-text"
              )}
            >
              {t.name}
            </h3>
            <p className="font-body font-light text-[13.5px] text-c3-mid mt-2 leading-[1.5] md:min-h-[42px]">
              {t.tagline}
            </p>

            <div
              className={cn(
                "font-disp text-[60px] leading-none mt-4 tracking-[0.01em]",
                t.featured ? "text-c3-yellow" : "text-c3-text"
              )}
            >
              ${formatUsd(t.monthly)}
              <small className="font-mono text-[14px] text-c3-mid"> / mo</small>
            </div>
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim mt-2">
              Flat rate · No annual contract
            </div>

            <ul className="list-none p-0 mt-5 space-y-0 flex-1">
              {t.features.map((f) => {
                const rollup = f.startsWith("Everything in");
                return (
                  <li
                    key={f}
                    className={cn(
                      "font-body text-[13px] py-[8px] border-b border-dashed border-c3-border last:border-b-0 leading-[1.5] before:content-['▸_'] before:text-c3-yellow",
                      rollup ? "font-medium text-c3-text" : "font-light text-c3-mid"
                    )}
                  >
                    {f}
                  </li>
                );
              })}
            </ul>

            <Link
              href="#contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[20px] py-[13px] mt-6 transition-all duration-[220ms]",
                t.featured
                  ? "bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)]"
                  : "border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text"
              )}
            >
              {t.cta} →
            </Link>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
