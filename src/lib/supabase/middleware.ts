/**
 * Session refresh + admin gate for middleware.
 *
 * On every matched request this:
 *   1. refreshes the Supabase auth cookie (so server components see a session),
 *   2. optionally rewrites to `rewriteUrl` (used for the admin subdomain), and
 *   3. enforces, for admin paths, that the user is signed in AND has the
 *      `admin` role — redirecting to /admin/login otherwise.
 *
 * `logicalPath` is the path the request should be *treated* as (after any
 * subdomain rewrite), which is what the admin gate is evaluated against.
 */

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/public-env";
import type { Database } from "@/lib/supabase/types";

// TODO: re-enable when admin auth/login is wired. While building the admin
// frontend (no login page yet) the role gate is disabled so /admin is viewable.
const ADMIN_AUTH_ENABLED = false;

type Options = {
  logicalPath: string;
  rewriteUrl: URL | null;
};

export async function updateSession(
  request: NextRequest,
  { logicalPath, rewriteUrl }: Options,
): Promise<NextResponse> {
  const build = () =>
    rewriteUrl
      ? NextResponse.rewrite(rewriteUrl, { request })
      : NextResponse.next({ request });

  let response = build();

  const supabase = createServerClient<Database>(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = build();
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute =
    logicalPath.startsWith("/admin") && logicalPath !== "/admin/login";

  if (ADMIN_AUTH_ENABLED && isAdminRoute) {
    if (!user) return redirectToLogin(request, logicalPath);

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return redirectToLogin(request, logicalPath);
    }
  }

  return response;
}

function redirectToLogin(request: NextRequest, nextPath: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", nextPath);
  return NextResponse.redirect(url);
}
