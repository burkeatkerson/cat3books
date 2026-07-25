/**
 * Process due enrollments: for each active enrollment whose next_run_at has
 * passed and whose sequence is active, run the current step, record the audit
 * row, and advance (or terminate). Delay = wait-before-step, so next_run_at for
 * the following step is computed from that step's delay.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { addDelay } from "@/lib/engine/util";
import { executeStep, type StepRow } from "@/lib/engine/steps";

export async function processDueEnrollments(
  supabase: SupabaseClient,
  limit = 200,
): Promise<number> {
  const now = new Date();
  const { data: due, error } = await supabase
    .from("enrollments")
    .select(
      "id, sequence_id, contact_id, current_step_order, sequence:sequences(id,status,from_name,from_email)",
    )
    .eq("status", "active")
    .lte("next_run_at", now.toISOString())
    .order("next_run_at", { ascending: true })
    .limit(limit);
  if (error) throw new Error(error.message);

  let processed = 0;
  for (const enr of due ?? []) {
    const seq = (enr as unknown as { sequence: { status: string } | null })
      .sequence;
    if (!seq || seq.status !== "active") continue; // paused/cancelled: skip
    await processOne(supabase, enr as unknown as EnrollmentRow);
    processed++;
  }
  return processed;
}

type EnrollmentRow = {
  id: string;
  sequence_id: string;
  contact_id: string;
  current_step_order: number;
  sequence: { id: string; from_name: string | null; from_email: string | null };
};

async function processOne(supabase: SupabaseClient, enr: EnrollmentRow) {
  const { data: steps } = await supabase
    .from("sequence_steps")
    .select("id, step_type, email_template_id, config, step_order, delay_amount, delay_unit")
    .eq("sequence_id", enr.sequence_id)
    .order("step_order", { ascending: true });

  const list = (steps ?? []) as (StepRow & {
    step_order: number;
    delay_amount: number;
    delay_unit: "minutes" | "hours" | "days";
  })[];

  const idx = enr.current_step_order;
  if (idx >= list.length) {
    await complete(supabase, enr.id);
    return;
  }

  // Load contact + company context for personalization/side-effects.
  const { data: contact } = await supabase
    .from("contacts")
    .select(
      "id, full_name, email, company_id, company:companies(name,service_focus,location_city,location_state)",
    )
    .eq("id", enr.contact_id)
    .single();
  if (!contact) {
    await complete(supabase, enr.id, "removed");
    return;
  }

  const step = list[idx];
  const result = await executeStep(
    supabase,
    step,
    {
      id: contact.id,
      full_name: contact.full_name,
      email: contact.email,
      company_id: contact.company_id,
    },
    (contact as unknown as { company: Record<string, string> | null }).company,
    enr.sequence,
  );

  await supabase.from("enrollment_step_runs").insert({
    enrollment_id: enr.id,
    sequence_step_id: step.id,
    status: result.status,
    email_message_id: result.emailMessageId ?? null,
    error: result.error ?? null,
  });

  const now = new Date();

  if (result.setEnrollmentStatus || result.terminal) {
    await supabase
      .from("enrollments")
      .update({
        status: result.setEnrollmentStatus ?? "completed",
        completed_at: now.toISOString(),
        last_step_at: now.toISOString(),
      })
      .eq("id", enr.id);
    return;
  }

  if (result.status === "failed") {
    await supabase
      .from("enrollments")
      .update({ status: "failed", last_step_at: now.toISOString() })
      .eq("id", enr.id);
    return;
  }

  // Advance to the next step.
  const nextIdx = idx + 1;
  if (nextIdx >= list.length) {
    await complete(supabase, enr.id);
    return;
  }
  const nextStep = list[nextIdx];
  const nextRunAt = addDelay(now, nextStep.delay_amount, nextStep.delay_unit);
  await supabase
    .from("enrollments")
    .update({
      current_step_order: nextIdx,
      next_run_at: nextRunAt.toISOString(),
      last_step_at: now.toISOString(),
    })
    .eq("id", enr.id);
}

async function complete(
  supabase: SupabaseClient,
  enrollmentId: string,
  status: "completed" | "removed" = "completed",
) {
  await supabase
    .from("enrollments")
    .update({ status, completed_at: new Date().toISOString() })
    .eq("id", enrollmentId);
}
