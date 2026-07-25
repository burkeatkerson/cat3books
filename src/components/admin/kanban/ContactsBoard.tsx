"use client";

import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { matchAutomations } from "@/lib/admin/automations";
import { SEG } from "@/lib/admin/seed";
import type { Contact, Segment } from "@/lib/admin/types";
import { KanbanBoard } from "@/components/admin/kanban/KanbanBoard";
import { ContactKanbanCard } from "@/components/admin/kanban/ContactKanbanCard";
import type { KanbanColumnDef } from "@/components/admin/kanban/KanbanColumn";

const COLUMNS: KanbanColumnDef[] = [
  { key: "prospect", label: SEG.prospect.label, accent: "bg-c3-yellow" },
  { key: "client", label: SEG.client.label, accent: "bg-c3-greensoft" },
  { key: "past", label: SEG.past.label, accent: "bg-c3-mid" },
];

export function ContactsBoard() {
  const { db, setContactSegment, enrollInAutomation } = useAdmin();
  const { toast } = useUI();

  function onMove(item: Contact, _from: string, to: string) {
    const seg = to as Segment;
    setContactSegment(item.id, seg);
    const fired = matchAutomations(db, { kind: "segment", to: seg });
    fired.forEach((a) => enrollInAutomation(a.id, item.name));
    toast(
      fired.length
        ? `→ ${SEG[seg].dot} · fired ${fired.map((a) => a.name).join(", ")}`
        : `Moved to ${SEG[seg].dot}`,
    );
  }

  return (
    <KanbanBoard
      columns={COLUMNS}
      items={db.contacts}
      columnOf={(p) => p.segment}
      onMove={onMove}
      renderCard={(p) => <ContactKanbanCard p={p} />}
    />
  );
}
