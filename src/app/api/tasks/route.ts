/**
 * /api/tasks — list (filter by status) and create.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { taskCreate } from "@/lib/validation";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const { supabase } = await requireAdmin();
  const status = new URL(request.url).searchParams.get("status");
  let query = supabase
    .from("tasks")
    .select("*, company:companies(id,name), contact:contacts(id,full_name)")
    .order("due_date", { ascending: true, nullsFirst: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  assertOk(error);
  return json({ data });
});

export const POST = route(async (request) => {
  const { supabase } = await requireAdmin();
  const body = await parseBody(request, taskCreate);
  const { data, error } = await supabase
    .from("tasks")
    .insert(body)
    .select()
    .single();
  assertOk(error);
  return json({ data }, { status: 201 });
});
