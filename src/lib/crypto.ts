/**
 * Symmetric encryption for secrets stored at rest (QuickBooks OAuth tokens).
 *
 * AES-256-GCM with a random 12-byte IV per message and the built-in auth tag,
 * so each ciphertext is self-verifying and tamper-evident. The key comes from
 * TOKEN_ENCRYPTION_KEY (32 bytes, base64). Output format is a single string:
 *   v1:<iv-b64>:<authTag-b64>:<ciphertext-b64>
 * The version prefix lets us rotate algorithms/keys later without ambiguity.
 */

import "server-only";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";
import { serverEnv } from "@/lib/env";

const ALGORITHM = "aes-256-gcm";
const IV_BYTES = 12;
const VERSION = "v1";

function getKey(): Buffer {
  const key = Buffer.from(serverEnv.tokenEncryptionKey, "base64");
  if (key.length !== 32) {
    throw new Error(
      "TOKEN_ENCRYPTION_KEY must decode to 32 bytes (generate with: openssl rand -base64 32).",
    );
  }
  return key;
}

/** Encrypt a UTF-8 string. Returns the versioned, base64 envelope. */
export function encrypt(plaintext: string): string {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();
  return [
    VERSION,
    iv.toString("base64"),
    authTag.toString("base64"),
    ciphertext.toString("base64"),
  ].join(":");
}

/** Decrypt an envelope produced by `encrypt`. Throws if tampered or malformed. */
export function decrypt(envelope: string): string {
  const parts = envelope.split(":");
  if (parts.length !== 4 || parts[0] !== VERSION) {
    throw new Error("Malformed or unsupported ciphertext envelope.");
  }
  const [, ivB64, tagB64, dataB64] = parts;
  const decipher = createDecipheriv(
    ALGORITHM,
    getKey(),
    Buffer.from(ivB64, "base64"),
  );
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]);
  return plaintext.toString("utf8");
}
