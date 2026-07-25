"use client";

import { useEffect, type ReactNode } from "react";

export function Modal({
  title,
  onClose,
  footer,
  children,
}: {
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-[rgba(5,5,4,0.78)] backdrop-blur-[4px] z-[200] flex items-start justify-center px-5 py-[6vh] overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-c3-dark border border-c3-b2 w-full max-w-[600px] animate-fade-up">
        <div className="flex items-center gap-3.5 px-6 py-5 border-b border-c3-border">
          <h3 className="font-cond font-bold text-[22px] tracking-[0.03em] uppercase text-c3-text">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto w-[30px] h-[30px] border border-c3-border flex items-center justify-center text-c3-mid hover:border-c3-redsoft hover:text-c3-redsoft"
          >
            ✕
          </button>
        </div>
        <div className="p-6 flex flex-col gap-[18px]">{children}</div>
        {footer && (
          <div className="px-6 py-[18px] border-t border-c3-border flex gap-2.5 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
