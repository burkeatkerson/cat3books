-- Combined Cat3 Books admin/CRM migrations (apply in one shot)


-- ========== 20260601000001_extensions_and_helpers.sql ==========
-- =============================================================================
-- 0001 — Extensions + shared helper functions
-- =============================================================================
-- pgcrypto: gen_random_uuid() for UUID primary keys.
-- citext:   case-insensitive text for email columns (dedupe/lookup by email).
create extension if not exists pgcrypto;
create extension if not exists citext;

-- Maintains an `updated_at` column on UPDATE. Attached per-table where present.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Trigger fn: sets NEW.updated_at = now() on row update.';


-- ========== 20260601000002_enums.sql ==========
-- =============================================================================
-- 0002 — Enum types
-- =============================================================================
-- Stable, low-churn value sets are modeled as Postgres enums. Things that grow
-- freely (tags, pipeline stages, custom fields) are data, not enums.

-- CRM lifecycle
create type lifecycle_status as enum ('prospect', 'client', 'past');
create type lead_temperature as enum ('hot', 'warm', 'cold');

-- Shared polymorphic entity discriminator (tags, segments, conversions, fields)
create type entity_type as enum ('company', 'contact', 'client');

-- Clients
create type client_status   as enum ('active', 'past');
create type client_tier     as enum ('core', 'books_cfo');
create type client_health   as enum ('good', 'watch', 'at_risk');
create type recap_cadence   as enum ('none', 'weekly', 'monthly');

-- Tasks & activity
create type task_status   as enum ('open', 'done');
create type activity_type as enum (
  'note', 'email_sent', 'email_reply', 'call', 'status_change',
  'stage_change', 'dashboard_sent', 'client_converted', 'enrolled',
  'churn', 'system'
);

-- QuickBooks
create type qb_report_type     as enum ('profit_loss', 'balance_sheet');
create type qb_invoice_status  as enum ('open', 'paid', 'overdue', 'void');

-- Invoices I send clients
create type client_invoice_status as enum ('draft', 'sent', 'paid', 'overdue', 'void');

-- Segmentation / custom fields
create type custom_field_type as enum ('text', 'number', 'boolean', 'date', 'select');

-- Sequences (campaigns + automations)
create type sequence_kind   as enum ('campaign', 'automation');
create type sequence_status as enum ('draft', 'active', 'paused', 'cancelled');
create type content_source  as enum ('code', 'manual');
create type target_type     as enum ('segment', 'individual', 'lifecycle');
create type trigger_type    as enum (
  'manual', 'contact_created', 'enters_segment', 'lifecycle_changed',
  'stage_changed', 'qb_connected', 'date_event'
);
create type step_type as enum (
  'send_email', 'wait', 'create_task', 'notify', 'update_field',
  'assign', 'unenroll'
);
create type delay_unit as enum ('minutes', 'hours', 'days');

-- Enrollments
create type enrollment_status as enum (
  'active', 'completed', 'paused', 'unsubscribed', 'failed', 'removed'
);
create type enrolled_by     as enum ('manual', 'trigger');
create type step_run_status as enum ('pending', 'sent', 'skipped', 'failed');

-- Email
create type email_category as enum (
  'campaign', 'sequence', 'dashboard', 'recap', 'welcome', 'transactional'
);
create type email_status as enum ('queued', 'sent', 'failed', 'bounced');
create type email_event_type as enum (
  'delivered', 'open', 'click', 'reply', 'bounce', 'complaint',
  'unsubscribe', 'booked'
);
create type suppression_reason as enum ('unsubscribe', 'bounce', 'complaint', 'manual');
create type suppression_scope  as enum ('all', 'marketing');

-- Conversions / attribution
create type conversion_type as enum (
  'assessment_booked', 'became_client', 'replied', 'meeting_booked', 'custom'
);
create type attribution_type as enum ('first_touch', 'last_touch', 'direct');

-- Auth
create type user_role as enum ('admin', 'client');


-- ========== 20260601000003_auth_and_config.sql ==========
-- =============================================================================
-- 0003 — Auth principals + config tables  (created early; needed by RLS & mw)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- profiles: maps a Supabase Auth user to a role. The RLS principal.
--   role = 'admin'  -> full access to the admin/CRM (you).
--   role = 'client' -> (future) read-only access to their own KPI dashboard;
--                      linked via client_id (FK added in 0005 once clients exist).
-- ---------------------------------------------------------------------------
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      citext,
  role       user_role not null default 'client',
  client_id  uuid,                       -- FK -> clients(id) added in 0005
  full_name  text,
  created_at timestamptz not null default now()
);

-- SECURITY DEFINER so policies can call it without recursing through RLS.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

comment on function public.is_admin() is
  'True if the current auth user has the admin role. Used in RLS policies.';

alter table public.profiles enable row level security;

-- A user may read their own profile (middleware checks own role); admins all.
create policy profiles_self_read on public.profiles
  for select using (id = auth.uid());
create policy profiles_admin_all on public.profiles
  for all using (is_admin()) with check (is_admin());

-- Auto-create a default (client) profile when an auth user is created.
-- Promote yourself to admin once, per docs/admin-setup.md.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- pipeline_stages: configurable prospect funnel with probability weights.
-- The dashboard's "weighted pipeline" multiplies estimated value by probability.
-- ---------------------------------------------------------------------------
create table public.pipeline_stages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  position    int  not null,
  probability numeric(4,3) not null default 0 check (probability >= 0 and probability <= 1),
  is_won      boolean not null default false,
  is_lost     boolean not null default false,
  created_at  timestamptz not null default now()
);
alter table public.pipeline_stages enable row level security;
create policy pipeline_stages_admin_all on public.pipeline_stages
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- custom_field_defs: metadata for flexible per-entity custom attributes.
-- Values themselves live in each entity's `custom_data jsonb` column.
-- ---------------------------------------------------------------------------
create table public.custom_field_defs (
  id          uuid primary key default gen_random_uuid(),
  entity_type entity_type not null,
  key         text not null,
  label       text not null,
  data_type   custom_field_type not null default 'text',
  options     jsonb not null default '[]'::jsonb,   -- for select types
  position    int not null default 0,
  created_at  timestamptz not null default now(),
  unique (entity_type, key)
);
alter table public.custom_field_defs enable row level security;
create policy custom_field_defs_admin_all on public.custom_field_defs
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- app_settings: single-row JSON bag for workspace defaults (from-address, etc.)
-- ---------------------------------------------------------------------------
create table public.app_settings (
  id         int primary key default 1 check (id = 1),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.app_settings enable row level security;
create policy app_settings_admin_all on public.app_settings
  for all using (is_admin()) with check (is_admin());
create trigger app_settings_set_updated_at
  before update on public.app_settings
  for each row execute function public.set_updated_at();


-- ========== 20260601000004_core_crm.sql ==========
-- =============================================================================
-- 0004 — Core CRM: companies, contacts, tasks, activities
-- =============================================================================

-- ---------------------------------------------------------------------------
-- companies — restoration firms across the whole lifecycle.
-- Client/past financial fields (mrr, tier, churn) live on `clients` (0005);
-- this table holds prospecting + identity data shared across every stage.
-- ---------------------------------------------------------------------------
create table public.companies (
  id                       uuid primary key default gen_random_uuid(),
  name                     text not null,
  lifecycle_status         lifecycle_status not null default 'prospect',
  service_focus            text,                 -- e.g. "Water / Fire"
  location_city            text,
  location_state           text,
  annual_revenue           numeric(14,2),
  owner_label              text,                 -- free-text (single-admin)
  lead_temperature         lead_temperature,     -- prospects: hot/warm/cold
  pipeline_stage_id        uuid references public.pipeline_stages(id) on delete set null,
  estimated_monthly_value  numeric(14,2),        -- prospects: est. $/mo
  custom_data              jsonb not null default '{}'::jsonb,
  notes                    text,
  search                   tsvector generated always as (
    to_tsvector('english',
      coalesce(name, '') || ' ' ||
      coalesce(service_focus, '') || ' ' ||
      coalesce(location_city, '') || ' ' ||
      coalesce(location_state, ''))
  ) stored,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);
alter table public.companies enable row level security;
create policy companies_admin_all on public.companies
  for all using (is_admin()) with check (is_admin());
create trigger companies_set_updated_at
  before update on public.companies
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- contacts — people. May exist before any company link ("new lead").
-- Linked contacts' lifecycle_status is kept in sync with the company (0009).
-- ---------------------------------------------------------------------------
create table public.contacts (
  id               uuid primary key default gen_random_uuid(),
  company_id       uuid references public.companies(id) on delete set null,
  full_name        text not null,
  title            text,
  email            citext,
  phone            text,
  lifecycle_status lifecycle_status not null default 'prospect',
  owner_label      text,
  is_primary       boolean not null default false,
  custom_data      jsonb not null default '{}'::jsonb,
  search           tsvector generated always as (
    to_tsvector('english',
      coalesce(full_name, '') || ' ' ||
      coalesce(email::text, '') || ' ' ||
      coalesce(title, ''))
  ) stored,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
alter table public.contacts enable row level security;
create policy contacts_admin_all on public.contacts
  for all using (is_admin()) with check (is_admin());
create trigger contacts_set_updated_at
  before update on public.contacts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- tasks — lightweight to-dos optionally tied to a company/contact.
-- ---------------------------------------------------------------------------
create table public.tasks (
  id                 uuid primary key default gen_random_uuid(),
  title              text not null,
  related_company_id uuid references public.companies(id) on delete set null,
  related_contact_id uuid references public.contacts(id)  on delete set null,
  due_date           date,
  status             task_status not null default 'open',
  assignee_label     text,
  created_at         timestamptz not null default now(),
  completed_at       timestamptz
);
alter table public.tasks enable row level security;
create policy tasks_admin_all on public.tasks
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- activities — polymorphic timeline. Powers the feed, per-record history, and
-- the derived "last touch" (max(occurred_at) per contact). client_id FK in 0005.
-- ---------------------------------------------------------------------------
create table public.activities (
  id            uuid primary key default gen_random_uuid(),
  activity_type activity_type not null,
  actor         text,                     -- "Jordan Mills" / "System" / "Automation"
  company_id    uuid references public.companies(id) on delete cascade,
  contact_id    uuid references public.contacts(id)  on delete cascade,
  client_id     uuid,                     -- FK -> clients(id) added in 0005
  body          text,
  meta          jsonb not null default '{}'::jsonb,
  occurred_at   timestamptz not null default now(),
  created_at    timestamptz not null default now()
);
alter table public.activities enable row level security;
create policy activities_admin_all on public.activities
  for all using (is_admin()) with check (is_admin());


-- ========== 20260601000005_clients_financials.sql ==========
-- =============================================================================
-- 0005 — Client relationship + financial layer
-- =============================================================================
-- A `clients` row layers a paying relationship ON TOP OF a company (it does not
-- replace it). The company keeps its identity/history; the client row owns the
-- QuickBooks connection, dashboard token, MRR, and recap cadence.

-- Opaque, URL-safe token generator for dashboard links (48 hex chars).
create or replace function public.generate_token()
returns text
language sql
volatile
as $$
  select encode(gen_random_bytes(24), 'hex');
$$;

-- ---------------------------------------------------------------------------
create table public.clients (
  id                         uuid primary key default gen_random_uuid(),
  company_id                 uuid not null unique references public.companies(id) on delete cascade,
  primary_contact_id         uuid references public.contacts(id) on delete set null,
  tier                       client_tier not null default 'core',
  mrr                        numeric(14,2) not null default 0,
  status                     client_status not null default 'active',
  started_at                 date not null default current_date,
  churned_at                 date,
  churn_reason               text,
  health_status              client_health not null default 'good',
  dashboard_token            text not null unique default public.generate_token(),
  dashboard_token_created_at timestamptz not null default now(),
  recap_cadence              recap_cadence not null default 'none',
  recap_last_sent_at         timestamptz,
  recap_next_at              timestamptz,
  qb_realm_id                text,
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now()
);
alter table public.clients enable row level security;
create policy clients_admin_all on public.clients
  for all using (is_admin()) with check (is_admin());
-- Future client-portal self-read (KPI dashboard, not built yet but cheap now).
create policy clients_self_read on public.clients
  for select using (
    id = (select client_id from public.profiles where id = auth.uid())
  );
create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

-- Now that clients exists, wire the deferred FKs from 0003/0004.
alter table public.profiles
  add constraint profiles_client_id_fkey
  foreign key (client_id) references public.clients(id) on delete set null;
alter table public.activities
  add constraint activities_client_id_fkey
  foreign key (client_id) references public.clients(id) on delete cascade;

-- ---------------------------------------------------------------------------
-- qb_connections — encrypted QuickBooks OAuth tokens (1:1 with a client).
-- Most sensitive table: admin-only, never client/anon readable.
-- ---------------------------------------------------------------------------
create table public.qb_connections (
  id                       uuid primary key default gen_random_uuid(),
  client_id                uuid not null unique references public.clients(id) on delete cascade,
  realm_id                 text not null,
  access_token_encrypted   text not null,
  refresh_token_encrypted  text not null,
  token_expires_at         timestamptz,
  refresh_expires_at       timestamptz,
  scopes                   text,
  connected_at             timestamptz not null default now(),
  last_sync_at             timestamptz,
  sync_status              text,
  sync_error               text,
  updated_at               timestamptz not null default now()
);
alter table public.qb_connections enable row level security;
create policy qb_connections_admin_all on public.qb_connections
  for all using (is_admin()) with check (is_admin());
create trigger qb_connections_set_updated_at
  before update on public.qb_connections
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- qb_financial_snapshots — raw P&L / Balance Sheet reports as fetched from QB.
-- ---------------------------------------------------------------------------
create table public.qb_financial_snapshots (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid not null references public.clients(id) on delete cascade,
  report_type  qb_report_type not null,
  period_start date not null,
  period_end   date not null,
  currency     text not null default 'USD',
  raw_json     jsonb not null,
  fetched_at   timestamptz not null default now()
);
alter table public.qb_financial_snapshots enable row level security;
create policy qb_snapshots_admin_all on public.qb_financial_snapshots
  for all using (is_admin()) with check (is_admin());
create policy qb_snapshots_self_read on public.qb_financial_snapshots
  for select using (
    client_id = (select client_id from public.profiles where id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- qb_invoices — the CLIENT's accounts-receivable, synced from QuickBooks.
-- (Distinct from client_invoices, which is what *I* bill the client.)
-- ---------------------------------------------------------------------------
create table public.qb_invoices (
  id             uuid primary key default gen_random_uuid(),
  client_id      uuid not null references public.clients(id) on delete cascade,
  qb_invoice_id  text not null,
  doc_number     text,
  customer_name  text,
  txn_date       date,
  due_date       date,
  total_amount   numeric(14,2),
  balance        numeric(14,2),
  status         qb_invoice_status,
  raw_json       jsonb,
  synced_at      timestamptz not null default now(),
  unique (client_id, qb_invoice_id)
);
alter table public.qb_invoices enable row level security;
create policy qb_invoices_admin_all on public.qb_invoices
  for all using (is_admin()) with check (is_admin());
create policy qb_invoices_self_read on public.qb_invoices
  for select using (
    client_id = (select client_id from public.profiles where id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- client_kpis — computed metrics per client per month (the calc layer output).
-- ---------------------------------------------------------------------------
create table public.client_kpis (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references public.clients(id) on delete cascade,
  period_month  date not null,                 -- first day of the month
  revenue_mtd   numeric(14,2),
  revenue_ytd   numeric(14,2),
  expenses_mtd  numeric(14,2),
  expenses_ytd  numeric(14,2),
  net_profit    numeric(14,2),
  profit_margin numeric(6,4),
  cash_balance  numeric(14,2),
  ratios        jsonb not null default '{}'::jsonb,
  computed_at   timestamptz not null default now(),
  unique (client_id, period_month)
);
alter table public.client_kpis enable row level security;
create policy client_kpis_admin_all on public.client_kpis
  for all using (is_admin()) with check (is_admin());
create policy client_kpis_self_read on public.client_kpis
  for select using (
    client_id = (select client_id from public.profiles where id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- client_invoices — invoices I send the client for bookkeeping services.
-- sent_email_message_id FK is added in 0007 once email_messages exists.
-- ---------------------------------------------------------------------------
create table public.client_invoices (
  id                    uuid primary key default gen_random_uuid(),
  client_id             uuid not null references public.clients(id) on delete cascade,
  invoice_number        text not null,
  amount                numeric(14,2) not null default 0,
  line_items            jsonb not null default '[]'::jsonb,
  issued_at             date,
  due_at                date,
  status                client_invoice_status not null default 'draft',
  paid_at               timestamptz,
  sent_email_message_id uuid,                  -- FK added in 0007
  notes                 text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
alter table public.client_invoices enable row level security;
create policy client_invoices_admin_all on public.client_invoices
  for all using (is_admin()) with check (is_admin());
create trigger client_invoices_set_updated_at
  before update on public.client_invoices
  for each row execute function public.set_updated_at();


-- ========== 20260601000006_engine_infra.sql ==========
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


-- ========== 20260601000007_segments_tags.sql ==========
-- =============================================================================
-- 0007 — Segmentation: tags + segments
-- =============================================================================

-- tags — free-form labels, applied polymorphically to companies/contacts/clients.
create table public.tags (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  color      text,
  created_at timestamptz not null default now()
);
alter table public.tags enable row level security;
create policy tags_admin_all on public.tags
  for all using (is_admin()) with check (is_admin());

create table public.entity_tags (
  tag_id      uuid not null references public.tags(id) on delete cascade,
  entity_type entity_type not null,
  entity_id   uuid not null,
  created_at  timestamptz not null default now(),
  primary key (tag_id, entity_type, entity_id)
);
alter table public.entity_tags enable row level security;
create policy entity_tags_admin_all on public.entity_tags
  for all using (is_admin()) with check (is_admin());

-- segments — named groups defined by a JSON criteria tree (dynamic) or an
-- explicit membership list (static). `definition` holds the rule tree; the
-- evaluator (src/lib/segments/evaluate.ts) compiles it to a safe SQL query.
create table public.segments (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  entity_type entity_type not null default 'contact',
  is_dynamic  boolean not null default true,
  definition  jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.segments enable row level security;
create policy segments_admin_all on public.segments
  for all using (is_admin()) with check (is_admin());
create trigger segments_set_updated_at
  before update on public.segments
  for each row execute function public.set_updated_at();

-- segment_members — materialized membership. For static segments this IS the
-- list; for dynamic segments it's a cache the cron refreshes and diffs to fire
-- enters/exits-segment triggers and to make campaign targeting a fast join.
create table public.segment_members (
  segment_id  uuid not null references public.segments(id) on delete cascade,
  entity_type entity_type not null,
  entity_id   uuid not null,
  added_at    timestamptz not null default now(),
  primary key (segment_id, entity_type, entity_id)
);
alter table public.segment_members enable row level security;
create policy segment_members_admin_all on public.segment_members
  for all using (is_admin()) with check (is_admin());


-- ========== 20260601000008_campaigns_email.sql ==========
-- =============================================================================
-- 0008 — Campaigns / sequences / enrollments / email / suppression / conversions
-- =============================================================================
-- Campaigns and automations are unified as `sequences`. Content (steps,
-- templates) is authored in code and synced by key; lifecycle `status` is owned
-- by the admin and never overwritten by sync.

-- ---------------------------------------------------------------------------
-- email_templates — reusable subject/body with {{personalization}} tokens.
-- ---------------------------------------------------------------------------
create table public.email_templates (
  id         uuid primary key default gen_random_uuid(),
  key        text not null unique,            -- stable code-sync key
  source     content_source not null default 'code',
  name       text not null,
  subject    text not null,
  body_html  text not null,
  body_text  text,
  from_name  text,
  from_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.email_templates enable row level security;
create policy email_templates_admin_all on public.email_templates
  for all using (is_admin()) with check (is_admin());
create trigger email_templates_set_updated_at
  before update on public.email_templates
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- sequences — a campaign OR an automation (discriminated by `kind`).
-- ---------------------------------------------------------------------------
create table public.sequences (
  id                uuid primary key default gen_random_uuid(),
  key               text not null unique,       -- stable code-sync key
  source            content_source not null default 'code',
  content_hash      text,                        -- drift detection for sync
  name              text not null,
  description       text,
  kind              sequence_kind not null default 'campaign',
  channel           text not null default 'email',
  status            sequence_status not null default 'draft',  -- ADMIN-OWNED
  target_type       target_type not null default 'segment',
  target_segment_id uuid references public.segments(id) on delete set null,
  target_contact_id uuid references public.contacts(id) on delete set null,
  target_lifecycle  lifecycle_status,
  trigger_type      trigger_type not null default 'manual',
  trigger_config    jsonb not null default '{}'::jsonb,
  from_name         text,
  from_email        text,
  allow_reenroll    boolean not null default false,
  created_at        timestamptz not null default now(),
  launched_at       timestamptz
);
alter table public.sequences enable row level security;
create policy sequences_admin_all on public.sequences
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- sequence_steps — ordered steps. Replaced wholesale on each code sync.
-- ---------------------------------------------------------------------------
create table public.sequence_steps (
  id                uuid primary key default gen_random_uuid(),
  sequence_id       uuid not null references public.sequences(id) on delete cascade,
  step_order        int not null,
  step_type         step_type not null,
  delay_amount      int not null default 0,
  delay_unit        delay_unit not null default 'days',
  email_template_id uuid references public.email_templates(id) on delete set null,
  config            jsonb not null default '{}'::jsonb,
  unique (sequence_id, step_order)
);
alter table public.sequence_steps enable row level security;
create policy sequence_steps_admin_all on public.sequence_steps
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- enrollments — a contact's progress through a sequence. next_run_at is the
-- scheduler's hot path (partial index in 0011).
-- ---------------------------------------------------------------------------
create table public.enrollments (
  id                 uuid primary key default gen_random_uuid(),
  sequence_id        uuid not null references public.sequences(id) on delete cascade,
  contact_id         uuid not null references public.contacts(id) on delete cascade,
  status             enrollment_status not null default 'active',
  current_step_order int not null default 0,
  next_run_at        timestamptz not null default now(),
  enrolled_at        timestamptz not null default now(),
  completed_at       timestamptz,
  enrolled_by        enrolled_by not null default 'trigger',
  trigger_event_id   uuid references public.trigger_events(id) on delete set null,
  last_step_at       timestamptz
);
alter table public.enrollments enable row level security;
create policy enrollments_admin_all on public.enrollments
  for all using (is_admin()) with check (is_admin());
-- One active enrollment per (sequence, contact) unless re-enrollment is allowed.
create unique index enrollments_unique_active
  on public.enrollments (sequence_id, contact_id)
  where status in ('active', 'paused');

-- ---------------------------------------------------------------------------
-- email_messages — single send log for ALL outbound email (campaigns,
-- sequences, dashboard, recap, welcome, transactional).
-- ---------------------------------------------------------------------------
create table public.email_messages (
  id                  uuid primary key default gen_random_uuid(),
  to_contact_id       uuid references public.contacts(id) on delete set null,
  to_email            citext not null,
  from_email          text not null,
  subject             text not null,
  body_html           text,
  body_text           text,
  category            email_category not null,
  related_type        text,                    -- 'sequence' | 'client' | ...
  related_id          uuid,
  provider            text not null default 'gmail',
  provider_message_id text,
  gmail_thread_id     text,
  status              email_status not null default 'queued',
  error               text,
  sent_at             timestamptz,
  created_at          timestamptz not null default now()
);
alter table public.email_messages enable row level security;
create policy email_messages_admin_all on public.email_messages
  for all using (is_admin()) with check (is_admin());

-- Late FK from client_invoices (0005) now that email_messages exists.
alter table public.client_invoices
  add constraint client_invoices_sent_email_fkey
  foreign key (sent_email_message_id)
  references public.email_messages(id) on delete set null;

-- ---------------------------------------------------------------------------
-- enrollment_step_runs — per-step audit trail for each enrollment.
-- ---------------------------------------------------------------------------
create table public.enrollment_step_runs (
  id               uuid primary key default gen_random_uuid(),
  enrollment_id    uuid not null references public.enrollments(id) on delete cascade,
  sequence_step_id uuid references public.sequence_steps(id) on delete set null,
  status           step_run_status not null default 'pending',
  run_at           timestamptz not null default now(),
  email_message_id uuid references public.email_messages(id) on delete set null,
  error            text
);
alter table public.enrollment_step_runs enable row level security;
create policy enrollment_step_runs_admin_all on public.enrollment_step_runs
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- email_events — opens/clicks/replies/bounces. Feeds campaign metrics.
-- ---------------------------------------------------------------------------
create table public.email_events (
  id               uuid primary key default gen_random_uuid(),
  email_message_id uuid not null references public.email_messages(id) on delete cascade,
  event_type       email_event_type not null,
  url              text,
  occurred_at      timestamptz not null default now(),
  meta             jsonb not null default '{}'::jsonb
);
alter table public.email_events enable row level security;
create policy email_events_admin_all on public.email_events
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- suppressions — legal unsubscribe/bounce list. Checked before every marketing
-- send. `scope='all'` suppresses everything; `'marketing'` allows transactional.
-- ---------------------------------------------------------------------------
create table public.suppressions (
  id         uuid primary key default gen_random_uuid(),
  email      citext not null unique,
  reason     suppression_reason not null,
  scope      suppression_scope not null default 'marketing',
  source     text,
  created_at timestamptz not null default now()
);
alter table public.suppressions enable row level security;
create policy suppressions_admin_all on public.suppressions
  for all using (is_admin()) with check (is_admin());

-- ---------------------------------------------------------------------------
-- conversions — first-class attribution: which sequence drove which outcome.
-- ---------------------------------------------------------------------------
create table public.conversions (
  id               uuid primary key default gen_random_uuid(),
  conversion_type  conversion_type not null,
  contact_id       uuid references public.contacts(id) on delete set null,
  company_id       uuid references public.companies(id) on delete set null,
  client_id        uuid references public.clients(id) on delete set null,
  value            numeric(14,2),
  sequence_id      uuid references public.sequences(id) on delete set null,
  enrollment_id    uuid references public.enrollments(id) on delete set null,
  email_message_id uuid references public.email_messages(id) on delete set null,
  attribution      attribution_type not null default 'last_touch',
  occurred_at      timestamptz not null default now(),
  meta             jsonb not null default '{}'::jsonb
);
alter table public.conversions enable row level security;
create policy conversions_admin_all on public.conversions
  for all using (is_admin()) with check (is_admin());


-- ========== 20260601000009_functions_triggers.sql ==========
-- =============================================================================
-- 0009 — Business-logic functions & triggers
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Keep a linked contact's lifecycle in sync with its company. A contact with no
-- company keeps whatever lifecycle it was given (a standalone lead).
-- ---------------------------------------------------------------------------
create or replace function public.sync_contact_lifecycle()
returns trigger
language plpgsql
as $$
begin
  if new.company_id is not null then
    select lifecycle_status into new.lifecycle_status
    from public.companies where id = new.company_id;
  end if;
  return new;
end;
$$;

create trigger contacts_sync_lifecycle
  before insert or update of company_id on public.contacts
  for each row execute function public.sync_contact_lifecycle();

-- When a company's lifecycle changes, cascade to its linked contacts and enqueue
-- a lifecycle_changed event for the automation engine.
create or replace function public.on_company_lifecycle_change()
returns trigger
language plpgsql
as $$
begin
  if new.lifecycle_status is distinct from old.lifecycle_status then
    update public.contacts
      set lifecycle_status = new.lifecycle_status
      where company_id = new.id;

    insert into public.trigger_events (event_type, entity_type, entity_id, payload)
    values ('lifecycle_changed', 'company', new.id,
            jsonb_build_object('from', old.lifecycle_status, 'to', new.lifecycle_status));
  end if;

  -- Pipeline stage changes drive their own trigger.
  if new.pipeline_stage_id is distinct from old.pipeline_stage_id then
    insert into public.trigger_events (event_type, entity_type, entity_id, payload)
    values ('stage_changed', 'company', new.id,
            jsonb_build_object('stage_id', new.pipeline_stage_id));
  end if;

  return new;
end;
$$;

create trigger companies_lifecycle_change
  after update on public.companies
  for each row execute function public.on_company_lifecycle_change();

-- Enqueue contact_created when a new contact is added.
create or replace function public.on_contact_created()
returns trigger
language plpgsql
as $$
begin
  insert into public.trigger_events (event_type, entity_type, entity_id, payload)
  values ('contact_created', 'contact', new.id,
          jsonb_build_object('lifecycle', new.lifecycle_status));
  return new;
end;
$$;

create trigger contacts_created_event
  after insert on public.contacts
  for each row execute function public.on_contact_created();

-- ---------------------------------------------------------------------------
-- convert_company_to_client — the "New Client" action, transactional.
-- Flips the company to `client` (which cascades contacts + enqueues the
-- lifecycle_changed event via the trigger above), stands up the client row with
-- a dashboard token, and logs the activity. External side-effects (welcome
-- email, QB invite, conversion record) are handled by the API route.
-- ---------------------------------------------------------------------------
create or replace function public.convert_company_to_client(
  p_company_id uuid,
  p_tier       client_tier default 'core',
  p_mrr        numeric default null
)
returns public.clients
language plpgsql
as $$
declare
  v_company public.companies;
  v_client  public.clients;
  v_mrr     numeric;
begin
  select * into v_company from public.companies where id = p_company_id for update;
  if not found then
    raise exception 'Company % not found', p_company_id;
  end if;
  if exists (select 1 from public.clients where company_id = p_company_id) then
    raise exception 'Company % is already a client', p_company_id;
  end if;

  v_mrr := coalesce(p_mrr, v_company.estimated_monthly_value, 0);

  update public.companies
    set lifecycle_status = 'client',
        lead_temperature = null,
        pipeline_stage_id = null
    where id = p_company_id;

  insert into public.clients (company_id, tier, mrr, primary_contact_id)
  values (
    p_company_id, p_tier, v_mrr,
    (select id from public.contacts
       where company_id = p_company_id
       order by is_primary desc, created_at asc
       limit 1)
  )
  returning * into v_client;

  insert into public.activities (activity_type, actor, company_id, client_id, body)
  values ('client_converted', 'System', p_company_id, v_client.id,
          v_company.name || ' converted to Client');

  return v_client;
end;
$$;

-- ---------------------------------------------------------------------------
-- contact_last_touch — derived "last touch" per contact (latest activity).
-- security_invoker so the caller's RLS on activities applies.
-- ---------------------------------------------------------------------------
create view public.contact_last_touch
with (security_invoker = on) as
select contact_id, max(occurred_at) as last_touch_at
from public.activities
where contact_id is not null
group by contact_id;

-- ---------------------------------------------------------------------------
-- get_dashboard_by_token — DB-layer isolation for the public client dashboard.
-- Returns ONLY the client matching the opaque token. SECURITY DEFINER so anon
-- can call it, but it can never return another client's data.
-- ---------------------------------------------------------------------------
create or replace function public.get_dashboard_by_token(p_token text)
returns jsonb
language sql
security definer
stable
set search_path = public
as $$
  select jsonb_build_object(
    'client', jsonb_build_object(
      'tier', c.tier, 'mrr', c.mrr, 'health', c.health_status,
      'started_at', c.started_at, 'status', c.status
    ),
    'company', jsonb_build_object(
      'name', co.name, 'service_focus', co.service_focus,
      'location_city', co.location_city, 'location_state', co.location_state
    ),
    'kpis', (
      select to_jsonb(k) from public.client_kpis k
      where k.client_id = c.id order by k.period_month desc limit 1
    ),
    'kpi_history', coalesce((
      select jsonb_agg(to_jsonb(k) order by k.period_month)
      from (
        select * from public.client_kpis
        where client_id = c.id order by period_month desc limit 12
      ) k
    ), '[]'::jsonb),
    'open_invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
        'doc_number', doc_number, 'due_date', due_date,
        'balance', balance, 'status', status))
      from public.qb_invoices
      where client_id = c.id and status in ('open', 'overdue')
    ), '[]'::jsonb)
  )
  from public.clients c
  join public.companies co on co.id = c.company_id
  where c.dashboard_token = p_token;
$$;

revoke all on function public.get_dashboard_by_token(text) from public;
grant execute on function public.get_dashboard_by_token(text) to anon, authenticated;


-- ========== 20260601000010_indexes.sql ==========
-- =============================================================================
-- 0010 — Indexes tuned for the queries the admin UI + engine actually run
-- =============================================================================

-- Full-text search (global search box).
create index companies_search_idx on public.companies using gin (search);
create index contacts_search_idx  on public.contacts  using gin (search);

-- CRM list filters / joins.
create index companies_lifecycle_idx     on public.companies (lifecycle_status);
create index companies_pipeline_idx      on public.companies (pipeline_stage_id);
create index contacts_company_idx        on public.contacts (company_id);
create index contacts_email_idx          on public.contacts (email);
create index contacts_lifecycle_idx      on public.contacts (lifecycle_status);
create index activities_contact_time_idx on public.activities (contact_id, occurred_at desc);
create index activities_company_time_idx on public.activities (company_id, occurred_at desc);
create index tasks_status_due_idx        on public.tasks (status, due_date);

-- Scheduler hot path: only active enrollments are ever scanned by due-time.
create index enrollments_due_idx
  on public.enrollments (next_run_at)
  where status = 'active';
create index enrollments_sequence_idx on public.enrollments (sequence_id);

-- Trigger queue: only unprocessed rows are scanned.
create index trigger_events_unprocessed_idx
  on public.trigger_events (created_at)
  where processed = false;

-- Email + metrics.
create index email_messages_related_idx on public.email_messages (related_type, related_id);
create index email_events_message_idx   on public.email_events (email_message_id);

-- Financials + attribution.
create index qb_invoices_client_status_idx on public.qb_invoices (client_id, status);
create index conversions_sequence_idx      on public.conversions (sequence_id);
create index segment_members_segment_idx   on public.segment_members (segment_id);
create index enrollment_step_runs_enr_idx  on public.enrollment_step_runs (enrollment_id);


-- ========== 20260601000011_seed.sql ==========
-- =============================================================================
-- 0011 — Seed: pipeline stages + app settings
-- =============================================================================
-- Probabilities power the dashboard's "weighted pipeline" calculation.

insert into public.pipeline_stages (name, position, probability, is_won, is_lost)
values
  ('New lead',          0, 0.18, false, false),
  ('Discovery call',    1, 0.34, false, false),
  ('Assessment booked', 2, 0.52, false, false),
  ('Proposal sent',     3, 0.74, false, false),
  ('Won',               4, 1.00, true,  false),
  ('Lost',              5, 0.00, false, true)
on conflict (name) do nothing;

insert into public.app_settings (id, data)
values (1, jsonb_build_object(
  'default_from_name', 'Cat3 Books',
  'recap_default_cadence', 'monthly'
))
on conflict (id) do nothing;


-- ========== 20260601000012_cron.sql ==========
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
