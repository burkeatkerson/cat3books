/**
 * Supabase client for the browser (the admin login form).
 *
 * Uses only the public URL + anon key, both safe to ship to the client. All
 * privileged work happens server-side behind RLS or the service-role client.
 */

"use client";

import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/public-env";
import type { Database } from "@/lib/supabase/types";

export function createClient() {
  return createBrowserClient<Database>(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey,
  );
}
