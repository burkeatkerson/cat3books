"use client";

import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { SEG } from "@/lib/admin/seed";
import type { Automation } from "@/lib/admin/types";
import { Pill, type PillVariant } from "@/components/admin/ui/Pill";
import { Toggle } from "@/components/admin/ui/Toggle";
import { Icon } from "@/components/admin/ui/icons";

export function AutomationRow({ a }: { a: Automation }) {
  const { toggleAutomation } = useAdmin();
  const { toast } = useUI();

  return (
    <div className="bg-c3-card border border-c3-border p-5 grid grid-cols-[auto_1fr_auto_auto] gap-5 items-center mb-px transition-colors hover:border-c3-b2">
      <div className="w-[44px] h-[44px] border border-c3-border bg-c3-card2 flex items-center justify-center text-c3-yellow">
        <Icon name="automations" className="w-5 h-5" />
      </div>

      <div>
        <div className="flex items-center gap-2.5">
          <span className="font-cond font-bold text-[18px] tracking-[0.03em] uppercase text-c3-text">
            {a.name}
          </span>
          <Pill variant={SEG[a.segment].cls as PillVariant}>
            {SEG[a.segment].dot}s
          </Pill>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap mt-2">
          <Node trigger>⚡ {a.trigger}</Node>
          {a.steps.map((s, i) => (
            <span key={i} className="flex items-center gap-2.5">
              <span className="text-c3-dim text-[12px]">→</span>
              <Node>{s}</Node>
            </span>
          ))}
        </div>
      </div>

      <div className="text-right">
        <div className="font-disp text-[28px] text-c3-yellow leading-none">
          {a.enrolled}
        </div>
        <div className="font-mono text-[8.5px] tracking-[0.14em] text-c3-dim uppercase mt-1">
          Enrolled
        </div>
      </div>

      <Toggle
        on={a.active}
        onClick={() => {
          toggleAutomation(a.id);
          toast(`${a.name}${a.active ? " paused" : " activated"}`);
        }}
      />
    </div>
  );
}

function Node({
  children,
  trigger = false,
}: {
  children: React.ReactNode;
  trigger?: boolean;
}) {
  return (
    <span
      className={`font-mono text-[10px] tracking-[0.08em] uppercase border bg-c3-card2 px-[9px] py-[5px] ${
        trigger ? "text-c3-yellow border-c3-yellow-dim" : "text-c3-mid border-c3-border"
      }`}
    >
      {children}
    </span>
  );
}
