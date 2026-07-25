/**
 * Maps a board drag/drop transition to the automations it should "fire".
 * Frontend-only simulation: we match against the seed automations' free-text
 * triggers (the real backend uses structured trigger_type/config).
 */

import type { AdminDB, Automation, Segment } from "@/lib/admin/types";

export type Transition =
  | { kind: "stage"; to: string }
  | { kind: "segment"; to: Segment };

/** Active automations whose trigger corresponds to this transition. */
export function matchAutomations(db: AdminDB, t: Transition): Automation[] {
  return db.automations.filter((a) => {
    if (!a.active) return false;
    const trig = a.trigger.toLowerCase();
    if (t.kind === "stage") {
      // e.g. "Stage = Assessment booked"
      return trig.includes("stage") && trig.includes(t.to.toLowerCase());
    }
    // segment changes
    if (t.to === "client") return trig.includes("changes to client");
    if (t.to === "past") return trig.includes("past client");
    if (t.to === "prospect") return trig.includes("added as prospect");
    return false;
  });
}
