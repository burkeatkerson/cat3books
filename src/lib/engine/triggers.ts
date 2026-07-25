/**
 * Consume trigger_events and enroll matching contacts into active sequences.
 *
 * Each event names what happened (and on which entity); for every active
 * sequence whose trigger_type matches, we resolve the set of contacts to enroll
 * (respecting the sequence's target + trigger_config) and enroll them.
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { enrollContact } from "@/lib/engine/enroll";

type TriggerEvent = {
  id: string;
  event_type: string;
  entity_type: "company" | "contact" | "client" | null;
  entity_id: string | null;
  payload: Record<string, unknown>;
};

type SequenceRow = {
  id: string;
  target_type: "segment" | "lifecycle" | "individual";
  target_segment_id: string | null;
  target_lifecycle: string | null;
  trigger_config: Record<string, unknown>;
  allow_reenroll: boolean;
};

export async function processTriggerEvents(
  supabase: SupabaseClient,
  limit = 200,
): Promise<number> {
  const { data: events, error } = await supabase
    .from("trigger_events")
    .select("id, event_type, entity_type, entity_id, payload")
    .eq("processed", false)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw new Error(error.message);

  for (const ev of (events ?? []) as TriggerEvent[]) {
    const { data: sequences } = await supabase
      .from("sequences")
      .select(
        "id, target_type, target_segment_id, target_lifecycle, trigger_config, allow_reenroll",
      )
      .eq("status", "active")
      .eq("trigger_type", ev.event_type);

    for (const seq of (sequences ?? []) as SequenceRow[]) {
      const contactIds = await contactsForEvent(supabase, ev, seq);
      for (const cid of contactIds) {
        await enrollContact(supabase, seq.id, cid, {
          by: "trigger",
          triggerEventId: ev.id,
          allowReenroll: seq.allow_reenroll,
        });
      }
    }

    await supabase
      .from("trigger_events")
      .update({ processed: true, processed_at: new Date().toISOString() })
      .eq("id", ev.id);
  }

  return events?.length ?? 0;
}

async function contactsForEvent(
  supabase: SupabaseClient,
  ev: TriggerEvent,
  seq: SequenceRow,
): Promise<string[]> {
  switch (ev.event_type) {
    case "contact_created": {
      if (!ev.entity_id) return [];
      const { data: contact } = await supabase
        .from("contacts")
        .select("id, lifecycle_status")
        .eq("id", ev.entity_id)
        .single();
      if (!contact) return [];
      if (
        seq.target_type === "lifecycle" &&
        contact.lifecycle_status !== seq.target_lifecycle
      )
        return [];
      if (
        seq.target_type === "segment" &&
        !(await inSegment(supabase, seq.target_segment_id, contact.id))
      )
        return [];
      return [contact.id];
    }

    case "lifecycle_changed": {
      const to = (ev.payload?.to as string) ?? null;
      const wantTo = (seq.trigger_config?.to as string) ?? null;
      if (wantTo && to !== wantTo) return [];
      if (seq.target_lifecycle && to !== seq.target_lifecycle) return [];
      return ev.entity_id ? companyContacts(supabase, ev.entity_id) : [];
    }

    case "stage_changed": {
      const wantStage = (seq.trigger_config?.stage_id as string) ?? null;
      const stage = (ev.payload?.stage_id as string) ?? null;
      if (wantStage && stage !== wantStage) return [];
      return ev.entity_id ? companyContacts(supabase, ev.entity_id) : [];
    }

    case "enters_segment": {
      const segId = (ev.payload?.segment_id as string) ?? null;
      const wantSeg = seq.target_segment_id ?? (seq.trigger_config?.segment_id as string) ?? null;
      if (wantSeg && segId !== wantSeg) return [];
      if (ev.entity_type === "contact" && ev.entity_id) return [ev.entity_id];
      if (ev.entity_type === "company" && ev.entity_id)
        return companyContacts(supabase, ev.entity_id);
      return [];
    }

    case "qb_connected": {
      // entity is the client; enroll the client's company contacts.
      if (!ev.entity_id) return [];
      const { data: client } = await supabase
        .from("clients")
        .select("company_id")
        .eq("id", ev.entity_id)
        .single();
      return client?.company_id ? companyContacts(supabase, client.company_id) : [];
    }

    default:
      return [];
  }
}

async function companyContacts(
  supabase: SupabaseClient,
  companyId: string,
): Promise<string[]> {
  const { data } = await supabase
    .from("contacts")
    .select("id")
    .eq("company_id", companyId);
  return (data ?? []).map((c: { id: string }) => c.id);
}

async function inSegment(
  supabase: SupabaseClient,
  segmentId: string | null,
  entityId: string,
): Promise<boolean> {
  if (!segmentId) return false;
  const { data } = await supabase
    .from("segment_members")
    .select("entity_id")
    .eq("segment_id", segmentId)
    .eq("entity_id", entityId)
    .maybeSingle();
  return !!data;
}
