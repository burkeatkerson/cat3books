/**
 * GET /api/unsubscribe?t=<signed token> — one-click unsubscribe (public).
 *
 * Verifies the signed token, adds the email to the suppression list (marketing
 * scope), and stops any active marketing enrollments for contacts with that
 * email. Returns a simple confirmation page.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import { verifyUnsubscribeToken } from "@/lib/email/unsubscribe";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("t") ?? "";
  const email = verifyUnsubscribeToken(token);
  if (!email) return page("This unsubscribe link is invalid or expired.", false);

  const supabase = createAdminClient();

  await supabase.from("suppressions").upsert(
    {
      email,
      reason: "unsubscribe",
      scope: "marketing",
      source: "unsubscribe_link",
    },
    { onConflict: "email" },
  );

  // Stop active/paused marketing enrollments for any contact with this email.
  const { data: contacts } = await supabase
    .from("contacts")
    .select("id")
    .eq("email", email);
  const contactIds = (contacts ?? []).map((c: { id: string }) => c.id);
  if (contactIds.length) {
    await supabase
      .from("enrollments")
      .update({ status: "unsubscribed", completed_at: new Date().toISOString() })
      .in("contact_id", contactIds)
      .in("status", ["active", "paused"]);
  }

  return page("You've been unsubscribed. You won't receive further marketing emails.", true);
}

function page(message: string, ok: boolean) {
  const color = ok ? "#187A38" : "#b00020";
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>Unsubscribe</title>
     <body style="font:16px/1.6 -apple-system,sans-serif;background:#101010;color:#EAE6D8;display:grid;place-items:center;height:100vh;margin:0">
     <div style="text-align:center;max-width:420px;padding:0 20px">
     <div style="font-size:42px;color:${color}">${ok ? "✓" : "✕"}</div>
     <p>${message}</p></div></body>`,
    { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
