/**
 * GET /api/sequences — list all sequences (campaigns + automations) with their
 * step count. Authoring is via code + `campaigns:sync`, so there is no POST.
 */

import { route, requireAdmin, json, assertOk } from "@/lib/api";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const { supabase } = await requireAdmin();
  const kind = new URL(request.url).searchParams.get("kind"); // campaign|automation

  let query = supabase
    .from("sequences")
    .select(
      "*, steps:sequence_steps(count), target_segment:segments(id,name)",
    )
    .order("created_at", { ascending: false });
  if (kind) query = query.eq("kind", kind);

  const { data, error } = await query;
  assertOk(error);
  return json({ data });
});
