import { cn } from "@/lib/cn";

export function Toggle({
  on,
  onClick,
}: {
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={cn(
        "relative w-[42px] h-[22px] border transition-all flex-shrink-0",
        on ? "bg-[rgba(240,190,0,0.15)] border-c3-yellow-dim" : "bg-c3-card2 border-c3-b2",
      )}
    >
      <span
        className={cn(
          "absolute top-[2px] w-4 h-4 transition-all",
          on ? "left-[22px] bg-c3-yellow" : "left-[2px] bg-c3-dim",
        )}
      />
    </button>
  );
}
