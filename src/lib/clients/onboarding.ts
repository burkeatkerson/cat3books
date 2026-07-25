/**
 * Client onboarding side-effects, triggered by the "New Client" conversion.
 * Each is best-effort and logs an activity so the timeline reflects what
 * happened even if delivery later bounces.
 */

import "server-only";
import { sendEmail } from "@/lib/email";
import { signValue } from "@/lib/sign";
import { publicEnv } from "@/lib/public-env";
import type { SupabaseClient } from "@supabase/supabase-js";

type ClientRow = {
  id: string;
  company_id: string;
  dashboard_token: string;
  company: { name: string } | null;
  primary_contact: { id: string; full_name: string; email: string | null } | null;
};

async function loadClient(
  supabase: SupabaseClient,
  clientId: string,
): Promise<ClientRow> {
  const { data, error } = await supabase
    .from("clients")
    .select(
      "id, company_id, dashboard_token, company:companies(name), primary_contact:contacts!clients_primary_contact_id_fkey(id, full_name, email)",
    )
    .eq("id", clientId)
    .single();
  if (error) throw new Error(error.message);
  return data as unknown as ClientRow;
}

export async function sendWelcomeEmail(
  supabase: SupabaseClient,
  clientId: string,
  actor: string,
): Promise<void> {
  const client = await loadClient(supabase, clientId);
  const contact = client.primary_contact;
  if (!contact?.email) {
    throw new Error("No primary contact email to send welcome to");
  }

  const dashboardUrl = `${publicEnv.appUrl}/dashboard/${client.dashboard_token}`;
  const firstName = contact.full_name.split(/\s+/)[0] ?? "there";

  await sendEmail(
    {
      to: { email: contact.email, contactId: contact.id },
      subject: `Welcome to Cat3 Books, ${client.company?.name ?? ""}`.trim(),
      category: "welcome",
      html: `<p>Hi ${firstName},</p>
        <p>Welcome aboard — we're glad to be running the books for ${client.company?.name ?? "your business"}.</p>
        <p>Your private financial dashboard lives here (no login needed):</p>
        <p><a href="${dashboardUrl}">${dashboardUrl}</a></p>
        <p>We'll be in touch shortly to connect QuickBooks and kick off your first close.</p>
        <p>— The Cat3 Books team</p>`,
      related: { type: "client", id: client.id },
    },
    supabase,
  );

  await supabase.from("activities").insert({
    activity_type: "email_sent",
    actor,
    company_id: client.company_id,
    client_id: client.id,
    contact_id: contact.id,
    body: "Welcome email sent",
  });
}

export async function sendQbInvite(
  supabase: SupabaseClient,
  clientId: string,
  actor: string,
): Promise<void> {
  const client = await loadClient(supabase, clientId);
  const contact = client.primary_contact;
  if (!contact?.email) {
    throw new Error("No primary contact email to send QB invite to");
  }

  // Signed link lets the client start the QB OAuth flow without an admin login.
  const sig = signValue("qb_connect", client.id);
  const connectUrl = `${publicEnv.appUrl}/api/quickbooks/connect?cid=${encodeURIComponent(
    client.id,
  )}&sig=${encodeURIComponent(sig)}`;
  const firstName = contact.full_name.split(/\s+/)[0] ?? "there";

  await sendEmail(
    {
      to: { email: contact.email, contactId: contact.id },
      subject: "Connect QuickBooks to Cat3 Books",
      category: "transactional",
      html: `<p>Hi ${firstName},</p>
        <p>To start delivering your numbers, we need read access to your QuickBooks Online.</p>
        <p>Click below to securely authorize the connection — it takes about 30 seconds:</p>
        <p><a href="${connectUrl}">Connect QuickBooks</a></p>
        <p>You can revoke access at any time from within QuickBooks.</p>
        <p>— The Cat3 Books team</p>`,
      related: { type: "client", id: client.id },
    },
    supabase,
  );

  await supabase.from("activities").insert({
    activity_type: "email_sent",
    actor,
    company_id: client.company_id,
    client_id: client.id,
    contact_id: contact.id,
    body: "QuickBooks connect invite sent",
  });
}
