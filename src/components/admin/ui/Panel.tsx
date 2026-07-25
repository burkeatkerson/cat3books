import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Panel({
  title,
  right,
  children,
  className,
  bodyClassName,
}: {
  title?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("bg-c3-card border border-c3-border", className)}>
      {(title || right) && (
        <div className="flex items-center gap-3.5 px-5 py-4 border-b border-c3-border">
          {title && (
            <h3 className="font-cond font-bold text-[17px] tracking-[0.04em] uppercase text-c3-text">
              {title}
            </h3>
          )}
          {right && <div className="ml-auto">{right}</div>}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </div>
  );
}
