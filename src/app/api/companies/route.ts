/**
 * /api/companies — list (with lifecycle/owner/search filters) and create.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { companyCreate } from "@/lib/validation";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const { supabase } = await requireAdmin();
  const url = new URL(request.url);
  const lifecycle = url.searchParams.get("lifecycle");
  const owner = url.searchParams.get("owner");
  const q = url.searchParams.get("q");
  const limit = Math.min(Number(url.searchParams.get("limit")) || 100, 500);
  const offset = Number(url.searchParams.get("offset")) || 0;

  let query = supabase
    .from("companies")
    .select(
      "*, pipeline_stage:pipeline_stages(id,name,probability), contacts:contacts(count)",
      { count: "exact" },
    )
    .order("name", { ascending: true })
    .range(offset, offset + limit - 1);

  if (lifecycle) query = query.eq("lifecycle_status", lifecycle);
  if (owner) query = query.eq("owner_label", owner);
  if (q) query = query.textSearch("search", q, { type: "websearch" });

  const { data, error, count } = await query;
  assertOk(error);
  return json({ data, count });
});

export const POST = route(async (request) => {
  const { supabase, email } = await requireAdmin();
  const body = await parseBody(request, companyCreate);

  const { data, error } = await supabase
    .from("companies")
    .insert(body)
    .select()
    .single();
  assertOk(error);

  await supabase.from("activities").insert({
    activity_type: "system",
    actor: email ?? "Admin",
    company_id: data.id,
    body: `Added ${data.name} as a ${data.lifecycle_status}`,
  });

  return json({ data }, { status: 201 });
});
