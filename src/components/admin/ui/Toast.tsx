"use client";

import { cn } from "@/lib/cn";
import { useUI } from "@/lib/admin/ui-store";

export function Toast() {
  const { toastMsg } = useUI();
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 bg-c3-card border border-c3-yellow-dim px-5 py-[13px] font-cond font-semibold text-[14px] tracking-[0.04em] uppercase text-c3-yellow z-[300] transition-all pointer-events-none",
        toastMsg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
      )}
    >
      {toastMsg}
    </div>
  );
}
