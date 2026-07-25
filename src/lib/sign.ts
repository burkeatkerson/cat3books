/**
 * Generic short-lived/stateless link signing (HMAC-SHA256), namespaced by a
 * `purpose` so a token minted for one use can't be replayed for another.
 *
 * Used for: the QuickBooks connect link emailed to a client, and the OAuth
 * `state` parameter. (Unsubscribe links have their own helper.)
 */

import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/lib/env";

function b64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function mac(purpose: string, value: string): string {
  return b64url(
    createHmac("sha256", serverEnv.unsubscribeSecret)
      .update(`${purpose}:${value}`)
      .digest(),
  );
}

/** Sign a value -> "<value>.<sig>". The value must not contain a dot. */
export function signValue(purpose: string, value: string): string {
  return `${value}.${mac(purpose, value)}`;
}

/** Verify a "<value>.<sig>" token; returns the value or null. */
export function verifyValue(purpose: string, token: string): string | null {
  const idx = token.lastIndexOf(".");
  if (idx < 0) return null;
  const value = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = mac(purpose, value);
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return value;
}
