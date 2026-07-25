/**
 * Compute campaign/sequence metrics from the email + enrollment + conversion
 * logs (nothing is precomputed/denormalized). Powers the monitoring views the
 * admin uses to watch performance and attribute conversions.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type SequenceMetrics = {
  enrollments: Record<string, number>; // by status
  totalEnrolled: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  openRate: number;
  conversions: number;
  conversionsByType: Record<string, number>;
};

export async function computeSequenceMetrics(
  supabase: SupabaseClient,
  sequenceId: string,
): Promise<SequenceMetrics> {
  // Enrollment state counts.
  const { data: enrollRows } = await supabase
    .from("enrollments")
    .select("status")
    .eq("sequence_id", sequenceId);
  const enrollments: Record<string, number> = {};
  for (const r of enrollRows ?? [])
    enrollments[r.status] = (enrollments[r.status] ?? 0) + 1;

  // Emails tied to this sequence.
  const { data: messages } = await supabase
    .from("email_messages")
    .select("id, status")
    .eq("related_type", "sequence")
    .eq("related_id", sequenceId);
  const messageIds = (messages ?? []).map((m: { id: string }) => m.id);
  const sent = (messages ?? []).filter((m: { status: string }) => m.status === "sent").length;

  // Engagement events.
  let delivered = 0;
  const openedSet = new Set<string>();
  const clickedSet = new Set<string>();
  let replied = 0;
  if (messageIds.length) {
    const { data: events } = await supabase
      .from("email_events")
      .select("email_message_id, event_type")
      .in("email_message_id", messageIds);
    for (const e of events ?? []) {
      if (e.event_type === "delivered") delivered++;
      else if (e.event_type === "open") openedSet.add(e.email_message_id);
      else if (e.event_type === "click") clickedSet.add(e.email_message_id);
      else if (e.event_type === "reply") replied++;
    }
  }

  // Conversions attributed to this sequence.
  const { data: convs } = await supabase
    .from("conversions")
    .select("conversion_type")
    .eq("sequence_id", sequenceId);
  const conversionsByType: Record<string, number> = {};
  for (const c of convs ?? [])
    conversionsByType[c.conversion_type] =
      (conversionsByType[c.conversion_type] ?? 0) + 1;

  return {
    enrollments,
    totalEnrolled: enrollRows?.length ?? 0,
    sent,
    delivered,
    opened: openedSet.size,
    clicked: clickedSet.size,
    replied,
    openRate: sent ? Math.round((openedSet.size / sent) * 100) : 0,
    conversions: convs?.length ?? 0,
    conversionsByType,
  };
}
