/**
 * /api/tasks/[id] — update (toggle done sets/clears completed_at) and delete.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { taskUpdate } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const PATCH = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const body = await parseBody(request, taskUpdate);

  const patch: Record<string, unknown> = { ...body };
  if (body.status === "done") patch.completed_at = new Date().toISOString();
  if (body.status === "open") patch.completed_at = null;

  const { data, error } = await supabase
    .from("tasks")
    .update(patch)
    .eq("id", params.id)
    .select()
    .single();
  assertOk(error);
  return json({ data });
});

export const DELETE = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("tasks").delete().eq("id", params.id);
  assertOk(error);
  return json({ ok: true });
});
