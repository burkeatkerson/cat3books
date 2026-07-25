/**
 * Execute a single sequence step for an enrollment. Pure-ish: it performs the
 * side-effect (send email / create task / etc.) and returns a result describing
 * what to record and whether the enrollment should terminate or change status.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export type StepRow = {
  id: string;
  step_type:
    | "send_email"
    | "wait"
    | "create_task"
    | "notify"
    | "update_field"
    | "assign"
    | "unenroll";
  email_template_id: string | null;
  config: Record<string, unknown>;
};

export type ContactCtx = {
  id: string;
  full_name: string;
  email: string | null;
  company_id: string | null;
};

export type CompanyCtx = {
  name?: string;
  service_focus?: string;
  location_city?: string;
  location_state?: string;
} | null;

export type SequenceCtx = {
  id: string;
  from_name: string | null;
  from_email: string | null;
};

export type StepResult = {
  status: "sent" | "skipped" | "failed";
  emailMessageId?: string | null;
  error?: string;
  setEnrollmentStatus?:
    | "completed"
    | "unsubscribed"
    | "removed"
    | "failed";
  terminal?: boolean;
};

const UPDATABLE_FIELDS = new Set([
  "lifecycle_status",
  "owner_label",
  "lead_temperature",
]);

export async function executeStep(
  supabase: SupabaseClient,
  step: StepRow,
  contact: ContactCtx,
  company: CompanyCtx,
  sequence: SequenceCtx,
): Promise<StepResult> {
  switch (step.step_type) {
    case "wait":
      return { status: "sent" };

    case "send_email": {
      if (!contact.email) return { status: "skipped", error: "no email" };
      if (!step.email_template_id)
        return { status: "skipped", error: "no template" };

      const { data: tpl, error } = await supabase
        .from("email_templates")
        .select("subject, body_html, body_text, from_name, from_email")
        .eq("id", step.email_template_id)
        .single();
      if (error || !tpl) return { status: "failed", error: "template missing" };

      const context = {
        contact: {
          first_name: contact.full_name.split(/\s+/)[0] ?? "",
          full_name: contact.full_name,
          email: contact.email,
        },
        company: company ?? {},
      };

      let result;
      try {
        result = await sendEmail(
          {
            to: { email: contact.email, contactId: contact.id },
            subject: tpl.subject,
            html: tpl.body_html,
            text: tpl.body_text ?? undefined,
            category: "sequence",
            from: {
              name: tpl.from_name ?? sequence.from_name ?? undefined,
              email: tpl.from_email ?? sequence.from_email ?? undefined,
            },
            related: { type: "sequence", id: sequence.id },
            context,
          },
          supabase,
        );
      } catch (err) {
        // Provider failure (e.g. Gmail not configured / transient): record a
        // failed step rather than aborting the whole tick.
        return {
          status: "failed",
          error: err instanceof Error ? err.message : String(err),
        };
      }

      if (result.status === "suppressed") {
        return {
          status: "skipped",
          emailMessageId: result.id,
          error: "suppressed",
          setEnrollmentStatus: "unsubscribed",
          terminal: true,
        };
      }
      return { status: "sent", emailMessageId: result.id };
    }

    case "create_task": {
      await supabase.from("tasks").insert({
        title: String(step.config.title ?? "Follow up"),
        related_contact_id: contact.id,
        related_company_id: contact.company_id,
        assignee_label: (step.config.assignee as string | null) ?? null,
      });
      return { status: "sent" };
    }

    case "notify": {
      await supabase.from("activities").insert({
        activity_type: "system",
        actor: "Automation",
        contact_id: contact.id,
        company_id: contact.company_id,
        body: String(step.config.message ?? "Notification"),
      });
      return { status: "sent" };
    }

    case "update_field": {
      const field = String(step.config.field ?? "");
      if (!UPDATABLE_FIELDS.has(field))
        return { status: "skipped", error: `field ${field} not updatable` };
      await supabase
        .from("contacts")
        .update({ [field]: step.config.value })
        .eq("id", contact.id);
      return { status: "sent" };
    }

    case "assign": {
      await supabase
        .from("contacts")
        .update({ owner_label: String(step.config.owner ?? "") })
        .eq("id", contact.id);
      return { status: "sent" };
    }

    case "unenroll":
      return { status: "sent", setEnrollmentStatus: "removed", terminal: true };

    default:
      return { status: "skipped", error: "unknown step type" };
  }
}
