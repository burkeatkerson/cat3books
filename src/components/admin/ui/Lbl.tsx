import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Mono micro-label (the prototype's .lbl). */
export function Lbl({
  children,
  yellow = false,
  className,
}: {
  children: ReactNode;
  yellow?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[9px] tracking-[0.22em] uppercase",
        yellow ? "text-c3-yellow" : "text-c3-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}
