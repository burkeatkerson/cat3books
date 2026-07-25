/**
 * /api/contacts/[id] — fetch (with activity timeline), update, delete.
 */

import { route, requireAdmin, parseBody, json, assertOk, ApiError } from "@/lib/api";
import { contactUpdate } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const GET = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("contacts")
    .select("*, company:companies(*)")
    .eq("id", params.id)
    .single();
  if (error) throw new ApiError(404, "Contact not found");

  const { data: timeline } = await supabase
    .from("activities")
    .select("*")
    .eq("contact_id", params.id)
    .order("occurred_at", { ascending: false })
    .limit(50);

  return json({ data: { ...data, timeline } });
});

export const PATCH = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const body = await parseBody(request, contactUpdate);
  const { data, error } = await supabase
    .from("contacts")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();
  assertOk(error);
  return json({ data });
});

export const DELETE = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("contacts").delete().eq("id", params.id);
  assertOk(error);
  return json({ ok: true });
});
