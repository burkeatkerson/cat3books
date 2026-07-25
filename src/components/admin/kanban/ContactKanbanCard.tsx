"use client";

import { cn } from "@/lib/cn";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { SEG } from "@/lib/admin/seed";
import type { Contact } from "@/lib/admin/types";
import { Pill, type PillVariant } from "@/components/admin/ui/Pill";
import { Avatar } from "@/components/admin/ui/Avatar";
import { CardBtn, PriorityStar, AddToAutomationMenu } from "@/components/admin/kanban/CardBits";

export function ContactKanbanCard({ p }: { p: Contact }) {
  const { companyById, setContactSegment, setAudience } = useAdmin();
  const { openDrawer, toast } = useUI();
  const co = companyById(p.companyId);
  const isGlobal = p.audience === "global";

  return (
    <div
      onClick={() => openDrawer({ kind: "contact", id: p.id })}
      className={cn(
        "bg-c3-card border border-c3-border p-3 flex flex-col gap-2 transition-colors hover:border-c3-b2 cursor-pointer",
        p.priority && "border-l-2 border-l-c3-yellow",
      )}
    >
      <div className="flex items-start gap-2">
        <Avatar name={p.name} yellow={p.segment === "client"} />
        <div className="flex-1 min-w-0">
          <div className="font-cond font-semibold text-[14px] tracking-[0.02em] text-c3-text truncate">
            {p.name}
          </div>
          <div className="font-mono text-[10px] text-c3-dim tracking-[0.04em] truncate">
            {p.title}
            {co ? ` · ${co.name}` : ""}
          </div>
        </div>
        <PriorityStar kind="contact" id={p.id} on={!!p.priority} />
      </div>

      <div className="flex items-center gap-2">
        <Pill variant={SEG[p.segment].cls as PillVariant} dot>
          {SEG[p.segment].dot}
        </Pill>
        <span className="font-mono text-[10px] text-c3-mid ml-auto">
          {p.lastTouch}
        </span>
        {isGlobal && <Pill variant="draft">Global</Pill>}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-dashed border-c3-border">
        <CardBtn onClick={() => toast(`Composing to ${p.name}`)}>Email</CardBtn>
        {p.segment === "prospect" && (
          <CardBtn
            tone="yellow"
            onClick={() => {
              setContactSegment(p.id, "client");
              toast(`${p.name} marked Client`);
            }}
          >
            Convert
          </CardBtn>
        )}
        <AddToAutomationMenu subjectName={p.name} />
        <CardBtn
          tone="danger"
          onClick={() => {
            setAudience("contact", p.id, isGlobal ? "targeted" : "global");
            toast(isGlobal ? "Back to targeted" : "Demoted to global audience");
          }}
        >
          {isGlobal ? "Promote" : "Demote"}
        </CardBtn>
      </div>
    </div>
  );
}
