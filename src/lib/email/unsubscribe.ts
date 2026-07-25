/**
 * Stateless, signed unsubscribe links. No DB row needed to issue one — the
 * signature proves the link was minted by us, so anyone clicking it can only
 * unsubscribe the email it was issued for.
 *
 * Token format (URL-safe):  <base64url(email)>.<base64url(hmacSHA256)>
 */

import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/lib/env";
import { publicEnv } from "@/lib/public-env";

function b64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(s: string): Buffer {
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function sign(email: string): string {
  return b64url(
    createHmac("sha256", serverEnv.unsubscribeSecret)
      .update(email.toLowerCase())
      .digest(),
  );
}

export function createUnsubscribeToken(email: string): string {
  return `${b64url(Buffer.from(email.toLowerCase()))}.${sign(email)}`;
}

export function createUnsubscribeUrl(email: string): string {
  return `${publicEnv.appUrl}/api/unsubscribe?t=${encodeURIComponent(
    createUnsubscribeToken(email),
  )}`;
}

/** Returns the email if the token is valid, otherwise null. */
export function verifyUnsubscribeToken(token: string): string | null {
  const [emailPart, sigPart] = token.split(".");
  if (!emailPart || !sigPart) return null;
  const email = fromB64url(emailPart).toString("utf8");
  const expected = sign(email);
  const a = Buffer.from(expected);
  const b = Buffer.from(sigPart);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return email;
}
