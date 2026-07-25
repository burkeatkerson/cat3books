/**
 * GET /api/campaigns — overview of campaign-kind sequences with live metrics
 * (sent / open rate / replied / conversions), for the monitoring dashboard.
 */

import { route, requireAdmin, json, assertOk } from "@/lib/api";
import { computeSequenceMetrics } from "@/lib/campaigns/metrics";

export const dynamic = "force-dynamic";

export const GET = route(async () => {
  const { supabase } = await requireAdmin();
  const { data: campaigns, error } = await supabase
    .from("sequences")
    .select("*, steps:sequence_steps(count), target_segment:segments(id,name)")
    .eq("kind", "campaign")
    .order("created_at", { ascending: false });
  assertOk(error);

  const withMetrics = await Promise.all(
    (campaigns ?? []).map(async (c: { id: string }) => ({
      ...c,
      metrics: await computeSequenceMetrics(supabase, c.id),
    })),
  );
  return json({ data: withMetrics });
});
