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
