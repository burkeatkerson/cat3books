"use client";

import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/admin/store";
import { Pill } from "@/components/admin/ui/Pill";

export function CampaignSnapshot() {
  const router = useRouter();
  const { db } = useAdmin();
  const live = db.campaigns.filter((c) => c.status === "live");

  return (
    <div className="flex flex-col gap-4">
      {live.map((c) => (
        <div
          key={c.id}
          className="cursor-pointer"
          onClick={() => router.push("/admin/campaigns")}
        >
          <div className="flex items-center gap-2.5">
            <Pill variant="live" dot blink>
              Live
            </Pill>
            <span className="font-cond font-semibold text-[15px] uppercase tracking-[0.03em]">
              {c.name}
            </span>
          </div>
          <div className="flex gap-5 mt-2">
            <Stat label="Sent" value={c.sent} />
            <Stat label="Replied" value={c.replied} tone="text-c3-yellow" />
            <Stat label="Booked" value={c.booked} tone="text-c3-greensoft" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "text-c3-text",
}: {
  label: string;
  value: number;
  tone?: string;
}) {
  return (
    <div>
      <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
        {label}
      </span>
      <div className={`font-disp text-[22px] ${tone}`}>{value}</div>
    </div>
  );
}
