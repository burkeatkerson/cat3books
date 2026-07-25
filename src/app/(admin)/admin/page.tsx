"use client";

import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { money } from "@/lib/admin/seed";
import { PageHead } from "@/components/admin/ui/PageHead";
import { Btn } from "@/components/admin/ui/Btn";
import { Kpi, KpiGrid } from "@/components/admin/ui/Kpi";
import { Panel } from "@/components/admin/ui/Panel";
import { Lbl } from "@/components/admin/ui/Lbl";
import { PipelinePanel } from "@/components/admin/dashboard/PipelinePanel";
import { TasksPanel } from "@/components/admin/dashboard/TasksPanel";
import { ActivityFeed } from "@/components/admin/dashboard/ActivityFeed";
import { CampaignSnapshot } from "@/components/admin/dashboard/CampaignSnapshot";

function MoreLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="font-mono text-[10px] tracking-[0.12em] uppercase text-c3-dim hover:text-c3-yellow"
    >
      {children}
    </button>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { db } = useAdmin();
  const { openModal, toast } = useUI();

  const clients = db.companies.filter((c) => c.segment === "client");
  const prospects = db.companies.filter((c) => c.segment === "prospect");
  const past = db.companies.filter((c) => c.segment === "past");
  const mrr = clients.reduce((s, c) => s + (c.mrr || 0), 0);
  const pipeline = prospects.reduce((s, c) => s + (c.value || 0), 0);

  return (
    <>
      <PageHead
        title="Good morning, Jordan."
        sub="Here’s where the book of business stands today — June 1, 2026."
        actions={
          <>
            <Btn variant="ghost" onClick={() => router.push("/admin/campaigns")}>
              View Campaigns
            </Btn>
            <Btn variant="primary" onClick={() => openModal("company")}>
              + Add Company
            </Btn>
          </>
        }
      />

      <KpiGrid>
        <Kpi
          label="Active Clients"
          value={clients.length}
          valueYellow
          delta="▲ 2 this quarter"
          deltaTone="up"
        />
        <Kpi
          label="Monthly Recurring Rev"
          value={money(mrr)}
          delta="▲ 14% YoY"
          deltaTone="up"
        />
        <Kpi
          label="Open Pipeline"
          value={
            <>
              {money(pipeline)}
              <span className="font-mono text-[13px] text-c3-mid">/mo</span>
            </>
          }
          delta={`▲ ${prospects.length} prospects`}
          deltaTone="up"
        />
        <Kpi
          label="At-Risk / Past"
          value={past.length}
          delta="2 in win-back"
          deltaTone="flat"
        />
      </KpiGrid>

      <div className="grid grid-cols-[1.6fr_1fr] max-[1100px]:grid-cols-1 gap-px bg-c3-border mt-px">
        <Panel
          title="Prospect Pipeline"
          right={
            <MoreLink onClick={() => router.push("/admin/companies")}>
              All prospects →
            </MoreLink>
          }
        >
          <PipelinePanel />
        </Panel>
        <Panel
          title="My Tasks"
          right={
            <MoreLink onClick={() => toast("Tasks are a prototype")}>+ Add</MoreLink>
          }
        >
          <TasksPanel />
        </Panel>
      </div>

      <div className="grid grid-cols-3 max-[1100px]:grid-cols-1 gap-px bg-c3-border mt-px">
        <Panel
          title="Activity Feed"
          right={<Lbl>Live</Lbl>}
          className="col-span-2 max-[1100px]:col-span-1"
        >
          <ActivityFeed activity={db.activity} />
        </Panel>
        <Panel title="Campaign Snapshot">
          <CampaignSnapshot />
        </Panel>
      </div>
    </>
  );
}
