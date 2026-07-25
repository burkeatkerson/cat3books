/**
 * /api/contacts — list (with lifecycle/company/search filters, derived
 * last-touch) and create.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { contactCreate } from "@/lib/validation";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const { supabase } = await requireAdmin();
  const url = new URL(request.url);
  const lifecycle = url.searchParams.get("lifecycle");
  const companyId = url.searchParams.get("company_id");
  const q = url.searchParams.get("q");
  const limit = Math.min(Number(url.searchParams.get("limit")) || 100, 500);
  const offset = Number(url.searchParams.get("offset")) || 0;

  let query = supabase
    .from("contacts")
    .select("*, company:companies(id,name,lifecycle_status,tier:clients(tier,mrr))", {
      count: "exact",
    })
    .order("full_name", { ascending: true })
    .range(offset, offset + limit - 1);

  if (lifecycle) query = query.eq("lifecycle_status", lifecycle);
  if (companyId) query = query.eq("company_id", companyId);
  if (q) query = query.textSearch("search", q, { type: "websearch" });

  const { data, error, count } = await query;
  assertOk(error);

  // Merge derived last-touch (latest activity per contact).
  const ids = (data ?? []).map((c: { id: string }) => c.id);
  if (ids.length) {
    const { data: touches } = await supabase
      .from("contact_last_touch")
      .select("contact_id,last_touch_at")
      .in("contact_id", ids);
    const map = new Map(
      (touches ?? []).map((t: { contact_id: string; last_touch_at: string }) => [
        t.contact_id,
        t.last_touch_at,
      ]),
    );
    for (const c of data as { id: string; last_touch_at?: string | null }[]) {
      c.last_touch_at = map.get(c.id) ?? null;
    }
  }

  return json({ data, count });
});

export const POST = route(async (request) => {
  const { supabase, email } = await requireAdmin();
  const body = await parseBody(request, contactCreate);

  const { data, error } = await supabase
    .from("contacts")
    .insert(body)
    .select()
    .single();
  assertOk(error);

  await supabase.from("activities").insert({
    activity_type: "note",
    actor: email ?? "Admin",
    contact_id: data.id,
    company_id: data.company_id,
    body: `Added contact ${data.full_name}`,
  });

  return json({ data }, { status: 201 });
});
