import "server-only";

/** Add a delay to a date. */
export function addDelay(
  from: Date,
  amount: number,
  unit: "minutes" | "hours" | "days",
): Date {
  const ms =
    unit === "minutes"
      ? amount * 60_000
      : unit === "hours"
        ? amount * 3_600_000
        : amount * 86_400_000;
  return new Date(from.getTime() + ms);
}
