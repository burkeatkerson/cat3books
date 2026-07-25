/**
 * Edge middleware.
 *
 * Responsibilities:
 *   - Rewrite the admin subdomain (admin.cat3books.com) to /admin/* so the
 *     admin app can live under one route tree without a separate deployment.
 *   - Refresh the Supabase session and gate /admin/* to the admin role.
 *
 * Everything else (marketing pages, token dashboards, public + cron APIs) is
 * left untouched. Cron/dashboard/unsubscribe/tracking/QB-callback APIs are
 * matched by the gate's path rules below and are NOT session-protected — they
 * enforce their own auth (CRON_SECRET, opaque token, signed link, OAuth state).
 */

import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { publicEnv } from "@/lib/public-env";

export async function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0];
  const { pathname } = request.nextUrl;

  // Admin subdomain → internally serve /admin/* (URLs stay on the subdomain).
  let rewriteUrl: URL | null = null;
  let logicalPath = pathname;

  const onAdminSubdomain = host === publicEnv.adminHost;
  if (
    onAdminSubdomain &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api")
  ) {
    rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/admin${pathname === "/" ? "" : pathname}`;
    logicalPath = rewriteUrl.pathname;
  }

  return updateSession(request, { logicalPath, rewriteUrl });
}

export const config = {
  // Run on everything except Next internals and static asset files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|map)$).*)",
  ],
};
