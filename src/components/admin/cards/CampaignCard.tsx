"use client";

import { useUI } from "@/lib/admin/ui-store";
import { SEG } from "@/lib/admin/seed";
import type { Campaign } from "@/lib/admin/types";
import { Pill, type PillVariant } from "@/components/admin/ui/Pill";
import { Icon } from "@/components/admin/ui/icons";

export function CampaignCard({ c }: { c: Campaign }) {
  const { openDrawer } = useUI();
  const open = c.sent ? Math.round((c.opened / c.sent) * 100) : 0;

  return (
    <div
      onClick={() => openDrawer({ kind: "campaign", id: c.id })}
      className="bg-c3-card p-6 flex flex-col gap-4 cursor-pointer border-t-2 border-transparent transition-colors hover:bg-c3-card2 hover:border-c3-yellow"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-[42px] h-[42px] flex-shrink-0 border border-c3-border bg-c3-card2 flex items-center justify-center text-c3-yellow">
          <Icon name="mail" className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h4 className="font-cond font-bold text-[19px] tracking-[0.03em] uppercase text-c3-text leading-[1.1]">
              {c.name}
            </h4>
            <Pill variant={c.status as PillVariant} dot={c.status === "live"} blink={c.status === "live"}>
              {c.status}
            </Pill>
          </div>
          <div className="font-body text-[12.5px] text-c3-mid mt-1 leading-[1.5]">
            {c.desc}
          </div>
          <div className="mt-2 flex gap-2">
            <Pill variant={SEG[c.segment].cls as PillVariant}>
              {SEG[c.segment].dot}s
            </Pill>
            <Pill variant="draft">{c.channel}</Pill>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3.5 pt-4 border-t border-dashed border-c3-border">
        <Stat v={c.sent} k="Sent" />
        <Stat v={`${open}%`} k="Open Rate" />
        <Stat v={c.replied} k="Replied" />
        <Stat v={c.booked} k="Booked" yellow />
      </div>
    </div>
  );
}

function Stat({
  v,
  k,
  yellow = false,
}: {
  v: React.ReactNode;
  k: string;
  yellow?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-disp text-[26px] leading-none tracking-[0.02em] ${yellow ? "text-c3-yellow" : "text-c3-text"}`}
      >
        {v}
      </div>
      <div className="font-mono text-[8px] tracking-[0.14em] text-c3-dim uppercase mt-[5px]">
        {k}
      </div>
    </div>
  );
}
