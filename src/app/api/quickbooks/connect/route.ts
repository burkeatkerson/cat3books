/**
 * GET /api/quickbooks/connect?cid=<clientId>&sig=<signed> — start QB OAuth.
 *
 * Authorized either by a signed link (the invite emailed to the client) or by a
 * logged-in admin. Redirects to Intuit with a signed `state` carrying the
 * client id, which the callback verifies.
 */

import { NextResponse } from "next/server";
import { route, ApiError } from "@/lib/api";
import { requireAdmin } from "@/lib/api";
import { signValue, verifyValue } from "@/lib/sign";
import { buildAuthorizeUrl } from "@/lib/quickbooks/oauth";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const url = new URL(request.url);
  const cid = url.searchParams.get("cid") ?? url.searchParams.get("client_id");
  const sig = url.searchParams.get("sig");
  if (!cid) throw new ApiError(400, "Missing client id");

  // Signed-link path (client-initiated) OR admin session path.
  const signedOk = sig != null && verifyValue("qb_connect", sig) === cid;
  if (!signedOk) {
    await requireAdmin(); // throws 401/403 if not an admin
  }

  const state = signValue("qb_state", cid);
  return NextResponse.redirect(buildAuthorizeUrl(state));
});
