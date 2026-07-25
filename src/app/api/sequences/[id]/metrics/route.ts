/**
 * GET /api/sequences/[id]/metrics — funnel + enrollment-state counts + open
 * rate + conversion counts for a single sequence.
 */

import { route, requireAdmin, json } from "@/lib/api";
import { computeSequenceMetrics } from "@/lib/campaigns/metrics";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const GET = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const metrics = await computeSequenceMetrics(supabase, params.id);
  return json({ data: metrics });
});
