/**
 * "Cat3 Assessment Offer" — the prototype's flagship prospect campaign.
 * A 3-touch sequence (Day 0 / 3 / 7) offering a free books assessment.
 *
 * kind 'campaign' + trigger 'manual': it sits as a draft until you publish it
 * in the admin, at which point all prospects are enrolled.
 */

import { defineSequence } from "@/lib/campaigns/define";

export const cat3AssessmentOffer = defineSequence({
  key: "cat3-assessment-offer",
  name: "Cat3 Assessment Offer",
  description:
    "3-email sequence offering a free books assessment to cold and warm restoration leads.",
  kind: "campaign",
  target: { type: "lifecycle", lifecycle: "prospect" },
  trigger: { type: "manual" },
  fromName: "Cat3 Books",
  allowReenroll: false,
  templates: [
    {
      key: "cat3-assessment-day0",
      subject: "Your books might be a Cat 3",
      bodyHtml: `<p>Hi {{contact.first_name}},</p>
        <p>Most restoration firms we meet are losing 8–12 points of margin to job-costing leaks they can't see. We call it a Category 3 — the damage is structural, not cosmetic.</p>
        <p>We run a free, no-obligation assessment of your books and tell you exactly where the leaks are. Want the teardown?</p>
        <p>— The Cat3 Books team</p>`,
    },
    {
      key: "cat3-assessment-day3",
      subject: "The supplement leak teardown",
      bodyHtml: `<p>Hi {{contact.first_name}},</p>
        <p>Quick follow-up — here's an anonymized P&L autopsy from a {{company.service_focus}} firm about your size. The supplement recovery gap alone was $140k/yr.</p>
        <p>Reply "assessment" and we'll map yours.</p>
        <p>— The Cat3 Books team</p>`,
    },
    {
      key: "cat3-assessment-day7",
      subject: "Free assessment — last call",
      bodyHtml: `<p>Hi {{contact.first_name}},</p>
        <p>Last note from me. If clean job costing and recovered supplements sound worth 30 minutes, grab a time and we'll run your free assessment.</p>
        <p><a href="https://cat3books.com/restoration-bookkeeping">Book the assessment</a></p>
        <p>— The Cat3 Books team</p>`,
    },
  ],
  steps: [
    { type: "send_email", template: "cat3-assessment-day0" },
    { type: "wait", delay: { amount: 3, unit: "days" } },
    { type: "send_email", template: "cat3-assessment-day3" },
    { type: "wait", delay: { amount: 4, unit: "days" } },
    { type: "send_email", template: "cat3-assessment-day7" },
  ],
});
