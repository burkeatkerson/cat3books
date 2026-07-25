/**
 * Email rendering: personalization tokens, click-tracking link wrapping,
 * the open-tracking pixel, and the legal unsubscribe footer.
 */

import "server-only";
import { publicEnv } from "@/lib/public-env";
import { createUnsubscribeUrl } from "@/lib/email/unsubscribe";

/** Replace {{a.b}} tokens from a nested context object. Unknown tokens blank. */
export function renderTokens(
  template: string,
  context: Record<string, unknown>,
): string {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, path: string) => {
    const value = path
      .split(".")
      .reduce<unknown>(
        (acc, key) =>
          acc && typeof acc === "object"
            ? (acc as Record<string, unknown>)[key]
            : undefined,
        context,
      );
    return value == null ? "" : String(value);
  });
}

/** Rewrite <a href> through the click-tracking redirect for a given message. */
export function wrapLinks(html: string, messageId: string): string {
  return html.replace(
    /href="(https?:\/\/[^"]+)"/gi,
    (_m, url: string) =>
      `href="${publicEnv.appUrl}/api/email/track/click/${messageId}?u=${encodeURIComponent(
        url,
      )}"`,
  );
}

/** 1x1 transparent open-tracking pixel for a message. */
export function trackingPixel(messageId: string): string {
  return `<img src="${publicEnv.appUrl}/api/email/track/open/${messageId}.png" width="1" height="1" alt="" style="display:none" />`;
}

/** CAN-SPAM-style unsubscribe footer with a signed link. */
export function unsubscribeFooter(toEmail: string): string {
  const url = createUnsubscribeUrl(toEmail);
  return `<div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e5e5;font:12px/1.5 -apple-system,sans-serif;color:#999">
    Cat3 Books · You're receiving this because you're a contact of Cat3 Books.
    <a href="${url}" style="color:#999">Unsubscribe</a>.
  </div>`;
}
