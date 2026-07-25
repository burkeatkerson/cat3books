/**
 * POST /api/tags/assign — attach or detach a tag from an entity.
 * Body: { tag_id, entity_type, entity_id, action: 'add' | 'remove' }
 */

import { route, requireAdmin, parseBody, json, assertOk } from "@/lib/api";
import { z } from "zod";

export const dynamic = "force-dynamic";

const body = z.object({
  tag_id: z.string().uuid(),
  entity_type: z.enum(["company", "contact", "client"]),
  entity_id: z.string().uuid(),
  action: z.enum(["add", "remove"]).default("add"),
});

export const POST = route(async (request) => {
  const { supabase } = await requireAdmin();
  const { tag_id, entity_type, entity_id, action } = await parseBody(request, body);

  if (action === "remove") {
    const { error } = await supabase
      .from("entity_tags")
      .delete()
      .eq("tag_id", tag_id)
      .eq("entity_type", entity_type)
      .eq("entity_id", entity_id);
    assertOk(error);
    return json({ ok: true });
  }

  const { error } = await supabase
    .from("entity_tags")
    .upsert(
      { tag_id, entity_type, entity_id },
      { onConflict: "tag_id,entity_type,entity_id" },
    );
  assertOk(error);
  return json({ ok: true });
});
