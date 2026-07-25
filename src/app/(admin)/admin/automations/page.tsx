"use client";

import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { PageHead } from "@/components/admin/ui/PageHead";
import { Btn } from "@/components/admin/ui/Btn";
import { Kpi, KpiGrid } from "@/components/admin/ui/Kpi";
import { AutomationRow } from "@/components/admin/cards/AutomationRow";

export default function AutomationsPage() {
  const { db } = useAdmin();
  const { openModal } = useUI();

  const active = db.automations.filter((a) => a.active).length;
  const enrolled = db.automations.reduce((s, a) => s + a.enrolled, 0);

  return (
    <>
      <PageHead
        title="Automations"
        sub="Trigger-based workflows that move contacts through the lifecycle without manual chasing."
        actions={
          <Btn variant="primary" onClick={() => openModal("automation")}>
            + New Automation
          </Btn>
        }
      />

      <KpiGrid>
        <Kpi label="Active Workflows" value={active} valueYellow delta={`of ${db.automations.length} total`} deltaTone="up" />
        <Kpi label="Contacts Enrolled" value={enrolled} delta="▲ live now" deltaTone="up" />
        <Kpi label="Actions · 30d" value="1,284" delta="▲ 31%" deltaTone="up" />
        <Kpi label="Hours Saved · est." value="~46" delta="per month" deltaTone="flat" />
      </KpiGrid>

      <div className="mt-6">
        {db.automations.map((a) => (
          <AutomationRow key={a.id} a={a} />
        ))}
      </div>
    </>
  );
}
