"use client";

import {
  Drawer,
  DrawerHead,
  DrawerBody,
  DrawerStat,
  DrawerStatCell,
} from "@/components/admin/ui/Drawer";
import { Pill, type PillVariant } from "@/components/admin/ui/Pill";
import { Btn } from "@/components/admin/ui/Btn";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { SEG } from "@/lib/admin/seed";

const SAMPLE_SEQUENCE = [
  'Day 0 — Diagnostic hook: "Your books might be a Cat 3"',
  "Day 3 — Supplement leak teardown + soft CTA",
  "Day 7 — Free assessment offer, calendar link",
];

export function CampaignDrawer({ id }: { id: string }) {
  const { db, launchCampaign, pauseCampaign } = useAdmin();
  const { closeDrawer, toast } = useUI();
  const c = db.campaigns.find((x) => x.id === id);
  if (!c) return null;
  const open = c.sent ? Math.round((c.opened / c.sent) * 100) : 0;

  return (
    <Drawer onClose={closeDrawer}>
      <DrawerHead>
        <Pill variant={c.status as PillVariant} dot={c.status === "live"} blink={c.status === "live"}>
          {c.status}
        </Pill>
        <h2 className="font-disp text-[34px] tracking-[0.02em] mt-3.5 leading-[0.95]">
          {c.name}
        </h2>
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-2">
          {c.channel} · {SEG[c.segment].dot}s
        </div>
      </DrawerHead>
      <DrawerBody>
        <p className="font-body text-[14px] text-c3-mid leading-[1.7]">{c.desc}</p>

        <DrawerStat>
          <DrawerStatCell label="Sent" value={<span className="text-c3-text">{c.sent}</span>} />
          <DrawerStatCell label="Open Rate" value={<span className="text-c3-text">{open}%</span>} />
          <DrawerStatCell label="Replied" value={<span className="text-c3-text">{c.replied}</span>} />
          <DrawerStatCell label="Booked" value={c.booked} />
        </DrawerStat>

        <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-2 mb-3">
          Sequence (sample)
        </div>
        {SAMPLE_SEQUENCE.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-[11px] border-b border-dashed border-c3-border"
          >
            <span className="w-8 h-8 flex-shrink-0 bg-c3-card2 border border-c3-yellow-dim text-c3-yellow inline-flex items-center justify-center font-disp text-[13px]">
              {i + 1}
            </span>
            <div className="flex-1 font-body text-[13px] text-c3-text">{s}</div>
          </div>
        ))}

        <div className="flex gap-2.5 mt-6">
          {c.status !== "live" ? (
            <Btn
              variant="primary"
              onClick={() => {
                launchCampaign(c.id);
                closeDrawer();
                toast(`${c.name} is live`);
              }}
            >
              Launch Campaign
            </Btn>
          ) : (
            <Btn
              variant="ghost"
              onClick={() => {
                pauseCampaign(c.id);
                closeDrawer();
                toast(`${c.name} paused`);
              }}
            >
              Pause
            </Btn>
          )}
          <Btn variant="ghost" onClick={closeDrawer}>
            Close
          </Btn>
        </div>
      </DrawerBody>
    </Drawer>
  );
}
