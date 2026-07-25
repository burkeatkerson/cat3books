/**
 * Send due client dashboard recap emails (weekly/monthly), then schedule the
 * next one. A recap is due when recap_next_at is null (first send after opting
 * in) or in the past.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sendClientDashboardEmail } from "@/lib/clients/dashboard-email";

export async function processDueRecaps(
  supabase: SupabaseClient,
): Promise<number> {
  const now = new Date();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, recap_cadence, recap_next_at")
    .eq("status", "active")
    .neq("recap_cadence", "none");

  let sent = 0;
  for (const c of (clients ?? []) as {
    id: string;
    recap_cadence: "weekly" | "monthly";
    recap_next_at: string | null;
  }[]) {
    const due = !c.recap_next_at || new Date(c.recap_next_at) <= now;
    if (!due) continue;

    try {
      await sendClientDashboardEmail(supabase, c.id, "recap");
      await supabase
        .from("clients")
        .update({
          recap_last_sent_at: now.toISOString(),
          recap_next_at: nextRecap(now, c.recap_cadence).toISOString(),
        })
        .eq("id", c.id);
      sent++;
    } catch {
      // Skip this client this tick; it'll retry next run.
    }
  }
  return sent;
}

function nextRecap(from: Date, cadence: "weekly" | "monthly"): Date {
  const next = new Date(from);
  if (cadence === "weekly") next.setDate(next.getDate() + 7);
  else next.setMonth(next.getMonth() + 1);
  return next;
}
