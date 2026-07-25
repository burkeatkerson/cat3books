/**
 * /api/clients — list active/past clients with company + primary contact.
 * Clients are normally created via /api/companies/[id]/convert-to-client.
 */

import { route, requireAdmin, json, assertOk } from "@/lib/api";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const { supabase } = await requireAdmin();
  const url = new URL(request.url);
  const status = url.searchParams.get("status"); // active | past

  let query = supabase
    .from("clients")
    .select(
      "*, company:companies(id,name,service_focus,location_city,location_state,annual_revenue,lifecycle_status), primary_contact:contacts!clients_primary_contact_id_fkey(id,full_name,email)",
    )
    .order("started_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  assertOk(error);
  return json({ data });
});
