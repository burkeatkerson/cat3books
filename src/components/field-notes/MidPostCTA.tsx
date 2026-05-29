import Link from "next/link";
import { cn } from "@/lib/cn";

type CTAType = "audit" | "download" | "call";

const defaults: Record<CTAType, { headline: string; subtext: string; label: string; href: string }> = {
  audit: {
    headline: "Get a Free Books Audit",
    subtext:
      "We'll review your current QBO setup, chart of accounts, and supplement tracking workflow — and tell you exactly what's wrong and what it's costing you.",
    label: "Schedule Your Free Assessment →",
    href: "/#contact",
  },
  download: {
    headline: "Free Restoration Chart of Accounts Template",
    subtext:
      "The exact COA structure Cat3 Books deploys on every new engagement. Formatted for QuickBooks Online, ready to import.",
    label: "Download Free Template →",
    href: "/#contact",
  },
  call: {
    headline: "Talk to a Restoration Bookkeeping Specialist",
    subtext:
      "30 minutes. No pitch. We look at your books, tell you what we see, and answer every question you have.",
    label: "Book a Free Call →",
    href: "/#contact",
  },
};

interface Props {
  type?: CTAType;
  headline?: string;
  subtext?: string;
  label?: string;
  href?: string;
  className?: string;
}

/**
 * Contextual mid-post CTA block. Supports three variants: audit, download, call.
 * Props override the default copy for that variant.
 */
export default function MidPostCTA({
  type = "audit",
  headline,
  subtext,
  label,
  href,
  className,
}: Props) {
  const d = defaults[type];
  const h = headline ?? d.headline;
  const s = subtext ?? d.subtext;
  const l = label ?? d.label;
  const u = href ?? d.href;

  return (
    <div
      className={cn(
        "not-prose my-10 border border-c3-border bg-c3-card px-7 py-6 flex flex-col sm:flex-row sm:items-center gap-5",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[8.5px] tracking-[0.24em] uppercase text-c3-yellow mb-2">
          {type === "audit" && "▸ Free Assessment"}
          {type === "download" && "▸ Free Resource"}
          {type === "call" && "▸ Free Consultation"}
        </div>
        <p className="font-disp text-[17px] tracking-[0.02em] text-c3-text mb-1">{h}</p>
        <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.65]">{s}</p>
      </div>
      <Link
        href={u}
        className="shrink-0 inline-flex items-center font-cond font-bold text-[12px] tracking-[0.10em] uppercase px-5 py-3 bg-c3-yellow text-[#111] hover:bg-[#FFD000] hover:-translate-y-0.5 transition-all duration-[220ms] whitespace-nowrap"
      >
        {l}
      </Link>
    </div>
  );
}
