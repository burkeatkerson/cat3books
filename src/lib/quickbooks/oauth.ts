/**
 * QuickBooks Online OAuth2. Thin fetch-based wrapper around Intuit's endpoints
 * (no extra dependency). Handles the authorize URL, the code→token exchange,
 * and refresh.
 */

import "server-only";
import { serverEnv } from "@/lib/env";

const AUTHORIZE_URL = "https://appcenter.intuit.com/connect/oauth2";
const TOKEN_URL =
  "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

export type QbTokens = {
  accessToken: string;
  refreshToken: string;
  /** seconds */
  expiresIn: number;
  refreshExpiresIn: number;
};

export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: serverEnv.qboClientId,
    response_type: "code",
    scope: serverEnv.qboScopes,
    redirect_uri: serverEnv.qboRedirectUri,
    state,
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

function basicAuthHeader(): string {
  const creds = `${serverEnv.qboClientId}:${serverEnv.qboClientSecret}`;
  return `Basic ${Buffer.from(creds).toString("base64")}`;
}

async function tokenRequest(body: URLSearchParams): Promise<QbTokens> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(),
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  if (!res.ok) {
    throw new Error(`QB token request failed (${res.status}): ${await res.text()}`);
  }
  const json = await res.json();
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresIn: json.expires_in,
    refreshExpiresIn: json.x_refresh_token_expires_in,
  };
}

export function exchangeCodeForTokens(code: string): Promise<QbTokens> {
  return tokenRequest(
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: serverEnv.qboRedirectUri,
    }),
  );
}

export function refreshTokens(refreshToken: string): Promise<QbTokens> {
  return tokenRequest(
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  );
}

export function apiBaseUrl(): string {
  return serverEnv.qboEnvironment === "production"
    ? "https://quickbooks.api.intuit.com"
    : "https://sandbox-quickbooks.api.intuit.com";
}
