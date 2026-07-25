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
