import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Quick-answer box rendered at the top of decision-framework posts.
 * The `.speakable-answer` class is referenced by the Speakable schema so AI
 * engines can identify this as the canonical citable answer for the post.
 */
export default function AnswerBlock({ children, className }: Props) {
  return (
    <div
      className={cn(
        "speakable-answer",
        "my-8 border border-c3-yellow bg-[rgba(240,190,0,0.04)] px-7 py-6",
        className
      )}
    >
      <div className="font-mono text-[9px] tracking-[0.28em] uppercase text-c3-yellow mb-4">
        ▸ Framework Answer
      </div>
      <div className="prose-field-notes [&_p]:text-c3-text [&_p]:font-body [&_p]:text-[15.5px] [&_p]:leading-[1.75] [&_p]:mb-3 [&_strong]:text-c3-yellow [&_strong]:font-medium">
        {children}
      </div>
    </div>
  );
}
