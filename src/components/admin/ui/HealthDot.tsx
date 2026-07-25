import { healthMeta } from "@/lib/admin/seed";
import type { Health } from "@/lib/admin/types";
import { Pill, type PillVariant } from "@/components/admin/ui/Pill";

export function HealthDot({ health }: { health: Health | undefined }) {
  const { cls, label } = healthMeta(health);
  if (label === "—") return <span className="text-c3-mid">—</span>;
  return (
    <Pill variant={cls as PillVariant} dot>
      {label}
    </Pill>
  );
}
