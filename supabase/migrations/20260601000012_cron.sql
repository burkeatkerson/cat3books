-- =============================================================================
-- 0012 — Scheduler: pg_cron + pg_net drive the engine tick
-- =============================================================================
-- Default, plan-independent scheduler: pg_cron fires every minute and pg_net
-- POSTs to /api/cron/tick with the CRON_SECRET. The Next.js endpoint does the
-- actual work (sending email needs Node), so this just pokes it.
--
-- The app URL and CRON_SECRET are deployment-specific, so they are NOT
-- hardcoded here. After deploying, run the scheduling command below ONCE with
-- your real values (Supabase SQL editor or psql). See docs/admin-setup.md.
--
-- To switch to Vercel Cron instead, skip the schedule below and add a
-- vercel.json crons entry hitting /api/cron/tick (also documented).

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- ---------------------------------------------------------------------------
-- RUN THIS MANUALLY with your values (kept out of version-controlled secrets):
--
--   select cron.schedule(
--     'cat3-engine-tick',
--     '* * * * *',  -- every minute
--     $$
--       select net.http_post(
--         url     := 'https://YOUR-APP-URL/api/cron/tick',
--         headers := jsonb_build_object(
--           'Authorization', 'Bearer YOUR_CRON_SECRET',
--           'Content-Type', 'application/json'
--         ),
--         body    := '{}'::jsonb
--       );
--     $$
--   );
--
-- To remove it:  select cron.unschedule('cat3-engine-tick');
-- ---------------------------------------------------------------------------
