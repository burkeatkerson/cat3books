/**
 * /api/segments/[id]/preview — evaluate a segment's criteria without persisting
 * membership. GET previews the stored definition; POST previews an ad-hoc
 * definition (e.g. while editing, before saving). Returns count + a sample.
 */

import { route, requireAdmin, json, parseBody, ApiError } from "@/lib/api";
import { evaluateSegment, type SegmentDefinition } from "@/lib/segments/evaluate";
import { z } from "zod";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

async function loadSegment(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  id: string,
) {
  const { data, error } = await supabase
    .from("segments")
    .select("entity_type, definition")
    .eq("id", id)
    .single();
  if (error) throw new ApiError(404, "Segment not found");
  return data as { entity_type: "company" | "contact" | "client"; definition: SegmentDefinition };
}

export const GET = route(async (_request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const seg = await loadSegment(supabase, params.id);
  const { ids, rows } = await evaluateSegment(
    supabase,
    seg.entity_type,
    seg.definition,
  );
  return json({ count: ids.length, sample: rows.slice(0, 25) });
});

const previewBody = z.object({
  entity_type: z.enum(["company", "contact", "client"]).optional(),
  definition: z.record(z.string(), z.unknown()),
});

export const POST = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const stored = await loadSegment(supabase, params.id);
  const body = await parseBody(request, previewBody);
  const { ids, rows } = await evaluateSegment(
    supabase,
    body.entity_type ?? stored.entity_type,
    body.definition as unknown as SegmentDefinition,
  );
  return json({ count: ids.length, sample: rows.slice(0, 25) });
});
