/**
 * Refresh all dynamic segments and emit enters_segment trigger events for newly
 * matched members, so segment-entry can drive automation enrollment.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { refreshSegment } from "@/lib/segments/refresh";

export async function processSegments(supabase: SupabaseClient): Promise<number> {
  const { data: segments } = await supabase
    .from("segments")
    .select("id, entity_type, is_dynamic, definition")
    .eq("is_dynamic", true);

  let entered = 0;
  for (const seg of segments ?? []) {
    const { added } = await refreshSegment(supabase, seg);
    if (added.length) {
      await supabase.from("trigger_events").insert(
        added.map((entity_id) => ({
          event_type: "enters_segment",
          entity_type: seg.entity_type,
          entity_id,
          payload: { segment_id: seg.id },
        })),
      );
      entered += added.length;
    }
  }
  return entered;
}
