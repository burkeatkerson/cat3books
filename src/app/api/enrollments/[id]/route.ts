/**
 * PATCH /api/enrollments/[id] — control a single contact's enrollment:
 *   pause | resume | unenroll
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { z } from "zod";

export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

const body = z.object({ action: z.enum(["pause", "resume", "unenroll"]) });

export const PATCH = route(async (request, { params }: Params) => {
  const { supabase } = await requireAdmin();
  const { action } = await parseBody(request, body);

  const patch: Record<string, unknown> =
    action === "pause"
      ? { status: "paused" }
      : action === "resume"
        ? { status: "active", next_run_at: new Date().toISOString() }
        : { status: "removed", completed_at: new Date().toISOString() };

  const { data, error } = await supabase
    .from("enrollments")
    .update(patch)
    .eq("id", params.id)
    .select()
    .single();
  assertOk(error);
  return json({ data });
});
