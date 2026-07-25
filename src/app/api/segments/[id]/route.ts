/**
 * /api/segments/[id] — fetch, update, delete a segment.
 */

import { route, requireAdmin, parseBody, json, assertOk, ApiError } from "@/lib/api";
import { segmentInput } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const GET = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("segments")
    .select("*, member_count:segment_members(count)")
    .eq("id", params.id)
    .single();
  if (error) throw new ApiError(404, "Segment not found");
  return json({ data });
});

export const PATCH = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const body = await parseBody(request, segmentInput.partial());
  const { data, error } = await supabase
    .from("segments")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();
  assertOk(error);
  return json({ data });
});

export const DELETE = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("segments").delete().eq("id", params.id);
  assertOk(error);
  return json({ ok: true });
});
