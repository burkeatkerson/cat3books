/**
 * /api/pipeline-stages — list (ordered) and create. Stages carry a probability
 * weight used to compute weighted pipeline value on the dashboard.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { z } from "zod";

export const dynamic = "force-dynamic";

const stageCreate = z.object({
  name: z.string().min(1).max(120),
  position: z.number().int().nonnegative(),
  probability: z.number().min(0).max(1).default(0),
  is_won: z.boolean().default(false),
  is_lost: z.boolean().default(false),
});

export const GET = route(async () => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("pipeline_stages")
    .select("*")
    .order("position", { ascending: true });
  assertOk(error);
  return json({ data });
});

export const POST = route(async (request) => {
  const { supabase } = await requireAdmin();
  const body = await parseBody(request, stageCreate);
  const { data, error } = await supabase
    .from("pipeline_stages")
    .insert(body)
    .select()
    .single();
  assertOk(error);
  return json({ data }, { status: 201 });
});
