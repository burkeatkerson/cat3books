"use client";

import { cn } from "@/lib/cn";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { money, stageCls } from "@/lib/admin/seed";
import type { Company } from "@/lib/admin/types";
import { Pill, type PillVariant } from "@/components/admin/ui/Pill";
import { HealthDot } from "@/components/admin/ui/HealthDot";
import { CardBtn, PriorityStar, AddToAutomationMenu } from "@/components/admin/kanban/CardBits";

export function CompanyKanbanCard({ c }: { c: Company }) {
  const { convertToClient, cycleHealth, setAudience } = useAdmin();
  const { openDrawer, toast } = useUI();
  const isGlobal = c.audience === "global";

  return (
    <div
      onClick={() => openDrawer({ kind: "company", id: c.id })}
      className={cn(
        "bg-c3-card border border-c3-border p-3 flex flex-col gap-2 transition-colors hover:border-c3-b2 cursor-pointer",
        c.priority && "border-l-2 border-l-c3-yellow",
      )}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-cond font-semibold text-[14px] tracking-[0.02em] uppercase text-c3-text truncate">
            {c.name}
          </div>
          <div className="font-mono text-[10px] text-c3-dim tracking-[0.04em] truncate">
            {c.location} · {c.type}
          </div>
        </div>
        <PriorityStar kind="company" id={c.id} on={!!c.priority} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {c.segment === "prospect" ? (
          <>
            <span className="font-disp text-[20px] text-c3-yellow leading-none">
              {money(c.value)}
              <span className="font-mono text-[10px] text-c3-mid">/mo</span>
            </span>
            <Pill variant={stageCls(c.stage) as PillVariant}>{c.stage}</Pill>
          </>
        ) : (
          <>
            <span className="font-disp text-[20px] text-c3-yellow leading-none">
              {money(c.mrr)}
            </span>
            <Pill variant={c.tier === "Books + CFO" ? "client" : "draft"}>
              {c.tier}
            </Pill>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          title="Cycle health / temperature"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            cycleHealth(c.id);
          }}
        >
          <HealthDot health={c.health} />
        </button>
        <span className="font-mono text-[10px] text-c3-mid ml-auto">{c.owner}</span>
        {isGlobal && <Pill variant="draft">Global</Pill>}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-dashed border-c3-border">
        <CardBtn onClick={() => toast(`Composing to ${c.name}`)}>Email</CardBtn>
        {c.segment === "prospect" && (
          <CardBtn
            tone="yellow"
            onClick={() => {
              convertToClient(c.id);
              toast(`${c.name} is now a client`);
            }}
          >
            Convert
          </CardBtn>
        )}
        <AddToAutomationMenu subjectName={c.name} />
        <CardBtn
          tone="danger"
          onClick={() => {
            setAudience("company", c.id, isGlobal ? "targeted" : "global");
            toast(isGlobal ? "Back to targeted" : "Demoted to global audience");
          }}
        >
          {isGlobal ? "Promote" : "Demote"}
        </CardBtn>
      </div>
    </div>
  );
}
