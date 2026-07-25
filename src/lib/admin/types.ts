/**
 * Types for the admin UI mock data — mirror the prototype's exact shape so the
 * rebuilt views render identically. (This is frontend-only sample data; it is
 * NOT the database schema.)
 */

export type Segment = "prospect" | "client" | "past";
export type Health = "good" | "watch" | "hot" | "warm" | "cold";
export type CampaignStatus = "live" | "paused" | "draft";
/** Frontend-only: targeted = in active nurture; global = broad house list. */
export type Audience = "targeted" | "global";

export type Company = {
  id: string;
  name: string;
  segment: Segment;
  revenue: number;
  location: string;
  type: string;
  owner: string;
  // client
  tier?: string;
  mrr?: number;
  since?: string;
  // past
  churned?: string;
  reason?: string;
  // prospect
  stage?: string;
  value?: number;
  health?: Health;
  // board controls (frontend-only)
  priority?: boolean;
  audience?: Audience;
};

export type Contact = {
  id: string;
  name: string;
  title: string;
  companyId: string | null;
  email: string;
  phone: string;
  segment: Segment;
  owner: string;
  lastTouch: string;
  // board controls (frontend-only)
  priority?: boolean;
  audience?: Audience;
};

export type Campaign = {
  id: string;
  name: string;
  channel: string;
  segment: Segment;
  status: CampaignStatus;
  desc: string;
  sent: number;
  opened: number;
  replied: number;
  booked: number;
};

export type Automation = {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  segment: Segment;
  active: boolean;
  enrolled: number;
};

export type ActivityType = "win" | "mail" | "note" | "reply" | "client" | "churn";
export type Activity = {
  type: ActivityType;
  who: string;
  txt: string;
  time: string;
};

export type Task = {
  t: string;
  meta: string;
  due: string;
  done: boolean;
};

export type AdminDB = {
  companies: Company[];
  contacts: Contact[];
  campaigns: Campaign[];
  automations: Automation[];
  activity: Activity[];
  tasks: Task[];
};
