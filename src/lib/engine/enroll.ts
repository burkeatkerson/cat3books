/**
 * Enroll a contact into a sequence.
 *
 * Computes the first `next_run_at` from step 0's delay (delay = wait-before-step)
 * and respects the partial unique index that prevents duplicate active
 * enrollments. Returns the new enrollment id, or null if the contact was
 * already enrolled (and re-enrollment isn't allowed).
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { addDelay } from "@/lib/engine/util";

type EnrollOptions = {
  by: "manual" | "trigger";
  triggerEventId?: string | null;
  allowReenroll?: boolean;
};

export async function enrollContact(
  supabase: SupabaseClient,
  sequenceId: string,
  contactId: string,
  opts: EnrollOptions,
): Promise<string | null> {
  // If re-enrollment is allowed, clear any prior terminal enrollment row first
  // so the partial unique index (active/paused only) doesn't block re-insert.
  // Active/paused enrollments always block (you can't be in twice).
  const { data: current } = await supabase
    .from("enrollments")
    .select("id, status")
    .eq("sequence_id", sequenceId)
    .eq("contact_id", contactId)
    .order("enrolled_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (current) {
    if (current.status === "active" || current.status === "paused") return null;
    if (!opts.allowReenroll) return null;
  }

  const { data: steps } = await supabase
    .from("sequence_steps")
    .select("delay_amount, delay_unit, step_order")
    .eq("sequence_id", sequenceId)
    .order("step_order", { ascending: true });

  const first = steps?.[0] as
    | { delay_amount: number; delay_unit: "minutes" | "hours" | "days" }
    | undefined;
  const now = new Date();
  const nextRunAt = first
    ? addDelay(now, first.delay_amount, first.delay_unit)
    : now;

  const { data, error } = await supabase
    .from("enrollments")
    .insert({
      sequence_id: sequenceId,
      contact_id: contactId,
      status: steps && steps.length ? "active" : "completed",
      current_step_order: 0,
      next_run_at: nextRunAt.toISOString(),
      enrolled_by: opts.by,
      trigger_event_id: opts.triggerEventId ?? null,
      completed_at: steps && steps.length ? null : now.toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    // 23505 = unique violation (raced another enroll). Treat as already enrolled.
    if (error.code === "23505") return null;
    throw new Error(`enroll failed: ${error.message}`);
  }

  await supabase.from("activities").insert({
    activity_type: "enrolled",
    actor: "Automation",
    contact_id: contactId,
    body: "Enrolled in a sequence",
    meta: { sequence_id: sequenceId },
  });

  return data.id;
}
