"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Drawer({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(r);
  }, []);

  // Animate out, then unmount via onClose.
  const close = () => {
    setOpen(false);
    setTimeout(onClose, 280);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 bg-[rgba(5,5,4,0.6)] z-[150] transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-[440px] max-w-[92vw] bg-c3-dark border-l border-c3-b2 z-[160] flex flex-col transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-5 right-5 w-[30px] h-[30px] border border-c3-border flex items-center justify-center text-c3-mid hover:border-c3-redsoft hover:text-c3-redsoft z-10"
        >
          ✕
        </button>
        {children}
      </div>
    </>
  );
}

export function DrawerHead({ children }: { children: ReactNode }) {
  return <div className="p-6 pr-12 border-b border-c3-border">{children}</div>;
}

export function DrawerBody({ children }: { children: ReactNode }) {
  return <div className="p-6 overflow-y-auto flex-1">{children}</div>;
}

export function DrawerStat({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-c3-border my-[18px]">
      {children}
    </div>
  );
}

export function DrawerStatCell({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="bg-c3-card p-4">
      <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
        {label}
      </div>
      <div className="font-disp text-[30px] text-c3-yellow leading-none mt-1">
        {value}
      </div>
    </div>
  );
}

export function DL({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

export function DLRow({ k, v }: { k: ReactNode; v: ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-3 py-[11px] border-b border-dashed border-c3-border">
      <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-c3-dim pt-0.5">
        {k}
      </div>
      <div className="font-body text-[13.5px] text-c3-text">{v}</div>
    </div>
  );
}
