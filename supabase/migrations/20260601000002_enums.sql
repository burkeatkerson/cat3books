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
