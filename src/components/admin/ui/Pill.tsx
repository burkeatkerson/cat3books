import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type PillVariant =
  | "default"
  | "prospect"
  | "client"
  | "past"
  | "live"
  | "draft"
  | "paused"
  | "done";

const BASE =
  "inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] uppercase px-[9px] py-1 border whitespace-nowrap";

const VARIANTS: Record<PillVariant, string> = {
  default: "border-c3-b2 text-c3-mid",
  prospect: "text-c3-yellow border-c3-yellow-dim bg-[rgba(240,190,0,0.05)]",
  client: "text-c3-greensoft border-[rgba(24,122,56,0.4)] bg-[rgba(24,122,56,0.06)]",
  past: "text-c3-mid border-c3-b2 bg-[rgba(255,255,255,0.02)]",
  live: "text-c3-greensoft border-[rgba(24,122,56,0.4)]",
  draft: "text-c3-mid border-c3-b2",
  paused: "text-c3-paused border-[rgba(221,136,0,0.4)] bg-[rgba(221,136,0,0.06)]",
  done: "text-c3-dim border-c3-border",
};

export function Pill({
  variant = "default",
  dot = false,
  blink = false,
  className,
  children,
}: {
  variant?: PillVariant;
  dot?: boolean;
  blink?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn(BASE, VARIANTS[variant], className)}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full bg-current",
            blink && "animate-blink",
          )}
        />
      )}
      {children}
    </span>
  );
}
