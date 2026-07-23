import { cn } from "@/lib/cn";

/**
 * The School's page gutter. Deliberately narrower than the marketing site's
 * Container (1660px) — this is a reading property, not a landing page.
 */
export default function SchoolContainer({
  children,
  className,
  width = "wide",
}: {
  children: React.ReactNode;
  className?: string;
  /** "wide" for index/grid pages, "reading" for lesson bodies. */
  width?: "wide" | "reading";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        width === "wide" ? "max-w-[1240px]" : "max-w-[820px]",
        className
      )}
    >
      {children}
    </div>
  );
}
