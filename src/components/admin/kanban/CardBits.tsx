"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import type { ReactNode } from "react";

/** Compact action button used on kanban cards. Stops pointerdown so clicking
 * it never starts a card drag. */
export function CardBtn({
  children,
  onClick,
  tone = "default",
  title,
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: "default" | "yellow" | "danger";
  title?: string;
}) {
  return (
    <button
      title={title}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "font-mono text-[9px] tracking-[0.08em] uppercase border px-2 py-1 transition-colors",
        tone === "yellow"
          ? "text-c3-yellow border-c3-yellow-dim hover:bg-[rgba(240,190,0,0.08)]"
          : tone === "danger"
            ? "text-c3-mid border-c3-border hover:text-c3-redsoft hover:border-[rgba(204,42,0,0.4)]"
            : "text-c3-mid border-c3-border hover:text-c3-text hover:border-c3-b2",
      )}
    >
      {children}
    </button>
  );
}

/** ★ priority pin toggle. */
export function PriorityStar({
  kind,
  id,
  on,
}: {
  kind: "company" | "contact";
  id: string;
  on: boolean;
}) {
  const { togglePriority } = useAdmin();
  const { toast } = useUI();
  return (
    <button
      title={on ? "Unprioritise" : "Prioritise"}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        togglePriority(kind, id);
        toast(on ? "Priority removed" : "Prioritised");
      }}
      className={cn(
        "text-[14px] leading-none transition-colors",
        on ? "text-c3-yellow" : "text-c3-dim hover:text-c3-mid",
      )}
    >
      {on ? "★" : "☆"}
    </button>
  );
}

/** "Add to automation" popover — pick an active automation to enroll into. */
export function AddToAutomationMenu({
  subjectName,
}: {
  subjectName: string;
}) {
  const { db, enrollInAutomation } = useAdmin();
  const { toast } = useUI();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const active = db.automations.filter((a) => a.active);

  return (
    <>
      <button
        title="Add to automation"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          const r = e.currentTarget.getBoundingClientRect();
          // Anchored + portalled to <body> so the scrollable board never clips it.
          setPos({ top: r.bottom + 4, left: r.left });
          setOpen((o) => !o);
        }}
        className="font-mono text-[9px] tracking-[0.08em] uppercase border px-2 py-1 transition-colors text-c3-mid border-c3-border hover:text-c3-text hover:border-c3-b2"
      >
        + Auto
      </button>
      {open &&
        pos &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[200]"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed z-[201] w-56 bg-c3-dark border border-c3-b2 shadow-xl"
              style={{ top: pos.top, left: pos.left }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 font-mono text-[8.5px] tracking-[0.18em] uppercase text-c3-dim border-b border-c3-border">
                Enroll in…
              </div>
              {active.map((a) => (
                <button
                  key={a.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    enrollInAutomation(a.id, subjectName);
                    toast(`Enrolled in ${a.name}`);
                    setOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 font-cond text-[13px] uppercase tracking-[0.03em] text-c3-mid hover:text-c3-yellow hover:bg-white/[0.03]"
                >
                  {a.name}
                </button>
              ))}
              {active.length === 0 && (
                <div className="px-3 py-3 font-body text-[12px] text-c3-dim">
                  No active automations.
                </div>
              )}
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
