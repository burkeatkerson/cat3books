/**
 * Compose and send a client's dashboard email — used by the one-click "send
 * dashboard" action and by recurring recaps. Includes the private dashboard
 * link plus a snapshot of the latest KPIs.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sendEmail, type EmailCategory } from "@/lib/email";
import { publicEnv } from "@/lib/public-env";

const money = (n: number | null | undefined) =>
  n == null ? "—" : `$${Number(n).toLocaleString("en-US")}`;
const pct = (n: number | null | undefined) =>
  n == null ? "—" : `${Math.round(Number(n) * 100)}%`;

export async function sendClientDashboardEmail(
  supabase: SupabaseClient,
  clientId: string,
  category: Extract<EmailCategory, "dashboard" | "recap">,
): Promise<string> {
  const { data, error } = await supabase
    .from("clients")
    .select(
      `id, dashboard_token, company:companies(name),
       primary_contact:contacts!clients_primary_contact_id_fkey(id, full_name, email),
       kpis:client_kpis(period_month, revenue_mtd, net_profit, profit_margin, cash_balance)`,
    )
    .eq("id", clientId)
    .single();
  if (error) throw new Error(error.message);

  const client = data as unknown as {
    id: string;
    dashboard_token: string;
    company: { name: string } | null;
    primary_contact: { id: string; full_name: string; email: string | null } | null;
    kpis: Array<{
      period_month: string;
      revenue_mtd: number | null;
      net_profit: number | null;
      profit_margin: number | null;
      cash_balance: number | null;
    }>;
  };

  const contact = client.primary_contact;
  if (!contact?.email) throw new Error("No primary contact email");

  const latest = [...(client.kpis ?? [])].sort((a, b) =>
    a.period_month < b.period_month ? 1 : -1,
  )[0];
  const dashboardUrl = `${publicEnv.appUrl}/dashboard/${client.dashboard_token}`;
  const firstName = contact.full_name.split(/\s+/)[0] ?? "there";

  const kpiBlock = latest
    ? `<table style="border-collapse:collapse;margin:16px 0">
         <tr><td style="padding:4px 16px 4px 0;color:#666">Revenue (MTD)</td><td style="padding:4px 0;font-weight:600">${money(latest.revenue_mtd)}</td></tr>
         <tr><td style="padding:4px 16px 4px 0;color:#666">Net profit</td><td style="padding:4px 0;font-weight:600">${money(latest.net_profit)}</td></tr>
         <tr><td style="padding:4px 16px 4px 0;color:#666">Profit margin</td><td style="padding:4px 0;font-weight:600">${pct(latest.profit_margin)}</td></tr>
         <tr><td style="padding:4px 16px 4px 0;color:#666">Cash balance</td><td style="padding:4px 0;font-weight:600">${money(latest.cash_balance)}</td></tr>
       </table>`
    : `<p style="color:#666">Your first numbers will appear once QuickBooks is connected and synced.</p>`;

  const result = await sendEmail(
    {
      to: { email: contact.email, contactId: contact.id },
      subject:
        category === "recap"
          ? `Your latest numbers from Cat3 Books`
          : `Your financial dashboard — ${client.company?.name ?? ""}`.trim(),
      category,
      html: `<p>Hi ${firstName},</p>
        <p>Here's where ${client.company?.name ?? "your business"} stands:</p>
        ${kpiBlock}
        <p>See the full, always-current dashboard here:</p>
        <p><a href="${dashboardUrl}">${dashboardUrl}</a></p>
        <p>— The Cat3 Books team</p>`,
      related: { type: "client", id: client.id },
    },
    supabase,
  );

  await supabase.from("activities").insert({
    activity_type: "dashboard_sent",
    actor: "System",
    client_id: client.id,
    contact_id: contact.id,
    body: category === "recap" ? "Dashboard recap sent" : "Dashboard sent",
  });

  return result.id;
}
