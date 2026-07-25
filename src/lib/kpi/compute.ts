/**
 * KPI calculation layer. Parses QuickBooks P&L / Balance Sheet report JSON into
 * the headline numbers and upserts a client_kpis row for the current month.
 *
 * QB reports are deeply nested (Rows.Row[] with Summary.ColData). We walk them
 * by `group` (Income / Expenses / NetIncome) rather than by position, which is
 * resilient to layout differences. Raw reports are always stored as snapshots,
 * so re-computation is possible if parsing logic improves.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

type QbRow = {
  group?: string;
  Summary?: { ColData?: { value?: string }[] };
  Rows?: { Row?: QbRow[] };
  Header?: { ColData?: { value?: string }[] };
};
type QbReport = { Rows?: { Row?: QbRow[] } };

function num(v: string | undefined): number {
  const n = Number(String(v ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** Find the summary total for a row group anywhere in the tree. */
function findGroupTotal(report: QbReport, group: string): number | null {
  let result: number | null = null;
  const walk = (rows?: QbRow[]) => {
    for (const row of rows ?? []) {
      if (row.group === group) {
        const val = row.Summary?.ColData?.[1]?.value;
        if (val != null) result = num(val);
      }
      walk(row.Rows?.Row);
    }
  };
  walk(report.Rows?.Row);
  return result;
}

export function parseProfitAndLoss(report: QbReport): {
  income: number;
  expenses: number;
  netIncome: number;
} {
  const income = findGroupTotal(report, "Income") ?? 0;
  const expenses = findGroupTotal(report, "Expenses") ?? 0;
  const netIncome = findGroupTotal(report, "NetIncome") ?? income - expenses;
  return { income, expenses, netIncome };
}

export function parseBalanceSheetCash(report: QbReport): number | null {
  // Bank accounts total is the closest proxy for cash on hand.
  const byGroup = findGroupTotal(report, "TotalBank");
  if (byGroup != null) return byGroup;
  // Fallback: header label "Total Bank Accounts".
  let cash: number | null = null;
  const walk = (rows?: QbRow[]) => {
    for (const row of rows ?? []) {
      const label = row.Header?.ColData?.[0]?.value ?? "";
      if (/total bank/i.test(label)) {
        cash = num(row.Summary?.ColData?.[1]?.value);
      }
      walk(row.Rows?.Row);
    }
  };
  walk(report.Rows?.Row);
  return cash;
}

export async function computeAndStoreKpis(
  supabase: SupabaseClient,
  clientId: string,
  reports: { plYtd: QbReport; plMtd: QbReport; balanceSheet: QbReport },
): Promise<void> {
  const ytd = parseProfitAndLoss(reports.plYtd);
  const mtd = parseProfitAndLoss(reports.plMtd);
  const cash = parseBalanceSheetCash(reports.balanceSheet);

  const now = new Date();
  const periodMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  )
    .toISOString()
    .slice(0, 10);

  await supabase.from("client_kpis").upsert(
    {
      client_id: clientId,
      period_month: periodMonth,
      revenue_mtd: mtd.income,
      revenue_ytd: ytd.income,
      expenses_mtd: mtd.expenses,
      expenses_ytd: ytd.expenses,
      net_profit: ytd.netIncome,
      profit_margin: ytd.income ? ytd.netIncome / ytd.income : null,
      cash_balance: cash,
      ratios: {
        mtd_margin: mtd.income ? mtd.netIncome / mtd.income : null,
      },
      computed_at: now.toISOString(),
    },
    { onConflict: "client_id,period_month" },
  );
}
