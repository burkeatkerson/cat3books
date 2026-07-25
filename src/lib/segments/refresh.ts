/**
 * Recompute a dynamic segment's materialized membership and return the diff.
 *
 * The diff (added/removed entity ids) lets the cron job fire enters_segment
 * triggers for new members. Static segments (is_dynamic = false) are owned by
 * explicit membership and are skipped.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  evaluateSegment,
  type EntityType,
  type SegmentDefinition,
} from "@/lib/segments/evaluate";

type SegmentRow = {
  id: string;
  entity_type: EntityType;
  is_dynamic: boolean;
  definition: SegmentDefinition;
};

export type RefreshResult = {
  total: number;
  added: string[];
  removed: string[];
};

export async function refreshSegment(
  supabase: SupabaseClient,
  segment: SegmentRow,
): Promise<RefreshResult> {
  if (!segment.is_dynamic) {
    const { data } = await supabase
      .from("segment_members")
      .select("entity_id")
      .eq("segment_id", segment.id);
    return { total: data?.length ?? 0, added: [], removed: [] };
  }

  const { ids } = await evaluateSegment(
    supabase,
    segment.entity_type,
    segment.definition,
  );
  const next = new Set(ids);

  const { data: existing } = await supabase
    .from("segment_members")
    .select("entity_id")
    .eq("segment_id", segment.id);
  const prev = new Set((existing ?? []).map((m: { entity_id: string }) => m.entity_id));

  const added = ids.filter((id) => !prev.has(id));
  const removed = Array.from(prev).filter((id) => !next.has(id));

  if (removed.length) {
    await supabase
      .from("segment_members")
      .delete()
      .eq("segment_id", segment.id)
      .in("entity_id", removed);
  }
  if (added.length) {
    await supabase.from("segment_members").insert(
      added.map((entity_id) => ({
        segment_id: segment.id,
        entity_type: segment.entity_type,
        entity_id,
      })),
    );
  }

  return { total: next.size, added, removed };
}
