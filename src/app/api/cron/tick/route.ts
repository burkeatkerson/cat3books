/**
 * /api/cron/tick — the scheduler entry point. Protected by CRON_SECRET (Bearer).
 * Invoked every minute by Supabase pg_cron + pg_net (see migration 0013), or by
 * Vercel Cron / any external pinger. Runs the full engine tick.
 */

import { route, json } from "@/lib/api";
import { requireCron } from "@/lib/cron-auth";
import { runTick } from "@/lib/engine/run";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function handle(request: Request) {
  const supabase = requireCron(request);
  const report = await runTick(supabase);
  return json(report);
}

export const POST = route(handle);
export const GET = route(handle);
