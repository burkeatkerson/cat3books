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
