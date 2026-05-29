import type { ReactNode } from "react";

interface ClaimProps {
  children: ReactNode;
  /** Optional short label displayed above the claim. Defaults to "Claim". */
  label?: string;
}

/**
 * Wraps a specific, citable thesis claim in a visually distinct callout.
 * Styled as a yellow-bordered evidence box to signal to readers (and AI
 * engines) that this is a specific, evidence-backed position.
 */
export default function Claim({ children, label = "Claim" }: ClaimProps) {
  return (
    <div className="border-l-4 border-c3-yellow bg-c3-card my-8 px-6 py-5">
      <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow mb-3">
        {label}
      </div>
      <div className="prose-field-notes">{children}</div>
    </div>
  );
}
