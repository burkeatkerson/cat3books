/**
 * The single email entry point used by the CRM, the drip engine, and client
 * dashboards. Responsibilities:
 *   1. suppression check (legal),
 *   2. personalization-token rendering,
 *   3. unsubscribe footer (marketing) + open/click tracking,
 *   4. full send logging to email_messages,
 *   5. delegate delivery to the configured EmailProvider.
 *
 * Uses the service-role client so it works from cron with no logged-in user.
 * Swap providers by changing the `provider` binding below.
 */

import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { serverEnv } from "@/lib/env";
import { gmailProvider } from "@/lib/email/gmail";
import {
  renderTokens,
  wrapLinks,
  trackingPixel,
  unsubscribeFooter,
} from "@/lib/email/render";
import type { EmailProvider } from "@/lib/email/types";
import type { SupabaseClient } from "@supabase/supabase-js";

const provider: EmailProvider = gmailProvider;

export type EmailCategory =
  | "campaign"
  | "sequence"
  | "dashboard"
  | "recap"
  | "welcome"
  | "transactional";

// Subject to the "marketing" suppression scope (unsubscribe).
const MARKETING: EmailCategory[] = ["campaign", "sequence"];
// Categories that get open/click tracking.
const TRACKED: EmailCategory[] = ["campaign", "sequence", "dashboard", "recap"];

export type SendEmailInput = {
  to: { email: string; contactId?: string | null };
  subject: string;
  html: string;
  text?: string;
  category: EmailCategory;
  from?: { name?: string; email?: string };
  related?: { type: string; id: string };
  context?: Record<string, unknown>;
  threadId?: string;
};

export type SendEmailResult = {
  id: string;
  status: "sent" | "failed" | "suppressed";
};

export async function sendEmail(
  input: SendEmailInput,
  client?: SupabaseClient,
): Promise<SendEmailResult> {
  const supabase = client ?? createAdminClient();

  const fromEmail = input.from?.email ?? serverEnv.gmailSender;
  const fromHeader = input.from?.name
    ? `${input.from.name} <${fromEmail}>`
    : fromEmail;

  const subject = renderTokens(input.subject, input.context ?? {});
  const isMarketing = MARKETING.includes(input.category);
  const isTracked = TRACKED.includes(input.category);

  // 1. Suppression check.
  const { data: supp } = await supabase
    .from("suppressions")
    .select("scope")
    .eq("email", input.to.email)
    .maybeSingle();
  const blocked =
    supp && (supp.scope === "all" || (supp.scope === "marketing" && isMarketing));

  // 2. Log row (queued) — gives us the id used in tracking links.
  const { data: row, error: insErr } = await supabase
    .from("email_messages")
    .insert({
      to_contact_id: input.to.contactId ?? null,
      to_email: input.to.email,
      from_email: fromEmail,
      subject,
      category: input.category,
      related_type: input.related?.type ?? null,
      related_id: input.related?.id ?? null,
      status: blocked ? "failed" : "queued",
      error: blocked ? "suppressed" : null,
    })
    .select("id")
    .single();
  if (insErr) throw new Error(`email log insert failed: ${insErr.message}`);
  const id = row.id as string;

  if (blocked) return { id, status: "suppressed" };

  // 3. Build final HTML: tokens -> footer -> link wrap -> pixel.
  let html = renderTokens(input.html, input.context ?? {});
  if (isMarketing) html += unsubscribeFooter(input.to.email);
  if (isTracked) {
    html = wrapLinks(html, id);
    html += trackingPixel(id);
  }
  const text = input.text ? renderTokens(input.text, input.context ?? {}) : undefined;

  await supabase
    .from("email_messages")
    .update({ body_html: html, body_text: text ?? null })
    .eq("id", id);

  // 4. Deliver.
  try {
    const res = await provider.send({
      from: fromHeader,
      to: input.to.email,
      subject,
      html,
      text,
      threadId: input.threadId,
    });
    await supabase
      .from("email_messages")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
        provider: provider.name,
        provider_message_id: res.providerMessageId,
        gmail_thread_id: res.threadId ?? null,
      })
      .eq("id", id);
    return { id, status: "sent" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await supabase
      .from("email_messages")
      .update({ status: "failed", error: message })
      .eq("id", id);
    throw err;
  }
}
