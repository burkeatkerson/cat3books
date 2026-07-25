-- =============================================================================
-- 0006 — Automation engine infrastructure: trigger queue + cron observability
-- =============================================================================

-- trigger_events — durable queue of "something happened" events. CRM mutations
-- enqueue here; the cron processor consumes them and enrolls matching contacts
-- into sequences. Decoupling enqueue from processing keeps writes fast and makes
-- automation repl/retry-able.
create table public.trigger_events (
  id           uuid primary key default gen_random_uuid(),
  event_type   trigger_type not null,
  entity_type  entity_type,
  entity_id    uuid,
  payload      jsonb not null default '{}'::jsonb,
  processed    boolean not null default false,
  processed_at timestamptz,
  created_at   timestamptz not null default now()
);
alter table public.trigger_events enable row level security;
create policy trigger_events_admin_all on public.trigger_events
  for all using (is_admin()) with check (is_admin());

-- cron_runs — one row per cron tick (and per sub-job), for observability and to
-- detect/avoid overlap. The processor also takes a Postgres advisory lock.
create table public.cron_runs (
  id              uuid primary key default gen_random_uuid(),
  job             text not null,
  started_at      timestamptz not null default now(),
  finished_at     timestamptz,
  status          text not null default 'running',  -- running | ok | error
  items_processed int not null default 0,
  error           text
);
alter table public.cron_runs enable row level security;
create policy cron_runs_admin_all on public.cron_runs
  for all using (is_admin()) with check (is_admin());
