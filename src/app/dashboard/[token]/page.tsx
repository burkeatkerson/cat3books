/**
 * Public, token-gated client dashboard (placeholder).
 *
 * The full KPI dashboard UI is out of scope for now; this confirms the token
 * resolves and the data layer is isolated. The data comes from the same
 * DB-enforced function the API uses. Replace this with the real dashboard later.
 */

import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

type DashboardData = {
  company?: { name?: string };
  client?: { tier?: string; status?: string };
  kpis?: { revenue_mtd?: number; net_profit?: number } | null;
};

export default async function ClientDashboard({
  params,
}: {
  params: { token: string };
}) {
  const supabase = createAdminClient();
  const { data } = await supabase.rpc("get_dashboard_by_token", {
    p_token: params.token,
  });
  if (!data) notFound();
  const d = data as DashboardData;

  return (
    <main className="max-w-2xl mx-auto px-6 py-20 text-c3-text">
      <div className="font-disp text-4xl tracking-wide mb-2">
        {d.company?.name ?? "Your"} Dashboard
      </div>
      <p className="text-c3-mid mb-8">
        Your private financial dashboard. The full interactive view is coming
        soon — here&rsquo;s the latest snapshot.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Stat label="Revenue (MTD)" value={money(d.kpis?.revenue_mtd)} />
        <Stat label="Net profit (YTD)" value={money(d.kpis?.net_profit)} />
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-c3-card border border-c3-border rounded-lg p-5">
      <div className="text-c3-mid text-xs uppercase tracking-wide">{label}</div>
      <div className="font-disp text-3xl text-c3-yellow mt-1">{value}</div>
    </div>
  );
}

function money(n: number | undefined): string {
  return n == null ? "—" : `$${Number(n).toLocaleString("en-US")}`;
}
