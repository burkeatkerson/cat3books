/**
 * GET /api/dashboard/[token] — public, read-only client dashboard data.
 *
 * Isolation is enforced at the DATABASE layer: the get_dashboard_by_token
 * SECURITY DEFINER function returns ONLY the client matching the opaque token,
 * and nothing if the token is unknown. No auth, no other client's data is
 * reachable even with the service-role client.
 */

import { json, jsonError } from "@/lib/api";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { token: string } },
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("get_dashboard_by_token", {
    p_token: params.token,
  });
  if (error) return jsonError(500, "Failed to load dashboard");
  if (!data) return jsonError(404, "Dashboard not found");
  return json(data, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
