/**
 * GET /api/quickbooks/callback — Intuit OAuth redirect target.
 *
 * Verifies the signed `state`, exchanges the code for tokens, stores them
 * encrypted, links the realm to the client, fires a qb_connected event, and
 * shows a simple success page. Public (the client, not an admin, often lands
 * here) — trust comes from the signed state + the one-time code.
 */

import { route, ApiError } from "@/lib/api";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyValue } from "@/lib/sign";
import { encrypt } from "@/lib/crypto";
import { exchangeCodeForTokens } from "@/lib/quickbooks/oauth";

export const dynamic = "force-dynamic";

export const GET = route(async (request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const realmId = url.searchParams.get("realmId");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) return htmlResponse(`Connection cancelled: ${error}`, false);
  if (!code || !realmId || !state) throw new ApiError(400, "Missing OAuth params");

  const clientId = verifyValue("qb_state", state);
  if (!clientId) throw new ApiError(400, "Invalid state");

  const tokens = await exchangeCodeForTokens(code);
  const supabase = createAdminClient();
  const now = Date.now();

  const { error: upsertErr } = await supabase.from("qb_connections").upsert(
    {
      client_id: clientId,
      realm_id: realmId,
      access_token_encrypted: encrypt(tokens.accessToken),
      refresh_token_encrypted: encrypt(tokens.refreshToken),
      token_expires_at: new Date(now + tokens.expiresIn * 1000).toISOString(),
      refresh_expires_at: new Date(
        now + tokens.refreshExpiresIn * 1000,
      ).toISOString(),
      scopes: process.env.QBO_SCOPES ?? null,
      connected_at: new Date(now).toISOString(),
      sync_status: "connected",
      sync_error: null,
    },
    { onConflict: "client_id" },
  );
  if (upsertErr) throw new ApiError(500, upsertErr.message);

  await supabase.from("clients").update({ qb_realm_id: realmId }).eq("id", clientId);

  // Fire qb_connected so any automation can enroll the client's contacts.
  await supabase.from("trigger_events").insert({
    event_type: "qb_connected",
    entity_type: "client",
    entity_id: clientId,
    payload: { realm_id: realmId },
  });

  await supabase.from("activities").insert({
    activity_type: "system",
    actor: "System",
    client_id: clientId,
    body: "QuickBooks connected",
  });

  return htmlResponse("QuickBooks connected — you can close this window.", true);
});

function htmlResponse(message: string, ok: boolean) {
  const color = ok ? "#187A38" : "#b00020";
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>QuickBooks</title>
     <body style="font:16px/1.6 -apple-system,sans-serif;background:#101010;color:#EAE6D8;display:grid;place-items:center;height:100vh;margin:0">
     <div style="text-align:center"><div style="font-size:42px;color:${color}">${ok ? "✓" : "✕"}</div>
     <p>${message}</p></div></body>`,
    { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
