"use client";

import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { money } from "@/lib/admin/seed";
import { PageHead } from "@/components/admin/ui/PageHead";
import { Btn } from "@/components/admin/ui/Btn";
import { Kpi, KpiGrid } from "@/components/admin/ui/Kpi";
import { ClientsTable } from "@/components/admin/tables/ClientsTable";

export default function ClientsPage() {
  const router = useRouter();
  const { db } = useAdmin();
  const { openModal } = useUI();

  const clientCos = db.companies.filter((c) => c.segment === "client");
  const clientContacts = db.contacts.filter((c) => c.segment === "client");
  const mrr = clientCos.reduce((s, c) => s + (c.mrr || 0), 0);

  return (
    <>
      <PageHead
        title="Clients"
        sub={
          <>
            Your active book of business — a saved filter of Contacts where
            segment is <span className="text-c3-yellow">Client</span>.{" "}
            {clientCos.length} companies, {money(mrr)}/mo recurring.
          </>
        }
        actions={
          <>
            <Btn variant="ghost" onClick={() => router.push("/admin/contacts")}>
              All Contacts
            </Btn>
            <Btn variant="primary" onClick={() => openModal("contact")}>
              + Add Contact
            </Btn>
          </>
        }
      />

      <KpiGrid>
        <Kpi label="Client Companies" value={clientCos.length} valueYellow delta="▲ 2 this quarter" deltaTone="up" />
        <Kpi label="Client Contacts" value={clientContacts.length} delta="decision-makers" deltaTone="flat" />
        <Kpi label="Monthly Recurring" value={money(mrr)} delta="▲ 14% YoY" deltaTone="up" />
        <Kpi
          label="Avg. Tenure"
          value={
            <>
              19<span className="font-mono text-[13px] text-c3-mid"> mo</span>
            </>
          }
          delta="and counting"
          deltaTone="flat"
        />
      </KpiGrid>

      <div className="mt-6">
        <ClientsTable />
      </div>
    </>
  );
}
