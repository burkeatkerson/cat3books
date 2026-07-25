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
