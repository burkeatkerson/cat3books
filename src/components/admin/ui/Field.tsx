import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const INPUT =
  "bg-c3-card border border-c3-border px-[13px] py-[11px] font-body text-[14px] text-c3-text outline-none transition-colors focus:border-c3-yellow-dim placeholder:text-c3-dim";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-mid">
        {label}
      </label>
      {children}
    </div>
  );
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3.5">{children}</div>;
}

export const inputClass = INPUT;

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean },
) {
  const { invalid, className, ...rest } = props;
  return (
    <input
      className={cn(INPUT, invalid && "border-c3-red", className)}
      {...rest}
    />
  );
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const { className, ...rest } = props;
  return <textarea className={cn(INPUT, className)} {...rest} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props;
  return <select className={cn(INPUT, "cursor-pointer", className)} {...rest} />;
}

/** Segmented radio picker (prospect/client/past style). */
export function SegPick({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex gap-px bg-c3-border">
      {options.map((o) => {
        const sel = o.value === value;
        return (
          <label
            key={o.value}
            className={cn(
              "flex-1 py-[11px] text-center font-cond font-semibold text-[13px] tracking-[0.04em] uppercase cursor-pointer transition-all",
              sel
                ? "text-c3-yellow bg-c3-card2 shadow-[inset_0_-2px_0_var(--tw-shadow-color)] shadow-c3-yellow"
                : "text-c3-mid bg-c3-card",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={sel}
              onChange={() => onChange(o.value)}
              className="hidden"
            />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}
