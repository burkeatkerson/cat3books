"use client";

import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/admin/ui/icons";
import type { Activity, ActivityType } from "@/lib/admin/types";

const TONE: Record<ActivityType, string> = {
  win: "border-c3-yellow-dim text-c3-yellow",
  mail: "border-[rgba(58,110,165,0.4)] text-c3-bluesoft",
  note: "border-[rgba(58,110,165,0.4)] text-c3-bluesoft",
  reply: "border-[rgba(24,122,56,0.4)] text-c3-greensoft",
  client: "border-[rgba(24,122,56,0.4)] text-c3-greensoft",
  churn: "border-[rgba(204,42,0,0.4)] text-c3-redsoft",
};

const ICON: Record<ActivityType, IconName> = {
  win: "win",
  mail: "mail",
  note: "note",
  reply: "reply",
  client: "client",
  churn: "churn",
};

export function ActivityFeed({ activity }: { activity: Activity[] }) {
  return (
    <div className="flex flex-col">
      {activity.map((a, i) => (
        <div
          key={i}
          className="grid grid-cols-[30px_1fr_auto] gap-3 py-[13px] border-b border-dashed border-c3-border last:border-0 items-start"
        >
          <div
            className={cn(
              "w-[30px] h-[30px] flex items-center justify-center border bg-c3-card2",
              TONE[a.type],
            )}
          >
            <Icon name={ICON[a.type]} strokeWidth={1.8} className="w-3.5 h-3.5" />
          </div>
          <div className="font-body text-[13px] text-c3-text leading-[1.5] [&_b]:font-medium [&_a]:text-c3-yellow">
            <span dangerouslySetInnerHTML={{ __html: a.txt }} />
            <small className="block font-mono text-[9px] text-c3-dim tracking-[0.1em] uppercase mt-[3px]">
              {a.who}
            </small>
          </div>
          <div className="font-mono text-[9px] text-c3-dim tracking-[0.08em] whitespace-nowrap">
            {a.time}
          </div>
        </div>
      ))}
    </div>
  );
}
