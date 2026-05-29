import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Section-level quick-answer callout — placed at the top of each major H2
 * section in pillar guides. Smaller and more compact than AnswerBlock.
 * Provides a 2–3 sentence direct answer for AI engines scanning section content.
 */
export default function QuickAnswer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "my-6 border-l-[3px] border-c3-yellow bg-[rgba(240,190,0,0.03)] px-5 py-4",
        className
      )}
    >
      <div className="font-mono text-[8.5px] tracking-[0.26em] uppercase text-c3-yellow mb-2">
        ▸ Quick Answer
      </div>
      <div className="font-body font-light text-[15px] text-c3-text leading-[1.7] [&_strong]:text-c3-yellow [&_strong]:font-medium">
        {children}
      </div>
    </div>
  );
}
