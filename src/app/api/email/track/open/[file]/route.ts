/**
 * GET /api/email/track/open/<messageId>.png — open-tracking pixel.
 * Records an `open` event and returns a 1x1 transparent PNG. Public.
 */

import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const PIXEL = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
);

export async function GET(
  _request: Request,
  { params }: { params: { file: string } },
) {
  const messageId = params.file.replace(/\.png$/i, "");
  try {
    await createAdminClient()
      .from("email_events")
      .insert({ email_message_id: messageId, event_type: "open" });
  } catch {
    // Never let tracking failures affect rendering.
  }
  return new Response(PIXEL, {
    headers: {
      "content-type": "image/png",
      "cache-control": "no-store, must-revalidate",
    },
  });
}
