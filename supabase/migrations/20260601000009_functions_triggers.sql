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
