/**
 * Authenticated QuickBooks API access for a client.
 *
 * `ensureFreshToken` decrypts the stored tokens, refreshes when near expiry, and
 * persists the rotated (re-encrypted) tokens. `qbFetch` calls the QB API with a
 * guaranteed-fresh access token. Tokens never leave the server in plaintext.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { encrypt, decrypt } from "@/lib/crypto";
import { refreshTokens, apiBaseUrl } from "@/lib/quickbooks/oauth";

// Refresh if the access token expires within this buffer.
const EXPIRY_BUFFER_MS = 5 * 60_000;

type Connection = {
  client_id: string;
  realm_id: string;
  access_token_encrypted: string;
  refresh_token_encrypted: string;
  token_expires_at: string | null;
};

export type FreshToken = { accessToken: string; realmId: string };

export async function ensureFreshToken(
  supabase: SupabaseClient,
  clientId: string,
  opts: { force?: boolean } = {},
): Promise<FreshToken> {
  const { data: conn, error } = await supabase
    .from("qb_connections")
    .select(
      "client_id, realm_id, access_token_encrypted, refresh_token_encrypted, token_expires_at",
    )
    .eq("client_id", clientId)
    .single();
  if (error || !conn) throw new Error("No QuickBooks connection for client");

  const connection = conn as Connection;
  const expiresAt = connection.token_expires_at
    ? new Date(connection.token_expires_at).getTime()
    : 0;
  const needsRefresh =
    opts.force || Date.now() + EXPIRY_BUFFER_MS >= expiresAt;

  if (!needsRefresh) {
    return {
      accessToken: decrypt(connection.access_token_encrypted),
      realmId: connection.realm_id,
    };
  }

  // Refresh + rotate.
  const refreshToken = decrypt(connection.refresh_token_encrypted);
  const tokens = await refreshTokens(refreshToken);
  const now = Date.now();
  await supabase
    .from("qb_connections")
    .update({
      access_token_encrypted: encrypt(tokens.accessToken),
      refresh_token_encrypted: encrypt(tokens.refreshToken),
      token_expires_at: new Date(now + tokens.expiresIn * 1000).toISOString(),
      refresh_expires_at: new Date(
        now + tokens.refreshExpiresIn * 1000,
      ).toISOString(),
      sync_status: "token_refreshed",
      sync_error: null,
    })
    .eq("client_id", clientId);

  return { accessToken: tokens.accessToken, realmId: connection.realm_id };
}

export async function qbFetch<T = unknown>(
  supabase: SupabaseClient,
  clientId: string,
  path: string,
): Promise<T> {
  const { accessToken, realmId } = await ensureFreshToken(supabase, clientId);
  const url = `${apiBaseUrl()}/v3/company/${realmId}/${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`QB API ${path} failed (${res.status}): ${await res.text()}`);
  }
  return (await res.json()) as T;
}
