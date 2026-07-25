/**
 * POST /api/segments/[id]/refresh — recompute materialized membership for a
 * dynamic segment and return the diff (added/removed counts).
 */

import { route, requireAdmin, json, ApiError } from "@/lib/api";
import { refreshSegment } from "@/lib/segments/refresh";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const POST = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { data: segment, error } = await supabase
    .from("segments")
    .select("id, entity_type, is_dynamic, definition")
    .eq("id", params.id)
    .single();
  if (error) throw new ApiError(404, "Segment not found");

  const result = await refreshSegment(supabase, segment);
  return json({
    total: result.total,
    added: result.added.length,
    removed: result.removed.length,
  });
});
