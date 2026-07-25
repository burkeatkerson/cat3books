/**
 * Public configuration — safe to import anywhere (browser, edge, server).
 *
 * Only NEXT_PUBLIC_* values, which Next inlines at build time. Server-only
 * secrets live in `@/lib/env` (which is marked server-only).
 */

export const publicEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  adminHost: process.env.NEXT_PUBLIC_ADMIN_HOST ?? "admin.cat3books.com",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;
