/**
 * GET /api/email/track/click/<messageId>?u=<url> — click-tracking redirect.
 * Records a `click` event then 302s to the original URL. Public.
 */

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const target = new URL(request.url).searchParams.get("u");
  // Only redirect to absolute http(s) URLs to avoid open-redirect abuse.
  const safe =
    target && /^https?:\/\//i.test(target) ? target : "https://cat3books.com";

  try {
    await createAdminClient()
      .from("email_events")
      .insert({
        email_message_id: params.id,
        event_type: "click",
        url: target,
      });
  } catch {
    // Ignore tracking failures; the redirect must still happen.
  }
  return NextResponse.redirect(safe);
}
