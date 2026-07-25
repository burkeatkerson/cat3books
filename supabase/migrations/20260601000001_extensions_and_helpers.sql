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
