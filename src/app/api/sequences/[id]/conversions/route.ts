/**
 * GET /api/sequences/[id]/conversions — conversions attributed to this sequence
 * (so you can see exactly which deals/clients a campaign produced).
 */

import { route, requireAdmin, json, assertOk } from "@/lib/api";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const GET = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("conversions")
    .select(
      "*, contact:contacts(id,full_name), company:companies(id,name), client:clients(id)",
    )
    .eq("sequence_id", params.id)
    .order("occurred_at", { ascending: false });
  assertOk(error);
  return json({ data });
});
