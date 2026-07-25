/**
 * /api/companies/[id] — fetch, update, delete a single company.
 */

import { route, requireAdmin, parseBody, json, assertOk, ApiError } from "@/lib/api";
import { companyUpdate } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const GET = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("companies")
    .select(
      "*, pipeline_stage:pipeline_stages(id,name,probability), contacts(*), client:clients(*)",
    )
    .eq("id", params.id)
    .single();
  if (error) throw new ApiError(404, "Company not found");
  return json({ data });
});

export const PATCH = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const body = await parseBody(request, companyUpdate);
  const { data, error } = await supabase
    .from("companies")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();
  assertOk(error);
  return json({ data });
});

export const DELETE = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("companies").delete().eq("id", params.id);
  assertOk(error);
  return json({ ok: true });
});
