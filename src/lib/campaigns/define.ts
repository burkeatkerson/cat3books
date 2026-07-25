/**
 * Code-as-source-of-truth campaign/sequence authoring.
 *
 * Campaigns and automated drips are authored here in TypeScript (by Claude Code
 * via the editor), then synced into the database by stable `key`. The admin UI
 * never builds these — it only publishes/pauses/cancels and reads metrics.
 *
 * `defineSequence` is an identity function that gives full type-checking and
 * editor help while keeping definitions plain data.
 */

export type TriggerType =
  | "manual"
  | "contact_created"
  | "enters_segment"
  | "lifecycle_changed"
  | "stage_changed"
  | "qb_connected"
  | "date_event";

export type Delay = {
  amount: number;
  unit: "minutes" | "hours" | "days";
};

export type TemplateDef = {
  /** Stable key for upsert (also referenced by send_email steps). */
  key: string;
  name?: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  fromName?: string;
  fromEmail?: string;
};

export type StepDef =
  | { type: "send_email"; template: string; delay?: Delay }
  | { type: "wait"; delay: Delay }
  | { type: "create_task"; title: string; delay?: Delay; assignee?: string }
  | { type: "notify"; message: string; delay?: Delay }
  | { type: "update_field"; field: string; value: unknown; delay?: Delay }
  | { type: "assign"; owner: string; delay?: Delay }
  | { type: "unenroll"; delay?: Delay };

export type SequenceTarget =
  | { type: "segment"; segmentName: string }
  | { type: "lifecycle"; lifecycle: "prospect" | "client" | "past" }
  | { type: "individual" };

export type SequenceDef = {
  key: string;
  name: string;
  description?: string;
  kind: "campaign" | "automation";
  target: SequenceTarget;
  trigger: { type: TriggerType; config?: Record<string, unknown> };
  fromName?: string;
  fromEmail?: string;
  /** Allow a contact who completed/exited to be enrolled again. */
  allowReenroll?: boolean;
  templates: TemplateDef[];
  steps: StepDef[];
};

export function defineSequence(def: SequenceDef): SequenceDef {
  return def;
}
