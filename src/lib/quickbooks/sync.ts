/**
 * Sync a client's QuickBooks data: pull P&L (YTD + MTD), Balance Sheet, and
 * invoices; store raw snapshots + normalized invoices; then compute KPIs.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { qbFetch } from "@/lib/quickbooks/client";
import { computeAndStoreKpis } from "@/lib/kpi/compute";

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export type SyncSummary = {
  invoices: number;
  snapshots: number;
};

export async function syncClient(
  supabase: SupabaseClient,
  clientId: string,
): Promise<SyncSummary> {
  const now = new Date();
  const yearStart = ymd(new Date(Date.UTC(now.getUTCFullYear(), 0, 1)));
  const monthStart = ymd(
    new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)),
  );
  const today = ymd(now);

  // --- Reports ---
  const plYtd = await qbFetch<Record<string, unknown>>(
    supabase,
    clientId,
    `reports/ProfitAndLoss?start_date=${yearStart}&end_date=${today}&minorversion=70`,
  );
  const plMtd = await qbFetch<Record<string, unknown>>(
    supabase,
    clientId,
    `reports/ProfitAndLoss?start_date=${monthStart}&end_date=${today}&minorversion=70`,
  );
  const balanceSheet = await qbFetch<Record<string, unknown>>(
    supabase,
    clientId,
    `reports/BalanceSheet?as_of=${today}&minorversion=70`,
  );

  const snapshotRows = [
    {
      client_id: clientId,
      report_type: "profit_loss",
      period_start: yearStart,
      period_end: today,
      raw_json: plYtd,
    },
    {
      client_id: clientId,
      report_type: "profit_loss",
      period_start: monthStart,
      period_end: today,
      raw_json: plMtd,
    },
    {
      client_id: clientId,
      report_type: "balance_sheet",
      period_start: today,
      period_end: today,
      raw_json: balanceSheet,
    },
  ];
  await supabase.from("qb_financial_snapshots").insert(snapshotRows);

  // --- Invoices ---
  const invoiceQuery = encodeURIComponent(
    "select * from Invoice order by TxnDate desc maxresults 200",
  );
  const invoiceResult = await qbFetch<{
    QueryResponse?: { Invoice?: QbInvoice[] };
  }>(supabase, clientId, `query?query=${invoiceQuery}&minorversion=70`);
  const invoices = invoiceResult.QueryResponse?.Invoice ?? [];

  if (invoices.length) {
    await supabase.from("qb_invoices").upsert(
      invoices.map((inv) => ({
        client_id: clientId,
        qb_invoice_id: inv.Id,
        doc_number: inv.DocNumber ?? null,
        customer_name: inv.CustomerRef?.name ?? null,
        txn_date: inv.TxnDate ?? null,
        due_date: inv.DueDate ?? null,
        total_amount: inv.TotalAmt ?? null,
        balance: inv.Balance ?? null,
        status: invoiceStatus(inv),
        raw_json: inv,
        synced_at: now.toISOString(),
      })),
      { onConflict: "client_id,qb_invoice_id" },
    );
  }

  // --- KPIs ---
  await computeAndStoreKpis(supabase, clientId, { plYtd, plMtd, balanceSheet });

  await supabase
    .from("qb_connections")
    .update({ last_sync_at: now.toISOString(), sync_status: "ok", sync_error: null })
    .eq("client_id", clientId);

  return { invoices: invoices.length, snapshots: snapshotRows.length };
}

type QbInvoice = {
  Id: string;
  DocNumber?: string;
  CustomerRef?: { name?: string };
  TxnDate?: string;
  DueDate?: string;
  TotalAmt?: number;
  Balance?: number;
};

function invoiceStatus(inv: QbInvoice): "open" | "paid" | "overdue" {
  if ((inv.Balance ?? 0) <= 0) return "paid";
  if (inv.DueDate && new Date(inv.DueDate) < new Date()) return "overdue";
  return "open";
}
