/**
 * GET /api/conversions — all conversions, filterable by type / sequence / date.
 */

import { route, requireAdmin, json, assertOk } from "@/lib/api";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const { supabase } = await requireAdmin();
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const sequenceId = url.searchParams.get("sequence_id");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  let query = supabase
    .from("conversions")
    .select(
      "*, contact:contacts(id,full_name), company:companies(id,name), sequence:sequences(id,name)",
    )
    .order("occurred_at", { ascending: false })
    .limit(500);

  if (type) query = query.eq("conversion_type", type);
  if (sequenceId) query = query.eq("sequence_id", sequenceId);
  if (from) query = query.gte("occurred_at", from);
  if (to) query = query.lte("occurred_at", to);

  const { data, error } = await query;
  assertOk(error);
  return json({ data });
});
