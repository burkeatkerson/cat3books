"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Draggable wrapper around a card. Whole card is a drag handle; a 6px
 * activation distance lets clicks on inner action buttons still register. */
export function KanbanCardShell({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...attributes}
      {...listeners}
      className={cn("touch-none outline-none", isDragging && "opacity-40")}
    >
      {children}
    </div>
  );
}
