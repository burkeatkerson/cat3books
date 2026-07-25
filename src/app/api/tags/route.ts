/**
 * /api/tags — list and create tags.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { z } from "zod";

export const dynamic = "force-dynamic";

export const GET = route(async () => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("name", { ascending: true });
  assertOk(error);
  return json({ data });
});

const body = z.object({
  name: z.string().min(1).max(80),
  color: z.string().max(20).optional(),
});

export const POST = route(async (request) => {
  const { supabase } = await requireAdmin();
  const input = await parseBody(request, body);
  const { data, error } = await supabase
    .from("tags")
    .insert(input)
    .select()
    .single();
  assertOk(error);
  return json({ data }, { status: 201 });
});
