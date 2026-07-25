"use client";

import { useState, type ReactNode } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { KanbanColumn, type KanbanColumnDef } from "@/components/admin/kanban/KanbanColumn";
import { KanbanCardShell } from "@/components/admin/kanban/KanbanCardShell";

type Item = { id: string; priority?: boolean };

export function KanbanBoard<T extends Item>({
  columns,
  items,
  columnOf,
  onMove,
  renderCard,
}: {
  columns: KanbanColumnDef[];
  items: T[];
  columnOf: (item: T) => string;
  onMove: (item: T, from: string, to: string) => void;
  renderCard: (item: T) => ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const activeItem = items.find((i) => i.id === activeId) ?? null;

  // Priority items float to the top of their column (stable otherwise).
  const inColumn = (key: string) =>
    items
      .filter((i) => columnOf(i) === key)
      .sort((a, b) => Number(b.priority ?? false) - Number(a.priority ?? false));

  function onDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }
  function onDragEnd(e: DragEndEvent) {
    setActiveId(null);
    if (!e.over) return;
    const item = items.find((i) => i.id === String(e.active.id));
    if (!item) return;
    const from = columnOf(item);
    const to = String(e.over.id);
    if (from !== to) onMove(item, from, to);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex gap-2.5 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colItems = inColumn(col.key);
          return (
            <KanbanColumn key={col.key} column={col} count={colItems.length}>
              {colItems.map((item) => (
                <KanbanCardShell key={item.id} id={item.id}>
                  {renderCard(item)}
                </KanbanCardShell>
              ))}
            </KanbanColumn>
          );
        })}
      </div>
      <DragOverlay dropAnimation={null}>
        {activeItem ? (
          <div className="rotate-2 cursor-grabbing">{renderCard(activeItem)}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
