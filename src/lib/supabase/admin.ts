/**
 * Service-role Supabase client. SERVER ONLY.
 *
 * Bypasses Row-Level Security, so use it ONLY for trusted backend work where
 * access is already scoped in code: the cron/automation engine, QuickBooks
 * sync, the token-gated dashboard lookup, and other system tasks that have no
 * logged-in user. Never expose results indiscriminately — the caller is
 * responsible for filtering to the correct tenant (e.g. by dashboard token).
 */

import "server-only";
import { createClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

let cached: ReturnType<typeof createClient<Database>> | null = null;

export function createAdminClient() {
  if (cached) return cached;
  cached = createClient<Database>(
    serverEnv.supabaseUrl,
    serverEnv.supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
  return cached;
}
