/**
 * /api/segments — list and create. A segment groups companies/contacts/clients
 * by a JSON criteria tree (dynamic) or an explicit membership list (static),
 * and is what campaigns target.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { segmentInput } from "@/lib/validation";

export const dynamic = "force-dynamic";

export const GET = route(async () => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("segments")
    .select("*, member_count:segment_members(count)")
    .order("created_at", { ascending: false });
  assertOk(error);
  return json({ data });
});

export const POST = route(async (request) => {
  const { supabase } = await requireAdmin();
  const body = await parseBody(request, segmentInput);
  const { data, error } = await supabase
    .from("segments")
    .insert(body)
    .select()
    .single();
  assertOk(error);
  return json({ data }, { status: 201 });
});
