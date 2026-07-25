"use client";

import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { PageHead } from "@/components/admin/ui/PageHead";
import { Btn } from "@/components/admin/ui/Btn";
import { Kpi, KpiGrid } from "@/components/admin/ui/Kpi";
import { SegTabs } from "@/components/admin/ui/SegTabs";
import { CampaignCard } from "@/components/admin/cards/CampaignCard";

export default function CampaignsPage() {
  const { db } = useAdmin();
  const { openModal } = useUI();

  const live = db.campaigns.filter((c) => c.status === "live");
  const totalSent = db.campaigns.reduce((s, c) => s + c.sent, 0);
  const totalBooked = db.campaigns.reduce((s, c) => s + c.booked, 0);
  const totalReplied = db.campaigns.reduce((s, c) => s + c.replied, 0);
  const replyRate = totalSent ? Math.round((totalReplied / totalSent) * 100) : 0;

  return (
    <>
      <PageHead
        title="Campaigns"
        sub="Outreach sequences across prospects, clients, and win-backs. Built in the Cat3 voice — diagnostic, direct, no fluff."
        actions={
          <Btn variant="primary" onClick={() => openModal("campaign")}>
            + New Campaign
          </Btn>
        }
      />

      <KpiGrid>
        <Kpi label="Live Campaigns" value={live.length} valueYellow delta="▲ across 3 segments" deltaTone="up" />
        <Kpi label="Emails Sent · 30d" value={totalSent.toLocaleString()} delta="▲ 22%" deltaTone="up" />
        <Kpi label="Replies" value={totalReplied} delta={`▲ ${replyRate}% rate`} deltaTone="up" />
        <Kpi label="Assessments Booked" value={totalBooked} valueYellow delta="▲ 8 this month" deltaTone="up" />
      </KpiGrid>

      <SegTabs
        className="mt-6 mb-[22px]"
        active="all"
        onChange={() => {}}
        tabs={[{ key: "all", label: "All Campaigns", count: db.campaigns.length }]}
      />

      <div className="grid grid-cols-2 max-[1100px]:grid-cols-1 gap-px bg-c3-border">
        {db.campaigns.map((c) => (
          <CampaignCard key={c.id} c={c} />
        ))}
      </div>
    </>
  );
}
