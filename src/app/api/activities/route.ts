/**
 * /api/activities — the activity feed (filterable by entity) and manual logging
 * (notes, calls, etc.).
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { activityCreate } from "@/lib/validation";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const { supabase } = await requireAdmin();
  const url = new URL(request.url);
  const limit = Math.min(Number(url.searchParams.get("limit")) || 50, 200);
  const companyId = url.searchParams.get("company_id");
  const contactId = url.searchParams.get("contact_id");
  const clientId = url.searchParams.get("client_id");

  let query = supabase
    .from("activities")
    .select(
      "*, company:companies(id,name), contact:contacts(id,full_name)",
    )
    .order("occurred_at", { ascending: false })
    .limit(limit);

  if (companyId) query = query.eq("company_id", companyId);
  if (contactId) query = query.eq("contact_id", contactId);
  if (clientId) query = query.eq("client_id", clientId);

  const { data, error } = await query;
  assertOk(error);
  return json({ data });
});

export const POST = route(async (request) => {
  const { supabase, email } = await requireAdmin();
  const body = await parseBody(request, activityCreate);
  const { data, error } = await supabase
    .from("activities")
    .insert({ actor: email ?? "Admin", ...body })
    .select()
    .single();
  assertOk(error);
  return json({ data }, { status: 201 });
});
