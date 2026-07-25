/**
 * /api/suppressions — list and manually add email suppressions.
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { z } from "zod";

export const dynamic = "force-dynamic";

export const GET = route(async () => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("suppressions")
    .select("*")
    .order("created_at", { ascending: false });
  assertOk(error);
  return json({ data });
});

const body = z.object({
  email: z.string().email(),
  reason: z.enum(["unsubscribe", "bounce", "complaint", "manual"]).default("manual"),
  scope: z.enum(["all", "marketing"]).default("marketing"),
});

export const POST = route(async (request) => {
  const { supabase } = await requireAdmin();
  const input = await parseBody(request, body);
  const { data, error } = await supabase
    .from("suppressions")
    .upsert({ ...input, source: "manual" }, { onConflict: "email" })
    .select()
    .single();
  assertOk(error);
  return json({ data }, { status: 201 });
});
