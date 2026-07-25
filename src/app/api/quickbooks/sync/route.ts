/**
 * POST /api/quickbooks/sync — pull a client's QB data and recompute KPIs.
 * Callable by an admin or by cron (CRON_SECRET). Body: { client_id }.
 */

import { route, parseBody, json, ApiError } from "@/lib/api";
import { authorizeAdminOrCron } from "@/lib/cron-auth";
import { syncClient } from "@/lib/quickbooks/sync";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const body = z.object({ client_id: z.string().uuid() });

export const POST = route(async (request) => {
  const supabase = await authorizeAdminOrCron(request);
  const { client_id } = await parseBody(request, body);

  try {
    const summary = await syncClient(supabase, client_id);
    return json({ ok: true, ...summary });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await supabase
      .from("qb_connections")
      .update({ sync_status: "error", sync_error: message })
      .eq("client_id", client_id);
    throw new ApiError(502, `QuickBooks sync failed: ${message}`);
  }
});
