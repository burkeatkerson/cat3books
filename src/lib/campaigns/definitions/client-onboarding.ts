/**
 * "Client Onboarding" — an automation that fires when a company becomes a
 * client (lifecycle_changed → client). Demonstrates an event-triggered drip
 * with mixed step types (email + task).
 */

import { defineSequence } from "@/lib/campaigns/define";

export const clientOnboarding = defineSequence({
  key: "client-onboarding",
  name: "Client Onboarding",
  description:
    "Kickoff sequence when a company converts to a client: welcome, gather access, schedule kickoff.",
  kind: "automation",
  target: { type: "lifecycle", lifecycle: "client" },
  trigger: { type: "lifecycle_changed", config: { to: "client" } },
  fromName: "Cat3 Books",
  allowReenroll: false,
  templates: [
    {
      key: "onboarding-kickoff",
      subject: "Let's get your first close on the calendar",
      bodyHtml: `<p>Hi {{contact.first_name}},</p>
        <p>Welcome aboard! To hit your first monthly close cleanly, we need two things:</p>
        <ol>
          <li>QuickBooks Online access (separate secure link is on its way)</li>
          <li>30 minutes for a kickoff call</li>
        </ol>
        <p>Reply with a few times that work and we'll lock it in.</p>
        <p>— The Cat3 Books team</p>`,
    },
  ],
  steps: [
    { type: "send_email", template: "onboarding-kickoff", delay: { amount: 5, unit: "minutes" } },
    {
      type: "create_task",
      title: "Schedule onboarding kickoff call",
      delay: { amount: 1, unit: "days" },
    },
    { type: "wait", delay: { amount: 3, unit: "days" } },
    {
      type: "create_task",
      title: "Confirm QuickBooks connected; start month-1 checklist",
    },
  ],
});
