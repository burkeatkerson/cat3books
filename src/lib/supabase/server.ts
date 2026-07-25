/**
 * Supabase client for server components and route handlers.
 *
 * Uses the anon key + the request's auth cookie, so every query runs as the
 * logged-in user and is subject to Row-Level Security. This is the client to
 * use for anything that should respect the admin/client permission boundary.
 */

import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/public-env";
import type { Database } from "@/lib/supabase/types";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // `setAll` is called from a Server Component, where mutating cookies
            // is disallowed. Safe to ignore — middleware refreshes the session.
          }
        },
      },
    },
  );
}
