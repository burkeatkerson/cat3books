/**
 * Auth helpers for endpoints that may be invoked headlessly (cron, the sync
 * script) as well as by a logged-in admin.
 */

import "server-only";
import { timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { ApiError, requireAdmin } from "@/lib/api";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Constant-time check of a Bearer token against CRON_SECRET. */
export function hasCronSecret(request: Request): boolean {
  const header = request.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (!token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(serverEnv.cronSecret);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Require the CRON_SECRET; throws 401 otherwise. Returns the service client. */
export function requireCron(request: Request): SupabaseClient {
  if (!hasCronSecret(request)) throw new ApiError(401, "Unauthorized (cron)");
  return createAdminClient();
}

/**
 * Allow either a signed-in admin (RLS-bound client) or a CRON_SECRET bearer
 * (service-role client). Used by the campaigns sync endpoint.
 */
export async function authorizeAdminOrCron(
  request: Request,
): Promise<SupabaseClient> {
  if (hasCronSecret(request)) return createAdminClient();
  const { supabase } = await requireAdmin();
  return supabase;
}
