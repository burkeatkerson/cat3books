"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type KanbanColumnDef = {
  key: string;
  label: string;
  accent?: string; // tailwind text/border color class for the accent bar
};

export function KanbanColumn({
  column,
  count,
  children,
}: {
  column: KanbanColumnDef;
  count: number;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.key });
  return (
    <div className="flex flex-col w-[300px] flex-shrink-0">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-c3-card border border-c3-border border-b-0">
        <span
          className={cn("w-2 h-2 rounded-full", column.accent ?? "bg-c3-dim")}
        />
        <span className="font-cond font-semibold text-[14px] tracking-[0.04em] uppercase text-c3-text">
          {column.label}
        </span>
        <span className="ml-auto font-mono text-[10px] text-c3-dim border border-c3-border px-1.5 py-px">
          {count}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 flex flex-col gap-2.5 p-2.5 border border-c3-border min-h-[140px] transition-colors",
          isOver ? "bg-[rgba(240,190,0,0.05)] border-c3-yellow-dim" : "bg-black/20",
        )}
      >
        {count === 0 ? (
          <div className="m-auto font-mono text-[10px] tracking-[0.1em] uppercase text-c3-dim/60">
            Drop here
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
