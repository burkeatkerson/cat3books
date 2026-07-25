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
