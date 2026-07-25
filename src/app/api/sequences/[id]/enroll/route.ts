/**
 * POST /api/sequences/[id]/enroll — manual enrollment.
 *   { contact_ids: [...] }  enrolls specific contacts
 *   { target: true }        enrolls the sequence's whole resolved target
 */

import { route, requireAdmin, parseBody, json, ApiError } from "@/lib/api";
import { enrollContact } from "@/lib/engine/enroll";
import { enrollSequenceTarget } from "@/lib/engine/enroll-target";
import { z } from "zod";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

const body = z
  .object({
    contact_ids: z.array(z.string().uuid()).optional(),
    target: z.boolean().optional(),
  })
  .refine((b) => b.contact_ids?.length || b.target, {
    message: "Provide contact_ids or target:true",
  });

export const POST = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const input = await parseBody(request, body);

  const { data: seq, error } = await supabase
    .from("sequences")
    .select(
      "id, target_type, target_segment_id, target_lifecycle, target_contact_id, allow_reenroll",
    )
    .eq("id", params.id)
    .single();
  if (error) throw new ApiError(404, "Sequence not found");

  let enrolled = 0;
  if (input.target) {
    enrolled = await enrollSequenceTarget(supabase, seq);
  } else {
    for (const cid of input.contact_ids ?? []) {
      const id = await enrollContact(supabase, params.id, cid, {
        by: "manual",
        allowReenroll: seq.allow_reenroll,
      });
      if (id) enrolled++;
    }
  }

  return json({ ok: true, enrolled });
});
