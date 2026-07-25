/**
 * POST /api/campaigns/sync — upsert code-authored sequence definitions into the
 * database. Callable by a signed-in admin or headlessly with CRON_SECRET (used
 * by `npm run campaigns:sync`). Never alters admin-owned sequence status.
 */

import { route, json } from "@/lib/api";
import { authorizeAdminOrCron } from "@/lib/cron-auth";
import { syncCampaigns } from "@/lib/campaigns/sync";

export const dynamic = "force-dynamic";

export const POST = route(async (request) => {
  const supabase = await authorizeAdminOrCron(request);
  const outcomes = await syncCampaigns(supabase);
  return json({ outcomes });
});
