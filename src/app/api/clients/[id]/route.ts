/**
 * /api/clients/[id] — full client detail (company, QB connection status, latest
 * KPIs, recent invoices) and update (tier, mrr, health, recap cadence, churn).
 */

import { route, requireAdmin, parseBody, json, assertOk, ApiError } from "@/lib/api";
import { clientUpdate } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const GET = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("clients")
    .select(
      `*,
       company:companies(*),
       primary_contact:contacts!clients_primary_contact_id_fkey(*),
       qb_connection:qb_connections(realm_id,last_sync_at,sync_status,token_expires_at),
       kpis:client_kpis(*),
       invoices:client_invoices(*)`,
    )
    .eq("id", params.id)
    .single();
  if (error) throw new ApiError(404, "Client not found");
  return json({ data });
});

export const PATCH = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const body = await parseBody(request, clientUpdate);

  // Mark the company past when the client churns, keeping lifecycle coherent.
  if (body.status === "past") {
    const { data: client } = await supabase
      .from("clients")
      .select("company_id")
      .eq("id", params.id)
      .single();
    if (client) {
      await supabase
        .from("companies")
        .update({ lifecycle_status: "past" })
        .eq("id", client.company_id);
    }
  }

  const { data, error } = await supabase
    .from("clients")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();
  assertOk(error);
  return json({ data });
});
