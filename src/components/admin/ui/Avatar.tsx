import { cn } from "@/lib/cn";
import { initials } from "@/lib/admin/seed";

export function Avatar({
  name,
  yellow = false,
  className,
}: {
  name: string;
  yellow?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "w-8 h-8 flex-shrink-0 bg-c3-card2 border inline-flex items-center justify-center font-disp text-[13px] tracking-[0.02em]",
        yellow ? "border-c3-yellow-dim text-c3-yellow" : "border-c3-b2 text-c3-mid",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
