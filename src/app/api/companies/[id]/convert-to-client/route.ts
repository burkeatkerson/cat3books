/**
 * POST /api/companies/[id]/convert-to-client — the "New Client" action.
 *
 * The DB function `convert_company_to_client` does the transactional core
 * (flip lifecycle → cascade contacts → create client row + dashboard token →
 * log activity). Here we layer the external side-effects: record the conversion
 * for attribution, send the welcome email, and send the QuickBooks connect
 * invite. Email/QB are best-effort — a delivery failure must not roll back the
 * conversion, so they're caught and logged as activities.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { convertToClient } from "@/lib/validation";
import { sendWelcomeEmail, sendQbInvite } from "@/lib/clients/onboarding";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export const POST = route(async (request, { params }: Params) => {
  const { supabase, email } = await requireAdmin();
  const body = await parseBody(request, convertToClient);

  // Transactional relationship change.
  const { data, error } = await supabase
    .rpc("convert_company_to_client", {
      p_company_id: params.id,
      p_tier: body.tier,
      p_mrr: body.mrr ?? null,
    })
    .single();
  assertOk(error);
  const client = data as {
    id: string;
    primary_contact_id: string | null;
    mrr: number;
  };

  // Attribute the conversion (last campaign/sequence the primary contact was in).
  let sequenceId: string | null = null;
  let enrollmentId: string | null = null;
  if (client.primary_contact_id) {
    const { data: enr } = await supabase
      .from("enrollments")
      .select("id, sequence_id")
      .eq("contact_id", client.primary_contact_id)
      .order("enrolled_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (enr) {
      sequenceId = enr.sequence_id;
      enrollmentId = enr.id;
    }
  }

  await supabase.from("conversions").insert({
    conversion_type: "became_client",
    company_id: params.id,
    client_id: client.id,
    contact_id: client.primary_contact_id,
    value: client.mrr,
    sequence_id: sequenceId,
    enrollment_id: enrollmentId,
    attribution: "last_touch",
  });

  // External onboarding side-effects (best-effort).
  const results: Record<string, string> = {};
  if (body.send_welcome_email) {
    results.welcome_email = await safe(() =>
      sendWelcomeEmail(supabase, client.id, email ?? "Admin"),
    );
  }
  if (body.send_qb_invite) {
    results.qb_invite = await safe(() =>
      sendQbInvite(supabase, client.id, email ?? "Admin"),
    );
  }

  return json({ data: client, onboarding: results }, { status: 201 });
});

async function safe(fn: () => Promise<unknown>): Promise<string> {
  try {
    await fn();
    return "ok";
  } catch (err) {
    return `failed: ${err instanceof Error ? err.message : String(err)}`;
  }
}
