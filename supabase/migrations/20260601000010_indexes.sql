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
