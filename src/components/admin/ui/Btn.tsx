import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";

const BASE =
  "inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.08em] uppercase px-4 py-2.5 border border-transparent transition-all whitespace-nowrap disabled:opacity-60";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-c3-yellow text-[#111] hover:bg-c3-yellow-2",
  ghost: "border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text",
  danger:
    "border-[rgba(204,42,0,0.4)] text-c3-redsoft hover:bg-[rgba(204,42,0,0.08)]",
};

export function Btn({
  variant = "ghost",
  sm = false,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  sm?: boolean;
}) {
  return (
    <button
      className={cn(
        BASE,
        VARIANTS[variant],
        sm && "text-[11px] px-[11px] py-[7px] gap-1.5",
        className,
      )}
      {...props}
    />
  );
}
