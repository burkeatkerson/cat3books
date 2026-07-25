/**
 * Refresh QuickBooks access tokens that are near expiry, so syncs never fail on
 * a stale token. Implemented against the QB OAuth client in this same folder.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ensureFreshToken } from "@/lib/quickbooks/client";

// Refresh tokens expiring within this window.
const WINDOW_MINUTES = 30;

export async function refreshExpiringTokens(
  supabase: SupabaseClient,
): Promise<number> {
  const cutoff = new Date(Date.now() + WINDOW_MINUTES * 60_000).toISOString();
  const { data: connections } = await supabase
    .from("qb_connections")
    .select("client_id, token_expires_at")
    .lte("token_expires_at", cutoff);

  let refreshed = 0;
  for (const conn of (connections ?? []) as { client_id: string }[]) {
    try {
      await ensureFreshToken(supabase, conn.client_id, { force: true });
      refreshed++;
    } catch {
      // Leave for the next tick; a persistently failing token surfaces in sync.
    }
  }
  return refreshed;
}
