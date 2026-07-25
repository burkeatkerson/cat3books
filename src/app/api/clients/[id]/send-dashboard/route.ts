/**
 * POST /api/clients/[id]/send-dashboard — one-click "email this client their
 * dashboard" (with current KPI snapshot + private link).
 */

import { route, requireAdmin, json } from "@/lib/api";
import { sendClientDashboardEmail } from "@/lib/clients/dashboard-email";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const POST = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const messageId = await sendClientDashboardEmail(supabase, params.id, "dashboard");
  return json({ ok: true, messageId });
});
