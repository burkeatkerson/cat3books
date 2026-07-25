"use client";

import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { matchAutomations } from "@/lib/admin/automations";
import type { Company } from "@/lib/admin/types";
import { KanbanBoard } from "@/components/admin/kanban/KanbanBoard";
import { CompanyKanbanCard } from "@/components/admin/kanban/CompanyKanbanCard";
import type { KanbanColumnDef } from "@/components/admin/kanban/KanbanColumn";

// The 4-stage prospect pipeline. Winning a deal is done via the card's
// "Convert" action (which moves it out of the pipeline into Clients).
const COLUMNS: KanbanColumnDef[] = [
  { key: "New lead", label: "New lead", accent: "bg-c3-dim" },
  { key: "Discovery call", label: "Discovery", accent: "bg-c3-bluesoft" },
  { key: "Assessment booked", label: "Assessment", accent: "bg-c3-yellow" },
  { key: "Proposal sent", label: "Proposal", accent: "bg-c3-greensoft" },
];

export function CompaniesBoard() {
  const { db, setCompanyStage, enrollInAutomation } = useAdmin();
  const { toast } = useUI();

  // The pipeline is the prospect companies, placed by stage.
  const prospects = db.companies.filter((c) => c.segment === "prospect");

  function onMove(item: Company, _from: string, to: string) {
    setCompanyStage(item.id, to);
    const fired = matchAutomations(db, { kind: "stage", to });
    fired.forEach((a) => enrollInAutomation(a.id, item.name));
    toast(
      fired.length
        ? `→ ${to} · fired ${fired.map((a) => a.name).join(", ")}`
        : `Moved to ${to}`,
    );
  }

  return (
    <KanbanBoard
      columns={COLUMNS}
      items={prospects}
      columnOf={(c) => c.stage ?? "New lead"}
      onMove={onMove}
      renderCard={(c) => <CompanyKanbanCard c={c} />}
    />
  );
}
