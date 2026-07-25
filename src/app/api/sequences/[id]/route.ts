/**
 * /api/sequences/[id]
 *   GET   — definition + steps + live metrics (read-only; content is code-owned)
 *   PATCH — the admin's only control: publish / pause / cancel
 */

import { route, requireAdmin, parseBody, json, assertOk, ApiError } from "@/lib/api";
import { computeSequenceMetrics } from "@/lib/campaigns/metrics";
import { enrollSequenceTarget } from "@/lib/engine/enroll-target";
import { z } from "zod";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const GET = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("sequences")
    .select(
      "*, steps:sequence_steps(*, template:email_templates(key,subject)), target_segment:segments(id,name)",
    )
    .eq("id", params.id)
    .single();
  if (error) throw new ApiError(404, "Sequence not found");
  const metrics = await computeSequenceMetrics(supabase, params.id);
  return json({ data: { ...data, metrics } });
});

const patchBody = z.object({
  action: z.enum(["publish", "pause", "cancel"]),
});

export const PATCH = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { action } = await parseBody(request, patchBody);

  const { data: seq, error } = await supabase
    .from("sequences")
    .select(
      "id, kind, status, launched_at, target_type, target_segment_id, target_lifecycle, target_contact_id, allow_reenroll",
    )
    .eq("id", params.id)
    .single();
  if (error) throw new ApiError(404, "Sequence not found");

  let enrolled = 0;

  if (action === "publish") {
    if (seq.status === "cancelled")
      throw new ApiError(409, "Cannot publish a cancelled sequence");
    const update: Record<string, unknown> = { status: "active" };
    if (!seq.launched_at) update.launched_at = new Date().toISOString();
    const { error: e } = await supabase
      .from("sequences")
      .update(update)
      .eq("id", params.id);
    assertOk(e);
    // Campaigns enroll their whole target on publish; automations wait for
    // their trigger to fire.
    if (seq.kind === "campaign") {
      enrolled = await enrollSequenceTarget(supabase, seq);
    }
  } else if (action === "pause") {
    const { error: e } = await supabase
      .from("sequences")
      .update({ status: "paused" })
      .eq("id", params.id);
    assertOk(e);
  } else {
    // cancel: stop the sequence and halt active/paused enrollments.
    const { error: e } = await supabase
      .from("sequences")
      .update({ status: "cancelled" })
      .eq("id", params.id);
    assertOk(e);
    await supabase
      .from("enrollments")
      .update({ status: "removed", completed_at: new Date().toISOString() })
      .eq("sequence_id", params.id)
      .in("status", ["active", "paused"]);
  }

  return json({ ok: true, action, enrolled });
});
