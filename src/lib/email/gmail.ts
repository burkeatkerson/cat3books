/**
 * Gmail API email provider. Sends as the configured Workspace mailbox using an
 * OAuth2 refresh token. Implements the EmailProvider interface so it can be
 * swapped out without touching campaign/dashboard code.
 */

import "server-only";
import { google } from "googleapis";
import { serverEnv } from "@/lib/env";
import type { EmailProvider, OutgoingEmail, SendResult } from "@/lib/email/types";

function oauthClient() {
  const client = new google.auth.OAuth2(
    serverEnv.googleClientId,
    serverEnv.googleClientSecret,
  );
  client.setCredentials({ refresh_token: serverEnv.googleRefreshToken });
  return client;
}

/** Build a base64url-encoded RFC822 MIME message. */
function toRawMessage(msg: OutgoingEmail): string {
  const boundary = "c3b_" + Math.abs(hash(msg.subject + msg.to)).toString(36);
  const headers = [
    `From: ${msg.from}`,
    `To: ${msg.to}`,
    `Subject: ${encodeHeader(msg.subject)}`,
    "MIME-Version: 1.0",
    msg.inReplyTo ? `In-Reply-To: ${msg.inReplyTo}` : "",
    msg.inReplyTo ? `References: ${msg.inReplyTo}` : "",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean);

  const text = msg.text ?? stripHtml(msg.html);
  const body = [
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    text,
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    msg.html,
    `--${boundary}--`,
  ];

  const raw = [...headers, "", ...body].join("\r\n");
  return Buffer.from(raw)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function encodeHeader(value: string): string {
  // RFC2047 encode non-ASCII subject lines.
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value).toString("base64")}?=`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

export const gmailProvider: EmailProvider = {
  name: "gmail",
  async send(message: OutgoingEmail): Promise<SendResult> {
    const gmail = google.gmail({ version: "v1", auth: oauthClient() });
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: toRawMessage(message),
        threadId: message.threadId,
      },
    });
    return {
      providerMessageId: res.data.id ?? "",
      threadId: res.data.threadId ?? undefined,
    };
  },
};
