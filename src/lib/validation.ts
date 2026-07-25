/**
 * Zod schemas for API inputs. Centralized so request shapes are validated
 * consistently and enums stay in lockstep with the database.
 */

import { z } from "zod";

export const lifecycleStatus = z.enum(["prospect", "client", "past"]);
export const leadTemperature = z.enum(["hot", "warm", "cold"]);
export const clientTier = z.enum(["core", "books_cfo"]);
export const clientHealth = z.enum(["good", "watch", "at_risk"]);
export const recapCadence = z.enum(["none", "weekly", "monthly"]);
export const taskStatus = z.enum(["open", "done"]);
export const entityType = z.enum(["company", "contact", "client"]);

// ---- Companies ------------------------------------------------------------
export const companyCreate = z.object({
  name: z.string().min(1).max(200),
  lifecycle_status: lifecycleStatus.default("prospect"),
  service_focus: z.string().max(200).optional(),
  location_city: z.string().max(120).optional(),
  location_state: z.string().max(60).optional(),
  annual_revenue: z.number().nonnegative().optional(),
  owner_label: z.string().max(120).optional(),
  lead_temperature: leadTemperature.optional(),
  pipeline_stage_id: z.string().uuid().optional(),
  estimated_monthly_value: z.number().nonnegative().optional(),
  custom_data: z.record(z.string(), z.unknown()).optional(),
  notes: z.string().max(5000).optional(),
});
export const companyUpdate = companyCreate.partial();

// ---- Contacts -------------------------------------------------------------
export const contactCreate = z.object({
  full_name: z.string().min(1).max(200),
  company_id: z.string().uuid().nullish(),
  title: z.string().max(160).optional(),
  email: z.string().email().max(320).optional(),
  phone: z.string().max(60).optional(),
  lifecycle_status: lifecycleStatus.default("prospect"),
  owner_label: z.string().max(120).optional(),
  is_primary: z.boolean().optional(),
  custom_data: z.record(z.string(), z.unknown()).optional(),
});
export const contactUpdate = contactCreate.partial();

// ---- Clients --------------------------------------------------------------
export const clientUpdate = z.object({
  tier: clientTier.optional(),
  mrr: z.number().nonnegative().optional(),
  health_status: clientHealth.optional(),
  primary_contact_id: z.string().uuid().nullish(),
  recap_cadence: recapCadence.optional(),
  status: z.enum(["active", "past"]).optional(),
  churned_at: z.string().date().nullish(),
  churn_reason: z.string().max(500).nullish(),
});

export const convertToClient = z.object({
  tier: clientTier.default("core"),
  mrr: z.number().nonnegative().optional(),
  send_welcome_email: z.boolean().default(true),
  send_qb_invite: z.boolean().default(true),
});

// ---- Tasks ----------------------------------------------------------------
export const taskCreate = z.object({
  title: z.string().min(1).max(300),
  related_company_id: z.string().uuid().nullish(),
  related_contact_id: z.string().uuid().nullish(),
  due_date: z.string().date().nullish(),
  assignee_label: z.string().max(120).optional(),
});
export const taskUpdate = z.object({
  title: z.string().min(1).max(300).optional(),
  status: taskStatus.optional(),
  due_date: z.string().date().nullish(),
  assignee_label: z.string().max(120).nullish(),
});

// ---- Segments -------------------------------------------------------------
export const segmentInput = z.object({
  name: z.string().min(1).max(160),
  description: z.string().max(1000).optional(),
  entity_type: entityType.default("contact"),
  is_dynamic: z.boolean().default(true),
  // Rule tree validated structurally; leaf semantics checked by the evaluator.
  definition: z
    .record(z.string(), z.unknown())
    .default({ match: "all", rules: [] }),
});

// ---- Activities -----------------------------------------------------------
export const activityCreate = z.object({
  activity_type: z.enum([
    "note",
    "email_sent",
    "email_reply",
    "call",
    "status_change",
    "stage_change",
    "dashboard_sent",
    "client_converted",
    "enrolled",
    "churn",
    "system",
  ]),
  actor: z.string().max(120).optional(),
  company_id: z.string().uuid().nullish(),
  contact_id: z.string().uuid().nullish(),
  client_id: z.string().uuid().nullish(),
  body: z.string().max(5000).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});
