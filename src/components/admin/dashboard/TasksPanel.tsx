"use client";

import { cn } from "@/lib/cn";
import { Icon } from "@/components/admin/ui/icons";
import { useAdmin } from "@/lib/admin/store";

export function TasksPanel() {
  const { db, toggleTask } = useAdmin();
  return (
    <div>
      {db.tasks.map((t, i) => {
        const dueLabel = t.due === "over" ? "Overdue" : t.due;
        return (
          <div
            key={i}
            className="flex items-center gap-3 py-3 border-b border-dashed border-c3-border last:border-0"
          >
            <button
              onClick={() => toggleTask(i)}
              aria-label="Toggle task"
              className={cn(
                "w-[18px] h-[18px] border flex-shrink-0 flex items-center justify-center transition-all",
                t.done
                  ? "bg-c3-yellow border-c3-yellow text-[#111]"
                  : "border-c3-b2 hover:border-c3-yellow",
              )}
            >
              {t.done && <Icon name="check" strokeWidth={3} className="w-3 h-3" />}
            </button>
            <div
              className={cn(
                "font-body text-[13px] flex-1",
                t.done ? "text-c3-dim line-through" : "text-c3-text",
              )}
              dangerouslySetInnerHTML={{ __html: t.t }}
            />
            <div className="font-mono text-[9px] text-c3-dim tracking-[0.08em] uppercase">
              {t.meta}
            </div>
            <div
              className={cn(
                "font-mono text-[9px] tracking-[0.08em] px-[7px] py-[3px] border",
                t.due === "today"
                  ? "text-c3-yellow border-c3-yellow-dim"
                  : t.due === "over"
                    ? "text-c3-redsoft border-[rgba(204,42,0,0.4)]"
                    : "text-c3-mid border-c3-border",
              )}
            >
              {dueLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
}
