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
