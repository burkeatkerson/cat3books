/**
 * Enroll a sequence's whole target audience — used when a campaign is published.
 * Resolves the target (lifecycle / segment / individual) to a set of contacts
 * and enrolls each (idempotently).
 */

import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { enrollContact } from "@/lib/engine/enroll";

type SequenceRow = {
  id: string;
  target_type: "segment" | "lifecycle" | "individual";
  target_segment_id: string | null;
  target_lifecycle: string | null;
  target_contact_id: string | null;
  allow_reenroll: boolean;
};

export async function enrollSequenceTarget(
  supabase: SupabaseClient,
  seq: SequenceRow,
): Promise<number> {
  const contactIds = await resolveTargetContacts(supabase, seq);
  let count = 0;
  for (const cid of contactIds) {
    const id = await enrollContact(supabase, seq.id, cid, {
      by: "manual",
      allowReenroll: seq.allow_reenroll,
    });
    if (id) count++;
  }
  return count;
}

async function resolveTargetContacts(
  supabase: SupabaseClient,
  seq: SequenceRow,
): Promise<string[]> {
  if (seq.target_type === "individual") {
    return seq.target_contact_id ? [seq.target_contact_id] : [];
  }

  if (seq.target_type === "lifecycle") {
    const { data } = await supabase
      .from("contacts")
      .select("id")
      .eq("lifecycle_status", seq.target_lifecycle);
    return (data ?? []).map((c: { id: string }) => c.id);
  }

  // segment
  if (!seq.target_segment_id) return [];
  const { data: seg } = await supabase
    .from("segments")
    .select("entity_type")
    .eq("id", seq.target_segment_id)
    .single();
  const { data: members } = await supabase
    .from("segment_members")
    .select("entity_id")
    .eq("segment_id", seq.target_segment_id);
  const ids = (members ?? []).map((m: { entity_id: string }) => m.entity_id);

  if (seg?.entity_type === "contact") return ids;

  // Company/client segment -> expand to their contacts.
  if (seg?.entity_type === "company" && ids.length) {
    const { data } = await supabase
      .from("contacts")
      .select("id")
      .in("company_id", ids);
    return (data ?? []).map((c: { id: string }) => c.id);
  }
  if (seg?.entity_type === "client" && ids.length) {
    const { data: clients } = await supabase
      .from("clients")
      .select("company_id")
      .in("id", ids);
    const companyIds = (clients ?? []).map((c: { company_id: string }) => c.company_id);
    const { data } = await supabase
      .from("contacts")
      .select("id")
      .in("company_id", companyIds);
    return (data ?? []).map((c: { id: string }) => c.id);
  }
  return [];
}
