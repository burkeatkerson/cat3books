/**
 * Sample data ported verbatim from the standalone prototype, plus the small
 * display helpers it used. Frontend-only — seeds the mock store.
 */

import type { AdminDB, Health, Segment } from "@/lib/admin/types";

export const SEED: AdminDB = {
  companies: [
    { id: "c1", name: "Summit Restoration", segment: "client", revenue: 3200000, location: "Dallas, TX", type: "Water / Fire", owner: "Jordan Mills", tier: "Books + CFO", since: "2024-03", mrr: 5667, health: "good" },
    { id: "c2", name: "BlueLine Mitigation", segment: "client", revenue: 2000000, location: "Phoenix, AZ", type: "Water / Mold", owner: "Dana Pruitt", tier: "Core", since: "2025-01", mrr: 1417, health: "good" },
    { id: "c3", name: "Ironclad Restoration Group", segment: "client", revenue: 5800000, location: "Atlanta, GA", type: "Large Loss", owner: "Jordan Mills", tier: "Books + CFO", since: "2023-09", mrr: 6800, health: "watch" },
    { id: "c4", name: "Apex Water & Fire", segment: "prospect", revenue: 1800000, location: "Tampa, FL", type: "Water / Fire", owner: "Dana Pruitt", tier: "—", stage: "Assessment booked", value: 1417, health: "hot" },
    { id: "c5", name: "Cornerstone Contents", segment: "prospect", revenue: 1100000, location: "Nashville, TN", type: "Contents", owner: "Jordan Mills", tier: "—", stage: "Proposal sent", value: 935, health: "hot" },
    { id: "c6", name: "Redline Storm Co.", segment: "prospect", revenue: 4400000, location: "Oklahoma City, OK", type: "Storm / Large Loss", owner: "Dana Pruitt", tier: "—", stage: "Discovery call", value: 3117, health: "warm" },
    { id: "c7", name: "Tidewater Restoration", segment: "prospect", revenue: 920000, location: "Norfolk, VA", type: "Water", owner: "Jordan Mills", tier: "—", stage: "New lead", value: 750, health: "cold" },
    { id: "c8", name: "Granite Peak Recovery", segment: "past", revenue: 2600000, location: "Denver, CO", type: "Water / Mold", owner: "Dana Pruitt", tier: "Core", since: "2022-05", churned: "2025-02", reason: "Brought books in-house" },
    { id: "c9", name: "Harbor Mitigation LLC", segment: "past", revenue: 1500000, location: "Charleston, SC", type: "Water", owner: "Jordan Mills", tier: "Core", since: "2023-01", churned: "2024-11", reason: "Sold the business" },
  ],
  contacts: [
    { id: "p1", name: "Mike Rodriguez", title: "Owner", companyId: "c1", email: "mike@summitrestore.com", phone: "(214) 555-0142", segment: "client", owner: "Jordan Mills", lastTouch: "2026-05-28" },
    { id: "p2", name: "Sarah Klein", title: "Operations Manager", companyId: "c2", email: "sarah@bluelinemit.com", phone: "(602) 555-0198", segment: "client", owner: "Dana Pruitt", lastTouch: "2026-05-30" },
    { id: "p3", name: "Renee Park", title: "Director of Finance", companyId: "c3", email: "rpark@ironcladrg.com", phone: "(404) 555-0173", segment: "client", owner: "Jordan Mills", lastTouch: "2026-05-22" },
    { id: "p4", name: "Dan Thompson", title: "Owner", companyId: "c4", email: "dan@apexwaterfire.com", phone: "(813) 555-0166", segment: "prospect", owner: "Dana Pruitt", lastTouch: "2026-05-29" },
    { id: "p5", name: "Lucia Ferro", title: "Co-Owner", companyId: "c5", email: "lucia@cornerstonecontents.com", phone: "(615) 555-0121", segment: "prospect", owner: "Jordan Mills", lastTouch: "2026-05-27" },
    { id: "p6", name: "Gary Whitfield", title: "President", companyId: "c6", email: "gary@redlinestorm.com", phone: "(405) 555-0109", segment: "prospect", owner: "Dana Pruitt", lastTouch: "2026-05-20" },
    { id: "p7", name: "Tom Avery", title: "Owner", companyId: "c7", email: "tom@tidewaterrestore.com", phone: "(757) 555-0188", segment: "prospect", owner: "Jordan Mills", lastTouch: "2026-05-12" },
    { id: "p8", name: "Beth Nakamura", title: "Controller", companyId: "c8", email: "beth@granitepeak.com", phone: "(303) 555-0150", segment: "past", owner: "Dana Pruitt", lastTouch: "2025-02-04" },
    { id: "p9", name: "Carl Estrada", title: "Former Owner", companyId: "c9", email: "carl@harbormit.com", phone: "(843) 555-0134", segment: "past", owner: "Jordan Mills", lastTouch: "2024-11-18" },
  ],
  campaigns: [
    { id: "cam1", name: "Cat3 Assessment Offer", channel: "Email", segment: "prospect", status: "live", desc: "3-email sequence offering a free books assessment to cold and warm restoration leads.", sent: 412, opened: 236, replied: 38, booked: 11 },
    { id: "cam2", name: "Supplement Leak Teardown", channel: "Email", segment: "prospect", status: "live", desc: "Lead magnet: send the anonymized P&L autopsy, then follow up with a tailored estimate.", sent: 288, opened: 201, replied: 44, booked: 9 },
    { id: "cam3", name: "Quarterly Client Review Nudge", channel: "Email", segment: "client", status: "live", desc: "Reminds clients to book their quarterly CFO review and resurfaces open supplements.", sent: 96, opened: 81, replied: 52, booked: 33 },
    { id: "cam4", name: "Win-Back: Bring It Back", channel: "Email", segment: "past", status: "paused", desc: "Re-engages churned clients 6–12 months out with a clean-up offer and whats-new note.", sent: 54, opened: 29, replied: 6, booked: 2 },
    { id: "cam5", name: "RIA Conference Follow-Up", channel: "Email", segment: "prospect", status: "draft", desc: "Post-event sequence for badges scanned at the RIA national conference booth.", sent: 0, opened: 0, replied: 0, booked: 0 },
  ],
  automations: [
    { id: "a1", name: "New Lead Welcome", trigger: "Contact added as Prospect", steps: ["Wait 5 min", "Send intro email", "Create call task"], segment: "prospect", active: true, enrolled: 128 },
    { id: "a2", name: "Assessment Booked → Prep", trigger: "Stage = Assessment booked", steps: ["Notify owner", "Send prep checklist", "Add to pipeline"], segment: "prospect", active: true, enrolled: 34 },
    { id: "a3", name: "Proposal No-Reply Chase", trigger: "Proposal sent + 4 days no reply", steps: ["Send nudge email", "Wait 3 days", "Create follow-up task"], segment: "prospect", active: true, enrolled: 19 },
    { id: "a4", name: "Client Onboarding", trigger: "Segment changes to Client", steps: ["Send welcome kit", "Assign bookkeeper", "Schedule kickoff", "Start month-1 checklist"], segment: "client", active: true, enrolled: 42 },
    { id: "a5", name: "Monthly Close Delivered", trigger: "Close marked complete", steps: ["Email report", "Request review", "Log to timeline"], segment: "client", active: true, enrolled: 87 },
    { id: "a6", name: "Churn Win-Back Drip", trigger: "Segment changes to Past Client", steps: ["Wait 90 days", "Send check-in", "Wait 90 days", "Send offer"], segment: "past", active: false, enrolled: 11 },
  ],
  activity: [
    { type: "win", who: "Dana Pruitt", txt: "moved <b>Apex Water &amp; Fire</b> to <a>Assessment booked</a>", time: "12m ago" },
    { type: "mail", who: "Automation", txt: "<b>Supplement Leak Teardown</b> sent to 14 new prospects", time: "42m ago" },
    { type: "note", who: "Jordan Mills", txt: "logged a call with <b>Lucia Ferro</b> at Cornerstone Contents", time: "1h ago" },
    { type: "reply", who: "Gary Whitfield", txt: 'replied to <b>Cat3 Assessment Offer</b> — "send me the pricing"', time: "2h ago" },
    { type: "client", who: "System", txt: "<b>BlueLine Mitigation</b> month-end close delivered, CPA-ready", time: "4h ago" },
    { type: "churn", who: "System", txt: "<b>Granite Peak Recovery</b> entered win-back drip (90-day)", time: "Yesterday" },
    { type: "win", who: "Jordan Mills", txt: "sent proposal to <b>Cornerstone Contents</b> — $935/mo Core", time: "Yesterday" },
  ],
  tasks: [
    { t: "Send Apex Water &amp; Fire the assessment prep checklist", meta: "Apex Water & Fire", due: "today", done: false },
    { t: "Call Gary Whitfield re: Redline pricing question", meta: "Redline Storm Co.", due: "today", done: false },
    { t: "Finalize Ironclad Q2 CFO review deck", meta: "Ironclad Restoration Group", due: "over", done: false },
    { t: "Review Cornerstone proposal follow-up draft", meta: "Cornerstone Contents", due: "jun 3", done: false },
    { t: "Confirm BlueLine supplement recovery numbers", meta: "BlueLine Mitigation", due: "jun 4", done: true },
  ],
};

export const SEG: Record<Segment, { label: string; cls: string; dot: string }> = {
  prospect: { label: "Prospects", cls: "prospect", dot: "Prospect" },
  client: { label: "Clients", cls: "client", dot: "Client" },
  past: { label: "Past Clients", cls: "past", dot: "Past Client" },
};

export const money = (n: number | undefined) =>
  "$" + Number(n ?? 0).toLocaleString("en-US");

export const initials = (n: string) =>
  n
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function stageCls(s: string | undefined): string {
  return (
    (
      {
        "New lead": "draft",
        "Discovery call": "paused",
        "Assessment booked": "prospect",
        "Proposal sent": "live",
      } as Record<string, string>
    )[s ?? ""] || "draft"
  );
}

export function healthMeta(h: Health | undefined): { cls: string; label: string } {
  const m: Record<Health, [string, string]> = {
    good: ["client", "Healthy"],
    watch: ["paused", "Watch"],
    hot: ["live", "Hot"],
    warm: ["prospect", "Warm"],
    cold: ["draft", "Cold"],
  };
  const [cls, label] = (h && m[h]) || ["draft", "—"];
  return { cls, label };
}

export const PIPELINE_STAGES = [
  "New lead",
  "Discovery call",
  "Assessment booked",
  "Proposal sent",
  "Won",
  "Lost",
];

export const TEAM: [string, string, string][] = [
  ["JM", "Jordan Mills", "Founder · Admin"],
  ["DP", "Dana Pruitt", "Account Manager"],
  ["LB", "Lena Brooks", "Lead Bookkeeper"],
];
