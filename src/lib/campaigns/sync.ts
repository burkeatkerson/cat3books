/**
 * Sync code-authored sequence definitions into the database.
 *
 * Idempotent and keyed by `key`. Crucially, it NEVER writes `status` on an
 * existing sequence — lifecycle (draft/active/paused/cancelled) is owned by the
 * admin. A `content_hash` short-circuits unchanged definitions. Steps are
 * children of a code-owned sequence and are replaced wholesale.
 */

import "server-only";
import { createHash } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sequenceDefinitions } from "@/lib/campaigns/definitions";
import type { SequenceDef, StepDef } from "@/lib/campaigns/define";

export type SyncOutcome = {
  key: string;
  action: "created" | "updated" | "unchanged";
  steps: number;
};

export async function syncCampaigns(
  supabase: SupabaseClient,
): Promise<SyncOutcome[]> {
  const outcomes: SyncOutcome[] = [];
  for (const def of sequenceDefinitions) {
    outcomes.push(await syncOne(supabase, def));
  }
  return outcomes;
}

async function syncOne(
  supabase: SupabaseClient,
  def: SequenceDef,
): Promise<SyncOutcome> {
  const contentHash = createHash("sha256")
    .update(JSON.stringify(def))
    .digest("hex");

  const { data: existing } = await supabase
    .from("sequences")
    .select("id, content_hash")
    .eq("key", def.key)
    .maybeSingle();

  if (existing && existing.content_hash === contentHash) {
    return { key: def.key, action: "unchanged", steps: def.steps.length };
  }

  // 1. Upsert templates, building a key -> id map.
  const templateIds = new Map<string, string>();
  for (const t of def.templates) {
    const { data, error } = await supabase
      .from("email_templates")
      .upsert(
        {
          key: t.key,
          source: "code",
          name: t.name ?? t.subject,
          subject: t.subject,
          body_html: t.bodyHtml,
          body_text: t.bodyText ?? null,
          from_name: t.fromName ?? def.fromName ?? null,
          from_email: t.fromEmail ?? def.fromEmail ?? null,
        },
        { onConflict: "key" },
      )
      .select("id")
      .single();
    if (error) throw new Error(`template ${t.key}: ${error.message}`);
    templateIds.set(t.key, data.id);
  }

  // 2. Resolve target.
  const target = def.target;
  let targetSegmentId: string | null = null;
  let targetLifecycle: string | null = null;
  if (target.type === "segment") {
    const { data: seg } = await supabase
      .from("segments")
      .select("id")
      .eq("name", target.segmentName)
      .maybeSingle();
    targetSegmentId = seg?.id ?? null;
  } else if (target.type === "lifecycle") {
    targetLifecycle = target.lifecycle;
  }

  const contentFields = {
    key: def.key,
    source: "code" as const,
    content_hash: contentHash,
    name: def.name,
    description: def.description ?? null,
    kind: def.kind,
    channel: "email",
    target_type: target.type,
    target_segment_id: targetSegmentId,
    target_lifecycle: targetLifecycle,
    trigger_type: def.trigger.type,
    trigger_config: def.trigger.config ?? {},
    from_name: def.fromName ?? null,
    from_email: def.fromEmail ?? null,
    allow_reenroll: def.allowReenroll ?? false,
  };

  // 3. Upsert the sequence — status is set only on first insert.
  let sequenceId: string;
  let action: SyncOutcome["action"];
  if (existing) {
    const { error } = await supabase
      .from("sequences")
      .update(contentFields)
      .eq("id", existing.id);
    if (error) throw new Error(`sequence ${def.key}: ${error.message}`);
    sequenceId = existing.id;
    action = "updated";
  } else {
    const { data, error } = await supabase
      .from("sequences")
      .insert({ ...contentFields, status: "draft" })
      .select("id")
      .single();
    if (error) throw new Error(`sequence ${def.key}: ${error.message}`);
    sequenceId = data.id;
    action = "created";
  }

  // 4. Replace steps.
  await supabase.from("sequence_steps").delete().eq("sequence_id", sequenceId);
  const stepRows = def.steps.map((step, i) => buildStepRow(step, i, sequenceId, templateIds));
  if (stepRows.length) {
    const { error } = await supabase.from("sequence_steps").insert(stepRows);
    if (error) throw new Error(`steps ${def.key}: ${error.message}`);
  }

  return { key: def.key, action, steps: def.steps.length };
}

function buildStepRow(
  step: StepDef,
  index: number,
  sequenceId: string,
  templateIds: Map<string, string>,
) {
  const base = {
    sequence_id: sequenceId,
    step_order: index,
    step_type: step.type,
    delay_amount: "delay" in step && step.delay ? step.delay.amount : 0,
    delay_unit: "delay" in step && step.delay ? step.delay.unit : "days",
    email_template_id: null as string | null,
    config: {} as Record<string, unknown>,
  };

  switch (step.type) {
    case "send_email": {
      const id = templateIds.get(step.template);
      if (!id) throw new Error(`Unknown template "${step.template}"`);
      base.email_template_id = id;
      break;
    }
    case "create_task":
      base.config = { title: step.title, assignee: step.assignee ?? null };
      break;
    case "notify":
      base.config = { message: step.message };
      break;
    case "update_field":
      base.config = { field: step.field, value: step.value };
      break;
    case "assign":
      base.config = { owner: step.owner };
      break;
    // wait / unenroll need no extra config
  }
  return base;
}
