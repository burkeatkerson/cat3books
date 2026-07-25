/**
 * The master cron tick. Orchestrates, in order:
 *   1. segments  — refresh dynamic membership, emit enters_segment events
 *   2. triggers  — consume events, enroll contacts
 *   3. sequences — run due enrollment steps (send emails, create tasks, …)
 *   4. recaps    — send due client dashboard recaps
 *   5. qb refresh— refresh QuickBooks tokens nearing expiry
 *
 * Each phase is wrapped so one failing phase doesn't abort the rest. A
 * cron_runs row records the outcome; a recent-running guard avoids overlap
 * (pg_cron fires serially, but ticks that run long shouldn't stack).
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { processSegments } from "@/lib/engine/segments-job";
import { processTriggerEvents } from "@/lib/engine/triggers";
import { processDueEnrollments } from "@/lib/engine/sequences";
import { processDueRecaps } from "@/lib/engine/recaps";
import { refreshExpiringTokens } from "@/lib/quickbooks/refresh-job";

export type TickReport = {
  skipped?: boolean;
  segments?: number;
  triggers?: number;
  sequences?: number;
  recaps?: number;
  qbRefreshed?: number;
  errors?: Record<string, string>;
};

const RECENT_RUNNING_MINUTES = 5;

export async function runTick(supabase: SupabaseClient): Promise<TickReport> {
  // Overlap guard: bail if another tick has been running recently.
  const cutoff = new Date(Date.now() - RECENT_RUNNING_MINUTES * 60_000).toISOString();
  const { data: running } = await supabase
    .from("cron_runs")
    .select("id")
    .eq("job", "tick")
    .eq("status", "running")
    .gte("started_at", cutoff)
    .limit(1);
  if (running && running.length) return { skipped: true };

  const { data: run } = await supabase
    .from("cron_runs")
    .insert({ job: "tick", status: "running" })
    .select("id")
    .single();
  const runId = run?.id;

  const report: TickReport = { errors: {} };

  const phase = async (name: keyof TickReport, fn: () => Promise<number>) => {
    try {
      (report[name] as number) = await fn();
    } catch (err) {
      report.errors![name] = err instanceof Error ? err.message : String(err);
    }
  };

  await phase("segments", () => processSegments(supabase));
  await phase("triggers", () => processTriggerEvents(supabase));
  await phase("sequences", () => processDueEnrollments(supabase));
  await phase("recaps", () => processDueRecaps(supabase));
  await phase("qbRefreshed", () => refreshExpiringTokens(supabase));

  const totalProcessed =
    (report.segments ?? 0) +
    (report.triggers ?? 0) +
    (report.sequences ?? 0) +
    (report.recaps ?? 0) +
    (report.qbRefreshed ?? 0);
  const hadErrors = Object.keys(report.errors!).length > 0;

  if (runId) {
    await supabase
      .from("cron_runs")
      .update({
        finished_at: new Date().toISOString(),
        status: hadErrors ? "error" : "ok",
        items_processed: totalProcessed,
        error: hadErrors ? JSON.stringify(report.errors) : null,
      })
      .eq("id", runId);
  }

  if (!hadErrors) delete report.errors;
  return report;
}
